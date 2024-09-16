import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks, addBook, updateBook, deleteBook } from './bookThunks';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {}, // You can add synchronous actions here if needed
    extraReducers: (builder) => {
        // Handle fetchBooks thunk
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            });

        // Handle addBook thunk
        builder.addCase(addBook.fulfilled, (state, action) => {
            state.items.push(action.payload);
        });

        // Handle updateBook thunk
        builder.addCase(updateBook.fulfilled, (state, action) => {
            const index = state.items.findIndex((book) => book.id === action.payload.id);
            state.items[index] = action.payload;
        });

        // Handle deleteBook thunk
        builder.addCase(deleteBook.fulfilled, (state, action) => {
            state.items = state.items.filter((book) => book.id !== action.payload);
        });
    },
});

export default bookSlice.reducer;
