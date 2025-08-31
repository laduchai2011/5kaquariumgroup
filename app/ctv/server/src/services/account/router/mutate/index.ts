// chua su dung............................................................................
import express, { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import Handle_Signup from './handle/signup';
import Handle_Signin from './handle/signin';

dotenv.config();

const router_mutate_account: Router = express.Router();
const handle_signup = new Handle_Signup();
const handle_signin = new Handle_Signin();

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

router_mutate_account.post(
    '/signin',
    handle_signin.main
);

export default router_mutate_account;
