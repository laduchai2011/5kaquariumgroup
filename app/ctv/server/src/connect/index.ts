import dotenv from 'dotenv';
import MSSQL_Server from './mssql';
import MSSQL_Change_History_Server from './mssql_change_history';
import REDIS_Server from './redis';
import { serviceRedlock } from './redlock';

dotenv.config();

const mssql_server = new MSSQL_Server();
const mssql_change_history_server = new MSSQL_Change_History_Server();
const redis_server = new REDIS_Server();

export { mssql_server, mssql_change_history_server, redis_server, serviceRedlock };
