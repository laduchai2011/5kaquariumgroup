import { redis_server } from '@src/connect';
import { RedisClientType } from 'redis';
// import { my_log } from '@src/log';


class ServiceRedis {
    private _clientRedis!: RedisClientType
    private _isReady = false;

    constructor() {
        // this._clientRedis = redis_server.get_client();
        // this._clientRedis.on('error', err => console.error(`(ServiceRedis-constructor), err: ${err}`));
        // this._clientRedis.connect();
       
    }

    async init() {
        await redis_server.init();
        this._clientRedis = redis_server.get_client();
        this._clientRedis.on('error', err => console.error(`(ServiceRedis-constructor), err: ${err}`));
        // console.log(11111111, this._isReady)
        // if (!this._isReady) {
        //     const conn = await this._clientRedis.connect();
        //     console.log(22222222, conn)
        //     this._isReady = true;
        // }
    }

    async setData<T>(key: string, jsonValue: T, timeExpireat: number) {
        if (key) {
            // timeExpireat: { EX: 60*60*24 }
            const valueToString = JSON.stringify(jsonValue);
            const isSet = await this._clientRedis.set(key, valueToString, { EX: timeExpireat });
            if (isSet==='OK') {
                return true;
            }
            return false;
        } else {
            throw new Error('(ServiceRedis-setData) Invalid key type!');
        }
    }

    async getData<T>(key: string): Promise<T> {
        if (key) {
            const result = await this._clientRedis.get(key)
            // console.log(33333333, result)
            if (result) {
                const valueToJson = JSON.parse(result);
                return valueToJson as T
            } else {
                throw new Error('(ServiceRedis-getData) data is null!');
            }
        } else {
            throw new Error('(ServiceRedis-getData) Invalid key type!');
        }
    }

    async deleteData(key: string) {      
        if (key) {
            const reply = await this._clientRedis.del(key);
            if (reply === 1) {
                return true;
            } else {
                return false;
            }
        } else {
            throw new Error('(ServiceRedis-deleteData) Invalid key type!');
        }
    }
}

export default ServiceRedis;