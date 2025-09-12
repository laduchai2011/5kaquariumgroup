import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import process from 'process';
import cors from "cors";

dotenv.config();

import service_account from '@src/services/account';
import service_order from '@src/services/order';
import service_image from './services/image';
import service_fishCode from './services/fishCode';
import service_product from './services/product';


const NODE_ENV = process.env.NODE_ENV;

const isProduct = NODE_ENV === 'production';

const app: Express = express();
const port = isProduct ? process.env.PORT : 3006;

if (NODE_ENV === 'development') {
    app.use(cors({
        origin: ["http://5kaquarium.local.com:3000", "http://5kaquarium.local.com:5173"], // domain cho phép
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true // cho phép gửi cookie, Authorization headers
    }));
} 

if (NODE_ENV === 'production') {
    app.use(cors({
        origin: ["https://5kaquarium.com", "https://admin.5kaquarium.com"], // domain cho phép
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true // cho phép gửi cookie, Authorization headers
    }));
}

app.use(cookieParser());
app.use(`/api`, express.json({ limit: '50mb' }));
app.use(`/api`, express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/helo', (_: Request, res: Response) => {
    res.send('5k xin chao')
})

app.use(`/api/service_account`, service_account);
app.use(`/api/service_order`, service_order);
app.use(`/api/service_image`, service_image);
app.use(`/api/service_fishCode`, service_fishCode);
app.use(`/api/service_product`, service_product);

app.use('/watch1', express.static(path.join(process.cwd(), 'data', 'video', 'output', 'video.mp4')));

app.listen(port, () => {
    if (NODE_ENV === 'development') {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    }
    if (NODE_ENV === 'production') {
        console.log(`[server]: Server is running at http://api.5kaquarium.com`);
    }
});
