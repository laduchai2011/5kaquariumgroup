import express, { Router } from 'express';
import dotenv from 'dotenv';
import Handle_Get_AProductWithId from './handle/GetAProductWithId';
import Handle_Get_Products from './handle/GetProducts';


dotenv.config();
const router_query_product: Router = express.Router();

const handle_get_aProductWithId = new Handle_Get_AProductWithId();
const handle_get_product = new Handle_Get_Products();


router_query_product.get(
    '/getAProductWithId',
    handle_get_aProductWithId.main
);

router_query_product.get(
    '/getProducts',
    handle_get_product.main
);



export default router_query_product;
