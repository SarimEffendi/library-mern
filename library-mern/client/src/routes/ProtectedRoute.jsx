import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    console.log('Checking authentication:', !!token);
    return !!token;
};

const getUserRoles = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken);
            console.log('Roles in Token:', decodedToken.role);
            return decodedToken.role || [];
        } catch (error) {
            console.error('Failed to decode token:', error);
            return [];
        }
    }
    return [];
};

const ProtectedRoute = ({ element: Component, roles = [], ...rest }) => {
    const isUserAuthenticated = isAuthenticated();
    const userRoles = getUserRoles();

    console.log('ProtectedRoute props:', { element: Component, roles, ...rest });
    console.log('User authenticated:', isUserAuthenticated);
    console.log('Required roles:', roles);
    console.log('User roles:', userRoles);

    if (!isUserAuthenticated) {
        return <Navigate to="/signin" />;
    }

    if (roles.length > 0 && !roles.some(role => userRoles.includes(role))) {
        return <Navigate to="/unauthorized" />;
    }

    return <Component {...rest} />;
};

export default ProtectedRoute;
