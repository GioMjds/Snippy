require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from "passport";
import { connectDB } from './config/db';
import usersRoutes from "./routes/usersRoutes";
import authRoutes from './routes/authRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    }
}))

app.use('/users', usersRoutes);
app.use('/auth', authRoutes)

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});