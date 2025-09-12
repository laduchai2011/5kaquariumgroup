const isProduct = process.env.NODE_ENV === 'production';

export const BASE_URL = isProduct ? process.env.API_URL : 'http://5kaquarium.local.com:3006';