import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
// Create an Axios instance
const axiosInstance = axios.create({
    baseURL:BASE_URL, // API base URL
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // Get token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`; // Attach the token
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
