// src/features/books/bookSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks, addBook, updateBook, deleteBook } from './bookThunks';

const initialState = {
    items: [],      
    totalBooks: 0,      // 
    currentPage: 1,     
    totalPages: 1,      // 
    loading: false,
    error: null, 
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
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

        builder.addCase(addBook.fulfilled, (state, action) => {
            state.items.push(action.payload);
            state.totalBooks += 1;
        });

        builder.addCase(updateBook.fulfilled, (state, action) => {
            const index = state.items.findIndex(
                (book) => book.id === action.payload.id || book._id === action.payload._id
            );
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        });

        builder.addCase(deleteBook.fulfilled, (state, action) => {
            state.items = state.items.filter(
                (book) => book.id !== action.payload && book._id !== action.payload
            );
            state.totalBooks -= 1;
        });
    },
});

export default bookSlice.reducer;
