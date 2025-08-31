import { 
    default as Redlock, 
    ResourceLockedError, 
    // type Lock 
} from 'redlock';
import Redis from 'ioredis';

// Base Redis URL
const baseURL_shopm: string = process.env.NODE_ENV_BASEURL_REDIS || 'redis://192.168.5.100:6379';

// Tạo Redis client
const redis = new Redis(baseURL_shopm);

// Tạo Redlock instance
const serviceRedlock = new Redlock(
    [redis], // single Redis instance
    {
        driftFactor: 0.01,
        retryCount: -1, // retry vô hạn
        retryDelay: 100, // mỗi lần retry cách nhau 100ms
        retryJitter: 200, // ngẫu nhiên thêm 0–200ms
        automaticExtensionThreshold: 500, // nếu TTL gần hết, tự gia hạn
    }
);

// Bắt sự kiện lỗi
serviceRedlock.on('error', (error: unknown) => {
    if (error instanceof ResourceLockedError) {
        return; // lock đã bị giữ, có thể bỏ qua
    }
});

// Export kiểu rõ ràng
export { serviceRedlock };
