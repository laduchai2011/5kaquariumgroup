import { redis_server } from "@src/connect";


export async function produceTask<T>(key: string, data: T) {
    // await redis_server.init();
    // const client = redis_server.get_client()
    // await client.rPush(key, JSON.stringify(data));
}