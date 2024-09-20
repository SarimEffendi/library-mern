// paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createCheckoutSession, confirmPayment } from '@/features/payments/paymentThunks';

const initialState = {
    sessionUrl: null,       
    paymentStatus: null,   
    loading: false,         
    error: null,           
};

const paymentSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createCheckoutSession.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCheckoutSession.fulfilled, (state, action) => {
                state.sessionUrl = action.payload.url;
                state.loading = false;
            })
            .addCase(createCheckoutSession.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
                state.loading = false;
            })

            .addCase(confirmPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.paymentStatus = null;
            })
            .addCase(confirmPayment.fulfilled, (state, action) => {
                state.paymentStatus = 'success'; 
                state.loading = false;
            })
            .addCase(confirmPayment.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
                state.loading = false;
            });
    },
});

export default paymentSlice.reducer;
