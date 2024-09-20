import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axiosInstance';

// Create a Stripe checkout session
export const createCheckoutSession = createAsyncThunk(
    'payments/createCheckoutSession',
    async ({ bookId, type }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/payment/create-checkout-session', {
                bookId,
                type,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error creating checkout session');
        }
    }
);

// Confirm payment after the Stripe session completes
export const confirmPayment = createAsyncThunk(
    'payments/confirmPayment',
    async (sessionId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/payment/confirm-payment', { sessionId });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error confirming payment');
        }
    }
);
