import axios from 'axios';
import { BASE_URL } from '../utils/constants';

// Fetch all comments
export const getAllComments = async () => {
    try {
        console.log("Fetching all comments...");
        const response = await axios.get(`${BASE_URL}/comment`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        console.log("All comments fetched successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching all comments:', error);
        throw error;
    }
};

// Fetch comments for a specific book
export const getComments = async (bookId) => {
    if (!bookId) {
        console.error('bookId is undefined or null');
        return;
    }
    try {
        console.log(`Fetching comments for bookId: ${bookId}`);
        const response = await axios.get(`${BASE_URL}/comment/${bookId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        console.log(`Comments for bookId ${bookId} fetched successfully:`, response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

// Post a new comment
export const postComment = async (bookId, commentData) => {
    if (!bookId) {
        console.error('bookId is undefined or null');
        return;
    }
    try {
        console.log(`Posting new comment for bookId: ${bookId}`, commentData);
        const response = await axios.post(`${BASE_URL}/comment/${bookId}`, commentData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
        });
        console.log("New comment posted successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error posting comment:', error);
        throw error;
    }
};

// Update an existing comment
export const updateExistingComment = async (commentId, updatedFields) => {
    if (!commentId) {
        console.error('commentId is undefined or null');
        return;
    }
    try {
        console.log(`Updating comment ID: ${commentId} with fields:`, updatedFields);
        const response = await axios.put(`${BASE_URL}/comment/${commentId}`, updatedFields, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
        });
        console.log("Comment updated successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
};

// Delete an existing comment
export const deleteExistingComment = async (commentId) => {
    if (!commentId) {
        console.error('commentId is undefined or null');
        return;
    }
    try {
        console.log(`Deleting comment ID: ${commentId}`);
        const response = await axios.delete(`${BASE_URL}/comment/${commentId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        console.log(`Comment ID ${commentId} deleted successfully.`);
        return response.data;
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
};
