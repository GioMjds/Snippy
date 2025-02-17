import { Request, Response, NextFunction } from "express";
import { get, merge } from "lodash";
import { getUserBySessionToken } from "../models/users";

type MiddlewareHandler = (req: Request, res: Response, next: NextFunction) => void;

export const isAuthenticated: MiddlewareHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies['session_token'];

        if (!sessionToken) return res.status(403).json({ error: "Not Unauthorized" });

        const existingUser = await getUserBySessionToken(sessionToken);

        if (!existingUser) return res.status(403).json({  error: "Unauthorized" });

        merge(req, { identity: existingUser });

        return next();
    } catch (error) {
        console.error(`Error authenticating user: ${error}`);
        return res.status(400).json({ error: error });
    }
}