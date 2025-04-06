// src/components/admin/AddJob.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJob, clearJobError, clearJobSuccess } from '../../store/slices/jobSlice';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    CircularProgress,
    Alert,
    Paper,
    Snackbar
} from '@mui/material';

const AddJob = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        jobTitle: '',
        description: '',
        salary: ''
    });
    const [formError, setFormError] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.jobs);
    const { user } = useSelector((state) => state.auth);

    // Effect for handling success state
    useEffect(() => {
        if (success) {
            setSuccessMessage('Job created successfully!');
            setShowSuccess(true);
            // Clear form
            setFormData({
                companyName: '',
                jobTitle: '',
                description: '',
                salary: ''
            });
            // Clear success flag after showing message
            setTimeout(() => {
                dispatch(clearJobSuccess());
            }, 3000);
        }
    }, [success, dispatch]);

    // Clear errors when component unmounts
    useEffect(() => {
        return () => {
            dispatch(clearJobError());
            dispatch(clearJobSuccess());
        };
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear field-specific error when user types
        if (formError[name]) {
            setFormError({
                ...formError,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.companyName.trim()) {
            errors.companyName = 'Company name is required';
        }

        if (!formData.jobTitle.trim()) {
            errors.jobTitle = 'Job title is required';
        }

        if (!formData.description.trim()) {
            errors.description = 'Description is required';
        }

        if (!formData.salary.trim()) {
            errors.salary = 'Salary is required';
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate user is admin
        if (!user || user.type !== 'admin') {
            setFormError({ general: 'You must be an admin to create jobs' });
            return;
        }

        // Log the form data
        console.log('Job form submitted with data:', formData);

        // Validate form
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            return;
        }

        // Log just before dispatching the action
        console.log('Dispatching createJob action with:', formData);

        // Dispatch action to create job
        dispatch(createJob(formData));
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h4" gutterBottom>
                    Add New Job
                </Typography>

                {error && (
                    <Alert severity="error" style={{ marginBottom: '1rem' }}>
                        {error}
                    </Alert>
                )}

                {formError.general && (
                    <Alert severity="error" style={{ marginBottom: '1rem' }}>
                        {formError.general}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Company Name"
                        fullWidth
                        margin="normal"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        error={!!formError.companyName}
                        helperText={formError.companyName}
                        disabled={loading}
                    />

                    <TextField
                        label="Job Title"
                        fullWidth
                        margin="normal"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        error={!!formError.jobTitle}
                        helperText={formError.jobTitle}
                        disabled={loading}
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        error={!!formError.description}
                        helperText={formError.description}
                        disabled={loading}
                    />

                    <TextField
                        label="Salary"
                        fullWidth
                        margin="normal"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        error={!!formError.salary}
                        helperText={formError.salary}
                        disabled={loading}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        style={{ marginTop: '1.5rem' }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Add Job'}
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={showSuccess}
                autoHideDuration={6000}
                onClose={handleCloseSuccess}
                message={successMessage}
            />
        </Container>
    );
};

export default AddJob;