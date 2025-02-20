require('dotenv').config();
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import morgan from "morgan";
import usersRoutes from './routes/usersRoutes';
import authRoutes from './routes/authRoutes';
import { connectDB } from './config/db';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const server = http.createServer(app);

app.use('/users', usersRoutes);
app.use('/auth', authRoutes);

connectDB();

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});