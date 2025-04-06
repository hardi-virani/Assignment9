// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { user } = useSelector((state) => state.auth);


    // console.log('PrivateRoute - Current user:', user);

    // Check if user is logged in
    if (!user) {
        console.log('PrivateRoute - No user found, redirecting to login');
        // Not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    console.log('PrivateRoute - User is authenticated, rendering protected content');
    // User is logged in, render the child routes
    return <Outlet />;
};

export default PrivateRoute;