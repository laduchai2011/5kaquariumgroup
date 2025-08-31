import express, { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
import Handle_Signup from './handle/signup';
import Handle_Signin from './handle/signin';
import Handle_AddContact from './handle/AddContact';
import Handle_ChangeAvatar from './handle/ChangeAvatar';
import Handle_ChangeName from './handle/ChangeName';
import Handle_CreateStatistic from './handle/CreateStatistic';
import authentication from '@src/auth';

dotenv.config();

const router_mutate_account: Router = express.Router();
const handle_signup = new Handle_Signup();
const handle_signin = new Handle_Signin();
const handle_addContact = new Handle_AddContact();
const handle_changeName = new Handle_ChangeName();
const handle_changeAvatar = new Handle_ChangeAvatar();
const handle_createStatistic = new Handle_CreateStatistic();

router_mutate_account.post('/', (_: Request, res: Response) => {
    res.send('(POST) Express + TypeScript Server: router_mutate_account');
});

router_mutate_account.post(
    '/signup',
    // handle_signup.setup,
    handle_signup.isAccountCheckUserName,
    handle_signup.isAccountCheckPhone,
    handle_signup.main
);

router_mutate_account.post(
    '/signin',
    handle_signin.main
);
router_mutate_account.post(
    '/admin_signin',
    handle_signin.main
);

router_mutate_account.patch(
    '/changeAvatar',
    authentication,
    handle_changeAvatar.setup,
    handle_changeAvatar.main
);

router_mutate_account.patch(
    '/changeName',
    authentication,
    handle_changeName.setup,
    handle_changeName.main
);

router_mutate_account.post(
    '/addContact',
    authentication,
    handle_addContact.setup,
    handle_addContact.main
);

router_mutate_account.post(
    '/createStatistic',
    authentication,
    handle_createStatistic.setup,
    handle_createStatistic.main
);

export default router_mutate_account;
