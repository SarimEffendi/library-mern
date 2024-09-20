/* eslint-disable no-useless-catch */
import axiosInstance from '@/api/axiosInstance';

export const registerUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/auth/login', userData); 
        console.log('Signin response:', response);
        return response;
    } catch (error) {
        console.error('Signin API error:', error);
        throw error;
    }
};
