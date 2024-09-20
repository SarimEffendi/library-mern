import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axiosInstance'; 

// // Fetch comments by book ID
export const fetchCommentsByBookId = createAsyncThunk(
    "comments/fetchCommentsByBookId",
    async (bookId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/comment/book/${bookId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching comments");
        }
    }
);

// Fetch a comment by ID
export const fetchCommentById = createAsyncThunk(
    "comments/fetchCommentById",
    async (commentId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/comment/${commentId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Error fetching comment details"
            );
        }
    }
);

// Add a new comment
export const addComment = createAsyncThunk(
    "comments/addComment",
    async ({ bookId, commentData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/comment/${bookId}`, commentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error adding comment");
        }
    }
);

// Update an existing comment
export const updateComment = createAsyncThunk(
    "comments/updateComment",
    async ({ commentId, commentData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/comment/${commentId}`, commentData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error updating comment");
        }
    }
);

// Delete a comment
export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async (commentId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/comment/${commentId}`);
            return commentId; 
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error deleting comment");
        }
    }
);

// Fetch comments by a specific author
export const fetchCommentsByAuthor = createAsyncThunk(
    "comments/fetchCommentsByAuthor",
    async (authorId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/comment/author/${authorId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Error fetching comments by author"
            );
        }
    }
);
