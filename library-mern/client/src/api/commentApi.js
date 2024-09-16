import axios from 'axios';
import { BASE_URL } from '../utils/constants';

// Fetch comments for a specific book
export const getComments = async (bookId) => {
    try {
        const response = await axios.get(`${BASE_URL}/comment/${bookId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

// Post a new comment
export const postComment = async (bookId, commentData) => {
    try {
        const response = await axios.post(`${BASE_URL}/comment/${bookId}`, commentData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error posting comment:', error);
        throw error;
    }
};