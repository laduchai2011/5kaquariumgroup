import express, { Router } from 'express';
import dotenv from 'dotenv';
// import Handle_Signup from './handle/AddOrder';
import Handle_AddOrderWithTransaction from './handle/AddOrderWithTransaction';

dotenv.config();

const router_mutate_order: Router = express.Router();
const handle_addOrderWithTransaction = new Handle_AddOrderWithTransaction();


router_mutate_order.post(
    '/addOrderWithTransaction',
    handle_addOrderWithTransaction.setup,
    handle_addOrderWithTransaction.main
    // handle_signup.setup,
    // handle_signup.isAccountCheckUserName,
    // handle_signup.isAccountCheckPhone,
    // handle_signup.main
);

export default router_mutate_order;
