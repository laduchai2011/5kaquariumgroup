import axios from 'axios';
import { BASE_URL } from '@src/const/api/baseUrl';

const apiUrl = BASE_URL;

const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});

export default axiosInstance;
