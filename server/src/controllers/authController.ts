require('dotenv').config();
import { Request, Response } from 'express';
import { createUser, getUserByEmail } from '../models/users';
import { authentication, random } from '../utils/auth';
import { IUser } from '../models/users';

type RouteHandler = (req: Request, res: Response) => void;

export const login: RouteHandler = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.sendStatus(400);

        const user: IUser | null = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) return res.status(400).json({ error: "User not found." });

        const expectedHash = authentication(user.authentication?.salt || "", password);

        if (user.authentication?.password !== expectedHash) return res.status(403).json({ error: "Incorrect password." });

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('session_token', user.authentication.sessionToken, {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });

        return res.status(200).json({
            message: "Login Successful",
            user: { 
                username: user.username, 
                email: user.email,
                id: user._id
            }
        }).end();
    } catch (error) {
        console.error(`Error logging in: ${error}`);
        return res.status(400).json({ error: error });
    }
};

export const register: RouteHandler = async (req: Request, res: Response) => {
    try {
        const { username, email, password } =  req.body;

        if (!email || !password || !username) {
            return res.status(400).json({  error: "Missing required fields" });
        };

        const existingUser = await getUserByEmail(email);

        if (existingUser) return res.status(400).json({ message: 'User already exists' }).end();

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        });

        res.cookie('session_token', {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        })

        return res.status(200).json(user).end();
    } catch (error) {
        console.error(error);
        return res.status(400).end();
    }
};

export const logout: RouteHandler = async (req: Request, res: Response) => {
    try {
        res.clearCookie('session_token', {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        return res.status(200).json({ message: "Logged out" }).end();
    } catch (error) {
        console.error(`Error logging out: ${error}`);
        return res.status(400).json({ error: error });
    }
};