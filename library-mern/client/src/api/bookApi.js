import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const getAuthToken = () => localStorage.getItem('authToken');

const createHeaders = () => ({
    Authorization: `Bearer ${getAuthToken()}`,
    'Content-Type': 'application/json',
});

export const createBook = async (bookData) => {
    if (!bookData || typeof bookData !== 'object') {
        throw new Error('Invalid book data');
    }
    try {
        const response = await axios.post(`${BASE_URL}/book`, bookData, {
            headers: createHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error creating book:', error.response?.data || error.message);
        throw error;
    }
};

export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/book`, {
            headers: createHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching all books:', error.response?.data || error.message);
        throw error;
    }
};

export const getBookById = async (bookId) => {
    if (!bookId) {
        console.error('Invalid bookId:', bookId);
        throw new Error('Invalid bookId');
    }
    try {
        const response = await axios.get(`${BASE_URL}/book/${bookId}`, {
            headers: createHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching book details:', error.response?.data || error.message);
        throw error;
    }
};
export const getBooksByAuthor = async (authorId) => {
    console.log("authorid:",authorId);
    if (!authorId) {
        console.error('Invalid authorId:', authorId);
        throw new Error('Invalid authorId');
    }
    try {
        const response = await axios.get(`${BASE_URL}/book/author/${authorId}`, {
            headers: createHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching books by author:', error.response?.data || error.message);
        throw error;
    }
}

export const updateBookById = async (bookId, bookData) => {
    if (!bookId || !bookData || typeof bookData !== 'object') {
        console.error('Invalid parameters:', { bookId, bookData });
        throw new Error('Invalid parameters');
    }
    try {
        const response = await axios.put(`${BASE_URL}/book/${bookId}`, bookData, {
            headers: createHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error.response?.data || error.message);
        throw error;
    }
};

export const deleteBook = async (bookId) => {
    if (!bookId) {
        console.error('Invalid bookId:', bookId);
        throw new Error('Invalid bookId');
    }
    try {
        const response = await axios.delete(`${BASE_URL}/book/${bookId}`, {
            headers: createHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting book:', error.response?.data || error.message);
        throw error;
    }
};

export const getBookContent = async (bookId, paymentId) => {
    if (!bookId || !paymentId) {
        console.error('Invalid parameters:', { bookId, paymentId });
        throw new Error('Book ID and Payment ID are required');
    }
    try {
        const response = await axios.post(`${BASE_URL}/book/access/purchased`, { bookId, paymentId }, {
            headers: createHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching book content:', error.response?.data || error.message);
        throw error;
    }
};

export const getRentedBookContent = async (bookId, paymentId) => {
    if (!bookId || !paymentId) {
        console.error('Invalid parameters:', { bookId, paymentId });
        throw new Error('Book ID and Payment ID are required');
    }
    try {
        const response = await axios.post(`${BASE_URL}/book/access/rented`, { bookId, paymentId }, {
            headers: createHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching rented book content:', error.response?.data || error.message);
        throw error;
    }
};

export const getOwnedBooks = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/book/owned-books`, {
            headers: createHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching owned books:', error.response?.data || error.message);
        throw error;
    }
};


export const uploadBook = async (bookData) => {
    try {
        const response = await axios.post(`${BASE_URL}/book`, bookData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading book:', error);
        throw error;
    }
};