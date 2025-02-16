require("dotenv").config();
import { Request, Response } from "express";
import Users from '../models/Users';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
    
        const userExists = await Users.findOne({email});
    
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = await Users.create({
            username,
            email,
            password: hashedPassword
        });
    
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(`Error in /users/register: ${error}`);
        res.status(500).json({ error: "An error occured" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
    
        const user = await Users.findOne({email});
    
        if (!user) {
            return res.status(400).json({ error: 'User does not exist' });
        }
    
        if (typeof password !== 'string' || typeof user.password !== 'string') {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error(`Error in /users/login: ${error}`);
        res.status(500).json({ error: "An error occured" });
    }
};


export const googleAuth = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        
        const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name } = ticket.getPayload()!;

        let user = await Users.findOne({ email });

        if (!user) {
            user = new Users({
                username: name,
                email,
            });
            await user.save();
        }

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error(`Error in /users/google: ${error}`)
        res.status(500).json({ error: "An error occured" })
    }
};

passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        callbackURL: "/auth/github/callback",
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        try {
          // Check if user exists
          let user = await Users.findOne({ githubId: profile.id });
  
          if (!user) {
            // Create a new user
            user = new Users({
              username: profile.displayName,
              githubId: profile.id,
              email: profile.emails?.[0].value,
            });
            await user.save();
          }
  
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
);

export const githubAuth = passport.authenticate("github", { session: false });

export const githubAuthCallback = passport.authenticate("github", {
    failureRedirect: '/login',
    session: false,
});

export const githubAuthSuccess = async (req: Request, res: Response) => {
    const token = jwt.sign({ id: (req.user as any)._id }, process.env.JWT_SECRET as string, {
        expiresIn: '1h',
    });

    res.status(200).json({ token });
}