require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from "passport";
import { connectDB } from './src/config/db';
import usersRoutes from "./src/routes/usersRoutes";
import authRoutes from './src/routes/authRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use('/users', usersRoutes);
app.use('/auth', authRoutes)

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});