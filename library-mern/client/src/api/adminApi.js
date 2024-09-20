/* eslint-disable no-useless-catch */
import axiosInstance from '@/api/axiosInstance'; 

// Fetch all users
export const fetchUsers = async () => {
    try {
        const response = await axiosInstance.get('/user'); 
        console.log('Fetched Users:', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch a user by ID
export const fetchUserById = async (id) => {
    try {
        const response = await axiosInstance.get(`/user/${id}`); 
        console.log(`Fetched User ${id}:`, response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Create a new user
export const createUser = async (user) => {
    try {
        const response = await axiosInstance.post('/user', user); 
        console.log('Created User:', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update a user
export const updateUser = async (id, user) => {
    try {
        const response = await axiosInstance.put(`/user/${id}`, user);
        console.log(`Updated User ${id}:`, response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Delete a user
export const deleteUser = async (id) => {
    try {
        const response = await axiosInstance.delete(`/user/${id}`); 
        console.log(`Deleted User ${id}:`, response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};
