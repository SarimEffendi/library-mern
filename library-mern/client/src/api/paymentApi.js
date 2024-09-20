import axiosInstance from '@/api/axiosInstance';

export const createCheckoutSession = async (bookId, type) => {
    try {
        const response = await axiosInstance.post('/payment/create-checkout-session', {
            bookId,
            type,
        });
        return response.data;
    } catch (error) {
        console.error('Error in createCheckoutSession:', error);
        throw error;
    }
};

export const confirmPayment = async (sessionId) => {
    try {
        const response = await axiosInstance.post('/payment/confirm-payment', {
            sessionId,
        });
        return response.data;
    } catch (error) {
        console.error('Error in confirmPayment:', error);
        throw error;
    }
};
