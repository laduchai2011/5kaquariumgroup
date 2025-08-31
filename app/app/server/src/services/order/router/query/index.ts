import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_Get_MyOrders from './handle/GetMyOrders';
import authentication from '@src/auth';

dotenv.config();
const router_query_order: Router = express.Router();

const handle_get_myOrders = new Handle_Get_MyOrders();

router_query_order.get(
    '/getMyOrders', 
    authentication,
    handle_get_myOrders.main
);

export default router_query_order;
