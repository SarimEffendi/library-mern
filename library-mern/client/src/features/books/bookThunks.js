// src/features/books/bookThunks.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance"; 

export const fetchBooks = createAsyncThunk(
    "books/fetchBooks",
    async ({ page, limit }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/book", {
                params: { page, limit },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error fetching books");
        }
    }
);

export const fetchBookById = createAsyncThunk(
    "books/fetchBookById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/book/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Error fetching book details"
            );
        }
    }
);

export const fetchBooksByAuthor = createAsyncThunk(
    "books/fetchBooksByAuthor",
    async (authorId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/book/author/${authorId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Error fetching books by author"
            );
        }
    }
);

export const addBook = createAsyncThunk(
    "books/addBook",
    async (book, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/book", book);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error adding book");
        }
    }
);

export const updateBook = createAsyncThunk(
    "books/updateBook",
    async (book, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/book/${book.id}`, book);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error updating book");
        }
    }
);

export const deleteBook = createAsyncThunk(
    "books/deleteBook",
    async (id, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`/book/${id}`);
            return id; 
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error deleting book");
        }
    }
);

export const fetchOwnedBooks = createAsyncThunk(
    "books/fetchOwnedBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/book/owned-books");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Error fetching owned books"
            );
        }
    }
);

export const fetchPurchasedBookContent = createAsyncThunk(
    "books/fetchPurchasedBookContent",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/book/access/purchased", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Error accessing purchased book content"
            );
        }
    }
);

export const fetchRentedBookContent = createAsyncThunk(
    "books/fetchRentedBookContent",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/book/access/rented", data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || "Error accessing rented book content"
            );
        }
    }
);
