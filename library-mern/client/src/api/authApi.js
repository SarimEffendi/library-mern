
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, userData);
        console.log('Signin response:', response);
        return response;
    } catch (error) {
        console.error('Signin API error:', error);
        throw error;
    }
};
