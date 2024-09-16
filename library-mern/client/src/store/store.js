import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './features/book/bookSlice'; // Book slice

const store = configureStore({
    reducer: {
        books: bookReducer, // Add the book slice to the store
    },
});

export default store;
