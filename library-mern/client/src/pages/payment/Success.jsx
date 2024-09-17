// src/pages/Success.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import axios from 'axios';

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [message, setMessage] = useState('Processing your payment...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const sessionId = query.get('session_id');

        if (sessionId) {
            // Call backend to confirm payment and update database
            const confirmPayment = async () => {
                try {
                    const token = localStorage.getItem('authToken'); // Replace with your auth token retrieval method
                    const response = await axios.post('http://localhost:3000/api/payment/confirm-payment', {
                        sessionId,
                    }, {
                        headers: {
                            Authorization: token ? `Bearer ${token}` : '',
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.data.success) {
                        setMessage('Payment successful! Thank you for your purchase.');
                    } else {
                        setError('Payment confirmation failed. Please contact support.');
                    }
                } catch (err) {
                    console.error('Error confirming payment:', err);
                    setError('An error occurred while confirming your payment.');
                }
            };

            confirmPayment();
        } else {
            setError('No session ID found.');
        }
    }, [location]);

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
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
