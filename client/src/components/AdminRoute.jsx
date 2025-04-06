// AdminRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    useEffect(() => {
        console.log('AdminRoute check at path:', location.pathname);
        console.log('Current user:', user);
        console.log('Is user an admin?', user?.type === 'admin');
    }, [user, location.pathname]);

    // If no user is logged in, redirect to login
    if (!user) {
        console.log('No user logged in, redirecting to login');
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // If user is not an admin, redirect to home page
    if (user.type !== 'admin') {
        console.log('User is not admin, redirecting to home');
        return <Navigate to="/" replace />;
    }

    // User is an admin, allow access to admin routes
    console.log('User is admin, allowing access to admin routes');
    return <Outlet />;
};

export default AdminRoute;