import express, { Router } from 'express';
import dotenv from 'dotenv';
import authentication from '@src/auth';
import Handle_AddProduct from './handle/AddProduct';

dotenv.config();

const router_mutate_product: Router = express.Router();
const handle_addProduct = new Handle_AddProduct();


router_mutate_product.post(
    '/addProduct',
    authentication,
    handle_addProduct.setup,
    handle_addProduct.main
);



export default router_mutate_product;
