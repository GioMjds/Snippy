require('dotenv').config();
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello Express.js!" });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});