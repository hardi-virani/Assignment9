import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createUser, clearUserError } from '../store/slices/userSlice';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress,
    Alert,
    Paper,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    FormHelperText
} from "@mui/material";

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: 'employee' // Default to employee
    });

    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.auth);

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            if (user.type === 'admin') {
                navigate('/admin/employees');
            } else {
                navigate('/jobs');
            }
        }
    }, [user, navigate]);

    // Clear error on component unmount
    useEffect(() => {
        return () => {
            dispatch(clearUserError());
        };
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear field-specific error when user types
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const errors = {};

        // Validate full name
        if (!formData.fullName.trim()) {
            errors.fullName = 'Full name is required';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
            errors.fullName = 'Full name must contain only alphabetic characters and spaces';
        }

        // Validate email
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
        }

        // Validate password
        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters long';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)) {
            errors.password = 'Password must include uppercase, lowercase, number, and special character';
        }

        // Validate password confirmation
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    // In Register.jsx - update the handleSubmit function
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Remove confirmPassword from payload
        const { confirmPassword, ...userData } = formData;

        // Add console logs to debug
        console.log('Submitting registration with data:', userData);
        console.log('User type selected:', userData.type);

        // Dispatch action to create user
        dispatch(createUser(userData))
            .unwrap()
            .then((result) => {
                console.log('Registration successful:', result);
                // On success, navigate to login
                navigate('/login');
            })
            .catch((error) => {
                console.error('Registration error:', error);
                // Error is handled by the reducer and shown from the state
            });
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "3rem", marginBottom: "3rem" }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>

                {error && <Alert severity="error" style={{ marginBottom: '1rem' }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Full Name"
                        fullWidth
                        margin="normal"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        error={!!formErrors.fullName}
                        helperText={formErrors.fullName}
                        disabled={loading}
                    />

                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                        disabled={loading}
                    />

                    <TextField
                        label="Password"
                        fullWidth
                        margin="normal"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                        disabled={loading}
                    />

                    <TextField
                        label="Confirm Password"
                        fullWidth
                        margin="normal"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!formErrors.confirmPassword}
                        helperText={formErrors.confirmPassword}
                        disabled={loading}
                    />

                    <FormControl fullWidth margin="normal" error={!!formErrors.type}>
                        <InputLabel id="user-type-label">User Type</InputLabel>
                        <Select
                            labelId="user-type-label"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            label="User Type"
                            disabled={loading}
                        >
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="employee">Employee</MenuItem>
                        </Select>
                        {formErrors.type && <FormHelperText>{formErrors.type}</FormHelperText>}
                    </FormControl>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        style={{ marginTop: "1.5rem" }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Register"}
                    </Button>

                    <Box mt={2} textAlign="center">
                        <Typography variant="body2">
                            Already have an account?{' '}
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                Login
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}

export default Register;