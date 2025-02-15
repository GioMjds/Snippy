require("dotenv").config();
import { Request, Response } from "express";
import axios from "axios";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_API_USER = process.env.GITHUB_API_USER as string;
const GITHUB_LOGIN_OAUTH = process.env.GITHUB_LOGIN_OAUTH;

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
        res.status(500).json({ error: "An error occured" });
    }
}