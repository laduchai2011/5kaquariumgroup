import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

import router_query_member from './router/query';
import router_mutate_member from './router/mutate';

const service_member: Express = express();

service_member.use(`/query`, router_query_member);
service_member.use(`/mutate`, router_mutate_member);

export default service_member;
