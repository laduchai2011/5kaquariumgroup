// chua su dung............................................................................
import express, { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import Handle_Signin from './handle/signin';

dotenv.config();

const router_mutate_member: Router = express.Router();
const handle_signin = new Handle_Signin();

router_mutate_member.post('/', (_: Request, res: Response) => {
    res.send('(POST) Express + TypeScript Server: router_mutate_account');
});

router_mutate_member.post(
    '/signin',
    // handle_signup.setup,
    // handle_signup.isAccountCheckUserName,
    // handle_signup.isAccountCheckPhone,
    handle_signin.main
);

export default router_mutate_member;
