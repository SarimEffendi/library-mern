import axios from 'axios';
import { BASE_URL } from '@/utils/constants';
import {jwtDecode} from 'jwt-decode'; // Correct import

let isRedirecting = false; // This flag can be removed if not using redirects

const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        return true;
    }
};

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            if (isTokenExpired(token)) {
                localStorage.removeItem('authToken');

                // Remove redirect logic
                // Optionally, you can dispatch an event or call a callback here

                return Promise.reject(new Error('Token expired'));
            }
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('authToken');

            // Remove redirect logic
            // Optionally, you can dispatch an event or call a callback here
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
