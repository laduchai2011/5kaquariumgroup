import express, { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_AddFishCode from './handle/AddFishCode';

dotenv.config();

const router_mutate_account: Router = express.Router();
const handle_addFishCode = new Handle_AddFishCode();


router_mutate_account.post('/', (_: Request, res: Response) => {
    res.send('(POST) Express + TypeScript Server: router_mutate_account');
});

router_mutate_account.post(
    '/addFishCode',
    authentication,
    handle_addFishCode.setup,
    handle_addFishCode.main
);


export default router_mutate_account;
