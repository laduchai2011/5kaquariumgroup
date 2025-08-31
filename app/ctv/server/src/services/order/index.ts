import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import router_query_account from './router/query';
import router_mutate_account from './router/mutate';

const service_order: Express = express();

service_order.use(`/query`, router_query_account);
service_order.use(`/mutate`, router_mutate_account);

export default service_order;
