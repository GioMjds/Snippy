require("dotenv").config();
import { Request, Response } from "express";
import axios from "axios";
import { google } from "googleapis";
import Users, { IUser } from "../models/Users";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_API_USER = process.env.GITHUB_API_USER as string;
const GITHUB_LOGIN_OAUTH = process.env.GITHUB_LOGIN_OAUTH;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET as string;

const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
);

export const getAccessTokenGitHub = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        console.log(`Authorization Code: ${code}`);

        if (!code) res.status(400).json({ error: "Missing authorization code" });

        const params = new URLSearchParams({
            client_id: GITHUB_CLIENT_ID as string,
            client_secret: GITHUB_CLIENT_SECRET as string,
            code: code,
        });

        const response = await axios.post(`${GITHUB_LOGIN_OAUTH}`, params, {
            headers: {
                "Accept": 'application/json',
            }
        });

        console.log(`Access Token Data: ${response.data}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(`Error in /auth/getAccessTokenGitHub: ${error}`);
        res.status(500).json({ error: "An error occured" });
    }
};

export const getGitHubUserData = async (req: Request, res: Response) => {
    try {
        const authorization = req.get("Authorization");

        if (!authorization) res.status(401).json({ error: "Missing authorization header" });

        const response = await axios.get(GITHUB_API_USER, {
            headers: {
                "Authorization": authorization,
            }
        });
        console.log(`User Data: ${response.data}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(`Error in /auth/getUserData: ${error}`);
        return res.status(500).json({ error: "An error occured" });
    }
};

export const googleLogin = (req: Request, res: Response) => {
    const scope = ['profile', 'email'];
    const authorizationUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scope,
    });
    res.redirect(authorizationUrl);
};

export const googleCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;

    if (!code) return res.status(400).json({ error: "Missing authorization code" });

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const googleUser = google.oauth2('v2').userinfo;
        const userInfoResponse = await googleUser.get({ auth: oauth2Client });
        const userInfo = userInfoResponse.data;

        const ticket = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token as string,
            audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        if (!payload?.email_verified) return res.status(400).json({ error: "Email not verified" });

        let user = await Users.findOne({ googleId: payload.sub });

        if (!user) {
            const newUser = new Users({
                googleId: payload.sub,
                username: payload.name,
                email: payload.email,
                password: undefined,
            });
            user = await newUser.save();
        }

        if (!user) return res.status(500).json({ message: 'Failed to create user' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error(`Error in /auth/google/callback: ${error}`);
        return res.status(500).json({ error: "An error occured" });
    }
};