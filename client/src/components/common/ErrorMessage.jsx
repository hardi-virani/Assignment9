// src/components/common/ErrorMessage.jsx
import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

/**
 * Generic error message component
 * @param {Object} props - Component props
 * @param {string} props.message - The error message to display
 * @param {string} props.severity - The severity level ('error', 'warning', 'info', 'success')
 * @param {boolean} props.showTitle - Whether to show a title
 * @param {string} props.title - The title text
 * @param {Object} props.sx - Additional styles
 */
const ErrorMessage = ({
    message,
    severity = 'error',
    showTitle = false,
    title = 'Error',
    sx = {}
}) => {
    if (!message) return null;

    return (
        <Alert
            severity={severity}
            sx={{ marginY: 2, ...sx }}
        >
            {showTitle && <AlertTitle>{title}</AlertTitle>}
            {message}
        </Alert>
    );
};

export default ErrorMessage;