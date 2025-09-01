const isProduct = process.env.NODE_ENV === 'production';

export const BASE_URL = isProduct ? process.env.API_URL : 'http://172.19.224.1:3006';