import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axiosInstance'; 

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error fetching users");
        }
    }
);

export const fetchUserById = createAsyncThunk(
    "users/fetchUserById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/user/${id}`);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error fetching user details");
        }
    }
);

export const createUser = createAsyncThunk(
    "users/createUser",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user", user);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error creating user");
        }
    }
);

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({ id, user }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/user/${id}`, user);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error updating user");
        }
    }
);

export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/user/${id}`);
            return { id, message: response.data.message }; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error deleting user");
        }
    }
);
