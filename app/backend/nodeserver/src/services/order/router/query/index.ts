import express, { Router } from 'express';
import dotenv from 'dotenv';
// import Handle_Get_MyOrders from './handle/GetMyOrders';
import Handle_WebappSreenProductGetShoppingCarts from './handle/WebappSreenProductGetShoppingCarts';
import Handle_WebappSreenMyOrderGetMyOrders from './handle/WebappSreenMyOrderGetMyOrders';
import Handle_WebappSreenMyOrderGetMyALLOrderProductsInOrder from './handle/WebappSreenMyOrderGetMyALLOrderProductsInOrder';
import Handle_WebappSreenMyOrderGetMyOrderProcessInOrder from './handle/WebappSreenMyOrderGetMyOrderProcessInOrder';
import authentication from '@src/auth';

dotenv.config();
const router_query_order: Router = express.Router();

// const handle_get_myOrders = new Handle_Get_MyOrders();
const handle_webappSreenProductGetShoppingCarts = new Handle_WebappSreenProductGetShoppingCarts();
const handle_webappSreenMyOrderGetMyOrders = new Handle_WebappSreenMyOrderGetMyOrders();
const handle_webappSreenMyOrderGetMyALLOrderProductsInOrder = new Handle_WebappSreenMyOrderGetMyALLOrderProductsInOrder();
const handle_webappSreenMyOrderGetMyOrderProcessInOrder = new Handle_WebappSreenMyOrderGetMyOrderProcessInOrder();




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

router_query_order.get(
    '/webappSreenMyOrderGetMyALLOrderProductsInOrder', 
    authentication,
    handle_webappSreenMyOrderGetMyALLOrderProductsInOrder.main
);

router_query_order.get(
    '/webappSreenMyOrderGetMyOrderProcessInOrder', 
    authentication,
    handle_webappSreenMyOrderGetMyOrderProcessInOrder.main
);

export default router_query_order;
