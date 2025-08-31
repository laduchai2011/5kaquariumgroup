import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_IsSignin from './handle/isSignin';

dotenv.config();
const router_query_member: Router = express.Router();

const handle_isSignin = new Handle_IsSignin();

router_query_member.get('/signin', handle_isSignin.main);

router_query_member.get('/', (req, res) => {
    res.send('11111111111111')
});

export default router_query_member;
