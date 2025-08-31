import express, { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import Handle_Signup from './handle/signup';

dotenv.config();

const router_mutate_account: Router = express.Router();
const handle_signup = new Handle_Signup();

router_mutate_account.post('/', (_: Request, res: Response) => {
    res.send('(POST) Express + TypeScript Server: router_mutate_account');
});

router_mutate_account.post(
    '/signup',
    handle_signup.setup,
    handle_signup.isAccountCheckUserName,
    handle_signup.isAccountCheckPhone,
    handle_signup.main
);

export default router_mutate_account;
