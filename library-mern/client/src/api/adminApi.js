import axios from 'axios';
import { BASE_URL } from '@/utils/constants';

// Helper function to get headers, including authorization
const getHeaders = () => {
    const token = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage
    return {
        headers: {
            'Authorization': `Bearer ${token}`, // Attach token
            'Content-Type': 'application/json', // Default content type
        }
    };
};

// Helper function to handle errors
const handleError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error Response Data:', error.response.data);
        console.error('Error Response Status:', error.response.status);
        console.error('Error Response Headers:', error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.error('Error Request Data:', error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error Message:', error.message);
    }
    console.error('Error Config:', error.config);
};

// Fetch all users
export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user`, getHeaders());
        console.log('Fetched Users:', response.data);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// Fetch a user by ID
export const fetchUserById = async (id) => {
    if (!id) {
        throw new Error('User ID is required');
    }
    try {
        const response = await axios.get(`${BASE_URL}/user/${id}`, getHeaders());
        console.log(`Fetched User ${id}:`, response.data);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// Create a new user
export const createUser = async (user) => {
    if (!user || !user.username || !user.email || !user.password || !user.role) {
        throw new Error('All user fields are required');
    }
    try {
        const response = await axios.post(`${BASE_URL}/user`, user, getHeaders());
        console.log('Created User:', response.data);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// Update a user
export const updateUser = async (id, user) => {
    if (!id) {
        throw new Error('User ID is required');
    }
    if (!user || Object.keys(user).length === 0) {
        throw new Error('User data is required for update');
    }
    try {
        const response = await axios.put(`${BASE_URL}/user/${id}`, user, getHeaders());
        console.log(`Updated User ${id}:`, response.data);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// Delete a user
export const deleteUser = async (id) => {
    if (!id) {
        throw new Error('User ID is required');
    }
    try {
        const response = await axios.delete(`${BASE_URL}/user/${id}`, getHeaders());
        console.log(`Deleted User ${id}:`, response.data);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
};
