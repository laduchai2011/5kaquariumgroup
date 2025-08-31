import dotenv from 'dotenv';
import my_interface from '@src/interface';

dotenv.config();

// const isProduct = process.env.NODE_ENV === 'production';


const mssql_config: my_interface['mssql']['config'] = {
    host: process.env.MSSQL_SERVER_HOST || '127.0.0.1',
    port: Number(process.env.MSSQL_SERVER_PORT) || 1434,
    database: process.env.MSSQL_SERVER_DATABASE || '5kApp_dev',
    username: process.env.MSSQL_SERVER_USERNAME || 'sa',
    password: process.env.MSSQL_SERVER_PASSWORD || '201195laducHai',
};

const mssql_change_history_config: my_interface['mssql']['config'] = {
    host: process.env.MSSQL_CHANGE_HISTORY_SERVER_HOST || '127.0.0.1',
    port: Number(process.env.MSSQL_CHANGE_HISTORY_SERVER_PORT) || 1434,
    database: process.env.MSSQL_CHANGE_HISTORY_SERVER_DATABASE || '5kApp_change_history_dev',
    username: process.env.MSSQL_CHANGE_HISTORY_SERVER_USERNAME || 'sa',
    password: process.env.MSSQL_CHANGE_HISTORY_SERVER_PASSWORD || '201195laducHai',
};

const redis_config: my_interface['redis']['config'] = {
    host: process.env.REDIS_SERVER_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_SERVER_PORT) || 6379,
    username: process.env.REDIS_SERVER_USERNAME || '',
    password: process.env.REDIS_SERVER_PASSWORD || '',
};

const rabbitmq_config: my_interface['rabbitmq']['config'] = {
    host: process.env.RABBITMQ_SERVER_HOST || '127.0.0.1',
    port: Number(process.env.RABBITMQ_SERVER_PORT) || 5672,
    username: process.env.RABBITMQ_SERVER_USERNAME || 'laduchai',
    password: process.env.RABBITMQ_SERVER_PASSWORD || '201195',
};


export { mssql_config, mssql_change_history_config, redis_config, rabbitmq_config };
