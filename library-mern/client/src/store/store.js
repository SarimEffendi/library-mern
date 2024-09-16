import { configureStore } from '@reduxjs/toolkit';
import bookReducer from '../features/books/bookSlice'; // Import the book slice

const store = configureStore({
    reducer: {
        books: bookReducer, // Add the book slice to the store
    },
});

export default store;
