// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (authToken) {
            try {
                const decoded = jwtDecode(authToken);
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setIsAuthenticated(true);
                }
            } catch (error) {
                logout();
            }
        } else {
            setIsAuthenticated(false);
        }
    }, [authToken]);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuthToken(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
