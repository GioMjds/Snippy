import { Request, Response, NextFunction } from "express";

type MiddlewareHandler = (req: Request, res: Response, next: NextFunction) => void;

export const isAuthenticated: MiddlewareHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sessionToken = req.cookies.session_token;

        if (!sessionToken) return res.status(403).json({ error: "Not Unauthorized" });

        console.log(`Session Token: ${sessionToken}`);

        return next();
    } catch (error) {
        console.error(`Error authenticating user: ${error}`);
        return res.status(400).json({ error: error });
    }
};