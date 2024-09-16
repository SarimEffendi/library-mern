// src/features/books/bookSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks, addBook, updateBook, deleteBook } from './bookThunks';

const initialState = {
    items: [],          // Array of books
    totalBooks: 0,      // Total number of books
    currentPage: 1,     // Current page number
    totalPages: 1,      // Total number of pages
    loading: false,     // Loading state
    error: null,        // Error state
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        // You can add synchronous actions here if needed
    },
    extraReducers: (builder) => {
        // Handle fetchBooks thunk
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.items = action.payload.books;
                state.totalBooks = action.payload.totalBooks;
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
                state.loading = false;
            });

        // Handle addBook thunk
        builder.addCase(addBook.fulfilled, (state, action) => {
            state.items.push(action.payload);
            state.totalBooks += 1;
        });

        // Handle updateBook thunk
        builder.addCase(updateBook.fulfilled, (state, action) => {
            const index = state.items.findIndex(
                (book) => book.id === action.payload.id || book._id === action.payload._id
            );
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        });

        // Handle deleteBook thunk
        builder.addCase(deleteBook.fulfilled, (state, action) => {
            state.items = state.items.filter(
                (book) => book.id !== action.payload && book._id !== action.payload
            );
            state.totalBooks -= 1;
        });
    },
});

export default bookSlice.reducer;
