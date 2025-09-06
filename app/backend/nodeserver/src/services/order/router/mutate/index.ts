import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_AddOrderWithTransaction from './handle/AddOrderWithTransaction';
import Handle_GetOrdersWithFilter from './handle/GetOrdersWithFilter';
import Handle_BuyNow from './handle/BuyNow';
import Handle_AddToNewCart from './handle/AddToNewCart';
import Handle_CreateNewCart from './handle/CreateNewCart';
import Handle_AddPaymentToNewCart from './handle/AddPaymentToNewCart';
import Handle_AddContactToNewCart from './handle/AddContactToNewCart';
import Handle_AddProductToNewCart from './handle/AddProductToNewCart';
import authentication from '@src/auth';



dotenv.config();

const router_mutate_order: Router = express.Router();
const handle_addOrderWithTransaction = new Handle_AddOrderWithTransaction();
const handle_getOrdersWithFilter = new Handle_GetOrdersWithFilter();
// newlogic
const handle_buyNow = new Handle_BuyNow();
const handle_addToNewCart = new Handle_AddToNewCart();
const handle_createNewCart = new Handle_CreateNewCart();
const handle_addPaymentToNewCart = new Handle_AddPaymentToNewCart();
const handle_addContactToNewCart = new Handle_AddContactToNewCart();
const handle_addProductToNewCart = new Handle_AddProductToNewCart();




router_mutate_order.post(
    '/addOrderWithTransaction',
    handle_addOrderWithTransaction.setup,
    handle_addOrderWithTransaction.main
);

router_mutate_order.post(
    '/getOrdersWithFilter',
    handle_getOrdersWithFilter.main
);


///////////////
router_mutate_order.post(
    '/buyNow',
    handle_buyNow.setup,
    handle_buyNow.main
);

router_mutate_order.post(
    '/addToNewCart',
    authentication,
    handle_addToNewCart.setup,
    handle_addToNewCart.main
);

router_mutate_order.post(
    '/addToNewCart',
    authentication,
    handle_createNewCart.setup,
    handle_createNewCart.main
);

router_mutate_order.post(
    '/addPaymentToNewCart',
    authentication,
    handle_addPaymentToNewCart.main
);

router_mutate_order.post(
    '/addContactToNewCart',
    authentication,
    handle_addContactToNewCart.main
);

router_mutate_order.post(
    '/addProductToNewCart',
    authentication,
    handle_addProductToNewCart.main
);

export default router_mutate_order;
