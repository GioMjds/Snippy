import { Request, Response } from "express";
import Users from '../models/Users';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ error: 'Please fill in all fields' });
    }

    const userExists = await Users.findOne({email});

    if (userExists) {
        res.status(400).json({ error: 'User already exists' });
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({
        username,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            username: user.username,
            email: user.email
        })
    } else {
        res.status(400).json({ error: 'Invalid user data' });
        throw new Error('Invalid user data');
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Please fill in all fields' });
        throw new Error('Please fill in all fields');
    }

    const user = await Users.findOne({email});

    if (!user){
        res.status(400).json({ error: 'User does not exist' });
        throw new Error('User does not exist');
    } 

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: '1d'
        });

        res.status(200).json({
            token: token,
            username: user.username,
            email: user.email,
            message: 'Login successful'
        });
    } else {
        res.status(400).json({ error: 'Invalid credentials' });
    }
};

export const getUser = async (req: Request, res: Response) => {
    return res.status(200).json({ user: req.user });
};