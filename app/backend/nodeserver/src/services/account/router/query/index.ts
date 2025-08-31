import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_IsSignin from './handle/isSignin';
import Handle_Get_Contacts from './handle/GetContacts';
import Handle_Get_Account from './handle/GetAccount';
import Handle_Get_Statistic from './handle/GetStatistic';
import Handle_Get_Role from './handle/GetRole';
import Handle_Get_AccountWithId from './handle/GetAccountWithId';

dotenv.config();
const router_query_account: Router = express.Router();

const handle_isSignin = new Handle_IsSignin();
const handle_get_contacts = new Handle_Get_Contacts();
const handle_get_account = new Handle_Get_Account();
const handle_get_statistic = new Handle_Get_Statistic();
const handle_get_role = new Handle_Get_Role();
const handle_get_accountWithId = new Handle_Get_AccountWithId();

router_query_account.get('/isSignin', handle_isSignin.main);

router_query_account.get('/account', authentication, handle_get_account.main);

router_query_account.get('/contacts', authentication, handle_get_contacts.main);

router_query_account.get('/statistic', authentication, handle_get_statistic.main);

router_query_account.get('/role', authentication, handle_get_role.main);

router_query_account.get('/getAccountWithId', handle_get_accountWithId.main);

export default router_query_account;
