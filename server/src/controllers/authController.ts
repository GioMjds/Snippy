require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { OAuth2Client } from "google-auth-library";
import Users from "../models/Users";
import jwt from "jsonwebtoken";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_API_USER = process.env.GITHUB_API_USER as string;
const GITHUB_LOGIN_OAUTH = process.env.GITHUB_LOGIN_OAUTH;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWT_SECRET = process.env.JWT_SECRET as string;

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

type RouteHandler = (req: Request, res: Response, next?: NextFunction) => Promise<any | void>;

export const googleFrontendCallback: RouteHandler = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) return res.status(400).json({ error: "Missing Google ID token" });

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();

        if (!payload?.email_verified) return res.status(400).json({ error: "Google Email not verified" });

        const googleId = payload.sub;
        const email = payload.email as string;
        const username = payload.name as string;

        let user = await Users.findOne({ googleId: googleId });

        if (!user) {
            const newUser = new Users({
                googleId: googleId,
                username: username,
                email: email,
                password: undefined,
            });
            user = await newUser.save();
        }

        if (!user) return res.status(400).json({ error: "User not found" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
            expiresIn: '1h',
        });

        return res.status(200).json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error: any) {
        console.error(`Error in /auth/google/frontend-callback: ${error}`);
        return res.status(500).json({ error: "Google authentication failed", details: error.message });
    }
};

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

        if (!authorization) return res.status(401).json({ error: "Missing authorization header" });

        const response = await axios.get(GITHUB_API_USER, {
            headers: {
                "Authorization": authorization,
            }
        });
        console.log(`User Data: ${response.data}`);
        return res.status(200).json(response.data);
    } catch (error) {
        console.error(`Error in /auth/getUserData: ${error}`);
        return res.status(500).json({ error: "An error occured" });
    }
};