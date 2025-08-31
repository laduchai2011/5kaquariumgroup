import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import router_query_image from './router/query';
import router_mutate_image from './router/mutate';

const service_image: Express = express();

service_image.use(`/query`, router_query_image);
service_image.use(`/mutate`, router_mutate_image);

export default service_image;
