// import Redis from "ioredis";
import { redis_server } from "@src/connect";

// const redis = new Redis();

export async function consumeTasks<T>(key: string, callback: (data: T) => void) {
    // await redis_server.init();
    // while (true) {
    //     // const task = await redis.blpop(key, 0); // 0 = chờ vô hạn
    //     const task = await redis_server.get_client().blPop(key, 0); // 0 = chờ vô hạn
    //     if (task) {
    //         const value = task.element;
    //         const job: T = JSON.parse(value);
    //         callback(job);
    //     }
    // }
    // await redis_server.init();
    // const client = redis_server.get_client();

    // while (true) {
    //     try {
    //         const task = await client.blPop(key, 0); // Blocking queue
    //         if (task?.element) {
    //             const job: T = JSON.parse(task.element);
    //             await callback(job);
    //         }
    //     } catch (err) {
    //         console.error("consumeTasks error:", err);
    //         // Thử reconnect nếu mất kết nối
    //         if (!client.isOpen) await redis_server.init();
    //         // nghỉ 1s để tránh loop lỗi liên tục
    //         await new Promise((res) => setTimeout(res, 1000));
    //     }
    // }
}