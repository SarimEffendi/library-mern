// src/pages/Success.jsx 
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { confirmPayment } from '@/features/payments/paymentThunks'; 
import { Loader } from 'react-feather'; 

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { paymentStatus, loading, error } = useSelector((state) => state.payments);

    const [message, setMessage] = useState('Processing your payment...');

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const sessionId = query.get('session_id');

        if (sessionId) {
            dispatch(confirmPayment(sessionId));
        } else {
            setMessage('No session ID found.');
        }
    }, [dispatch, location]);

    useEffect(() => {
        if (paymentStatus === 'success') {
            setMessage('Payment successful! Thank you for your purchase.');
        } else if (error) {
            setMessage('Payment confirmation failed. Please contact support.');
        }
    }, [paymentStatus, error]);

    return (
        <div className="max-w-md mx-auto p-6 bg-background rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Success</h1>
            <p>{error ? <span className="text-red-500">{error}</span> : message}</p>

            <Button
                className="mt-4"
                onClick={() => navigate('/')}
                disabled={loading} 
            >
                {loading ? (
                    <Loader className="animate-spin" /> 
                ) : (
                    'Go to Home'
                )}
            </Button>
        </div>
    );
};

export default Success;
