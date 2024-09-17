// src/pages/Success.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { confirmPayment } from '@/api/paymentApi'; // Adjust the path as necessary

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState('Processing your payment...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const sessionId = query.get('session_id');

        if (sessionId) {
            const processPayment = async () => {
                try {
                    const data = await confirmPayment(sessionId);

                    if (data.success) {
                        setMessage('Payment successful! Thank you for your purchase.');
                    } else {
                        setError('Payment confirmation failed. Please contact support.');
                    }
                } catch (err) {
                    // The error message is handled by axios interceptors and confirmPayment
                    if (err.message === 'Token expired') {
                        setError('Your session has expired. Please log in again.');
                        navigate('/login');
                    } else {
                        setError('An error occurred while confirming your payment.');
                    }
                }
            };

            processPayment();
        } else {
            setError('No session ID found.');
        }
    }, [location, navigate]);

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 bg-background rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Error</h1>
                <p className="text-red-500">Error: {error}</p>
                <Button className="mt-4" onClick={() => navigate('/')}>
                    Go to Home
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-background rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Success</h1>
            <p>{message}</p>
            <Button className="mt-4" onClick={() => navigate('/')}>
                Go to Home
            </Button>
        </div>
    );
};

export default Success;
