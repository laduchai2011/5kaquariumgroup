import express, { Router } from 'express';
import dotenv from 'dotenv';
// import Handle_Get_MyOrders from './handle/GetMyOrders';
import authentication from '@src/auth';
import Handle_WebappSreenProductGetShoppingCarts from './handle/WebappSreenProductGetShoppingCarts';
import Handle_WebappSreenMyOrderGetMyOrders from './handle/WebappSreenMyOrderGetMyOrders';
import Handle_WebappSreenMyOrderGetMyALLOrderProductsInOrder from './handle/WebappSreenMyOrderGetMyALLOrderProductsInOrder';
import Handle_WebappSreenMyOrderGetMyOrderProcessInOrder from './handle/WebappSreenMyOrderGetMyOrderProcessInOrder';
import Handle_WebadminSreenOrderGetOrders from './handle/WebadminSreenOrderGetOrders';
import Handle_WebadminSreenOrderGetALLOrderProductsInOrder from './handle/WebadminSreenOrderGetALLOrderProductsInOrder';






dotenv.config();
const router_query_order: Router = express.Router();

// const handle_get_myOrders = new Handle_Get_MyOrders();
const handle_webappSreenProductGetShoppingCarts = new Handle_WebappSreenProductGetShoppingCarts();
const handle_webappSreenMyOrderGetMyOrders = new Handle_WebappSreenMyOrderGetMyOrders();
const handle_webappSreenMyOrderGetMyALLOrderProductsInOrder = new Handle_WebappSreenMyOrderGetMyALLOrderProductsInOrder();
const handle_webappSreenMyOrderGetMyOrderProcessInOrder = new Handle_WebappSreenMyOrderGetMyOrderProcessInOrder();
const handle_webadminSreenOrderGetOrders = new Handle_WebadminSreenOrderGetOrders();
const handle_webadminSreenOrderGetALLOrderProductsInOrder = new Handle_WebadminSreenOrderGetALLOrderProductsInOrder();







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



router_query_order.post(
    '/webadminSreenOrderGetOrders', 
    authentication,
    handle_webadminSreenOrderGetOrders.main
);

router_query_order.post(
    '/webadminSreenOrderGetALLOrderProductsInOrder', 
    authentication,
    handle_webadminSreenOrderGetALLOrderProductsInOrder.main
);

export default router_query_order;
