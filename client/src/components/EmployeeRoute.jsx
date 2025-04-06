// EmployeeRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EmployeeRoute = () => {
    const { user } = useSelector((state) => state.auth);
    console.log('EmployeeRoute check - Current user:', user);

    // If no user is logged in, redirect to login
    if (!user) {
        console.log('No user logged in, redirecting to login');
        return <Navigate to="/login" replace />;
    }

    // If user is not an employee, redirect to home page
    if (user.type !== 'employee') {
        console.log('User is not employee, redirecting to home');
        return <Navigate to="/" replace />;
    }

    // User is an employee, allow access to employee routes
    console.log('User is employee, allowing access to employee routes');
    return <Outlet />;
};

export default EmployeeRoute;