import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance'; // Use Axios instance

/**
 * Thunks for Book CRUD Operations and Custom Routes
 */

// Get all books
export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/book');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error fetching books');
    }
});

// Get a specific book by ID
export const fetchBookById = createAsyncThunk('books/fetchBookById', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/book/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error fetching book details');
    }
});

// Get books by a specific author
export const fetchBooksByAuthor = createAsyncThunk('books/fetchBooksByAuthor', async (authorId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/book/author/${authorId}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error fetching books by author');
    }
});

// Add a new book (for authors and admins)
export const addBook = createAsyncThunk('books/addBook', async (book, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/book', book);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error adding book');
    }
});

// Update a book by ID
export const updateBook = createAsyncThunk('books/updateBook', async (book, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/book/${book.id}`, book);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error updating book');
    }
});

// Delete a book by ID
export const deleteBook = createAsyncThunk('books/deleteBook', async (id, { rejectWithValue }) => {
    try {
        await axiosInstance.delete(`/book/${id}`);
        return id; // Return the deleted book's ID
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error deleting book');
    }
});

// Fetch owned books (user's purchased and rented books)
export const fetchOwnedBooks = createAsyncThunk('books/fetchOwnedBooks', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/book/owned-books');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error fetching owned books');
    }
});

// Fetch purchased book content (requires payment verification)
export const fetchPurchasedBookContent = createAsyncThunk('books/fetchPurchasedBookContent', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/book/access/purchased', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error accessing purchased book content');
    }
});

// Fetch rented book content (requires payment verification)
export const fetchRentedBookContent = createAsyncThunk('books/fetchRentedBookContent', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/book/access/rented', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Error accessing rented book content');
    }
});
