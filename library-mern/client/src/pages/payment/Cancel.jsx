// src/pages/Cancel.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Cancel = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-md mx-auto p-6 bg-background rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Payment Canceled</h1>
            <p>Your payment was canceled. You can try again or continue browsing our books.</p>
            <Button className="mt-4" onClick={() => navigate('/')}>
                Go to Home
            </Button>
        </div>
    );
};

export default Cancel;
