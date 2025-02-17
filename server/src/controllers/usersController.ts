import { Request, Response } from 'express';
import { getUsers } from '../models/users';

type RouteHandler = (req: Request, res: Response) => void;

export const getAllUsers: RouteHandler = async (req: Request, res: Response) => {
    try {
        const users = await getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error(`Error getting all users: ${error}`);
        return res.status(400).json({ error: error });
    }
};