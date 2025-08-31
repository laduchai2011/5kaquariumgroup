import dotenv from 'dotenv';
import amqp, { Connection, Channel } from 'amqplib';
import { rabbitmq_config } from '@src/config';
import my_interface from '@src/interface';
import { my_log } from '@src/log';

dotenv.config();

class RABBITMQ_Server {
    private static instance: RABBITMQ_Server;
    private _connection!: Connection;
    private _channel!: Channel;

    private constructor() {}

    static getInstance(): RABBITMQ_Server {
        if (!RABBITMQ_Server.instance) {
            RABBITMQ_Server.instance = new RABBITMQ_Server();
        }
        return RABBITMQ_Server.instance;
    }

    async init(): Promise<void> {
        if (this._connection) return;

        // try {
        //     const rabbitmqConfig = `amqp://${rabbitmq_config?.username}:${rabbitmq_config?.password}@${rabbitmq_config?.host}:${rabbitmq_config?.port}`;
        //     this._connection = await amqp.connect
        //     this._channel = await this._connection.createChannel();
        //     my_log.withGreen('RABBITMQ_Server connected successfully!');
        // } catch (err) {
        //     console.error('Failed to connect RabbitMQ:', err);
        //     throw err;
        // }
    }

    getChannel(): Channel {
        if (!this._channel) throw new Error('Channel not initialized.');
        return this._channel;
    }
}

export default RABBITMQ_Server;
