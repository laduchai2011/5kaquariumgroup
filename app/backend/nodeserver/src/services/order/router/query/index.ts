import express, { Router } from 'express';
import dotenv from 'dotenv';
// import Handle_Get_MyOrders from './handle/GetMyOrders';
import Handle_WebappSreenProductGetShoppingCarts from './handle/WebappSreenProductGetShoppingCarts';
import Handle_WebappSreenMyOrderGetMyOrders from './handle/WebappSreenMyOrderGetMyOrders';
import Handle_WebappSreenMyOrderGetMyALLOrderProductsInOrder from './handle/WebappSreenMyOrderGetMyALLOrderProductsInOrder';
import authentication from '@src/auth';

dotenv.config();
const router_query_order: Router = express.Router();

// const handle_get_myOrders = new Handle_Get_MyOrders();
const handle_webappSreenProductGetShoppingCarts = new Handle_WebappSreenProductGetShoppingCarts();
const handle_webappSreenMyOrderGetMyOrders = new Handle_WebappSreenMyOrderGetMyOrders();
const handle_webappSreenMyOrderGetMyALLOrderProductsInOrder = new Handle_WebappSreenMyOrderGetMyALLOrderProductsInOrder();




// router_query_order.get(
//     '/getMyOrders', 
//     authentication,
//     handle_get_myOrders.main
// );

router_query_order.get(
    '/webappSreenProductGetShoppingCarts', 
    authentication,
    handle_webappSreenProductGetShoppingCarts.main
);

router_query_order.post(
    '/webappSreenMyOrderGetMyOrders', 
    authentication,
    handle_webappSreenMyOrderGetMyOrders.main
);

router_query_order.post(
    '/webappSreenMyOrderGetMyALLOrderProductsInOrder', 
    authentication,
    handle_webappSreenMyOrderGetMyALLOrderProductsInOrder.main
);

export default router_query_order;
