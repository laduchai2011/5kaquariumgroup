import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_AddOrderWithTransaction from './handle/AddOrderWithTransaction';
import Handle_GetOrdersWithFilter from './handle/GetOrdersWithFilter';



dotenv.config();

const router_mutate_order: Router = express.Router();
const handle_addOrderWithTransaction = new Handle_AddOrderWithTransaction();
const handle_getOrdersWithFilter = new Handle_GetOrdersWithFilter();




router_mutate_order.post(
    '/addOrderWithTransaction',
    handle_addOrderWithTransaction.setup,
    handle_addOrderWithTransaction.main
);

router_mutate_order.post(
    '/getOrdersWithFilter',
    handle_getOrdersWithFilter.main
);

export default router_mutate_order;
