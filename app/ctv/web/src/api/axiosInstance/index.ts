import axios from 'axios';

const apiUrl = process.env.API_URL || 'http://192.168.5.100:3002';

const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default axiosInstance;
