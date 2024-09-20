import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axiosInstance'; 

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => { 
        try {
            const response = await axiosInstance.post('/auth/register', userData);
            const { token, user } = response.data; 
            
            localStorage.setItem('authToken', token);

            return { token, user };
        } catch (error) {
            console.error('Error during registration:', error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => { 
        try {
            const response = await axiosInstance.post('/auth/login', userData);
            const { token, user } = response.data;

            localStorage.setItem('authToken', token);

            return { user, token };
        } catch (error) {
            console.error('Error during login:', error.message);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/auth/current-user');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);