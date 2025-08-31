import dotenv from 'dotenv';
import MSSQL_Server from './mssql';
// import MSSQL_Change_History_Server from './mssql_change_history';
import REDIS_Server from './redis';
import RABBITMQ_Server from './rabbitmq';
import { serviceRedlock } from './redlock';

dotenv.config();

const mssql_server = MSSQL_Server.getInstance();
// const mssql_change_history_server = new MSSQL_Change_History_Server();
const redis_server = REDIS_Server.getInstance();
const rabbitmq_server = RABBITMQ_Server.getInstance();
// redis_server.init();
// process.on('SIGINT', async () => {
//     await redis_server.close();
//     process.exit(0);
// });

export { mssql_server, redis_server, rabbitmq_server, serviceRedlock };
