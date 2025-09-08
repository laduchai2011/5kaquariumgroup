const isProduct = import.meta.env.VITE_NODE_ENV === 'production';

export const BASE_URL = isProduct ? import.meta.env.VITE_API_URL : 'http://172.19.224.1:3006';