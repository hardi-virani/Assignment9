// Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../store/slices/authSlice';
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    CircularProgress,
    Paper,
    Alert
} from "@mui/material";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { user, loading, error } = useSelector((state) => state.auth);

    // Get the "from" location if user was redirected here
    const from = location.state?.from?.pathname || "/";

    // Redirect based on user type
    useEffect(() => {
        if (user) {
            console.log('User logged in:', user);
            console.log('User type:', user.type);

            if (user.type === 'admin') {
                console.log('Redirecting admin to admin dashboard');
                navigate('/admin/employees');
            } else if (user.type === 'employee') {
                console.log('Redirecting employee to jobs page');
                navigate('/jobs');
            } else {
                // Fallback for any other role (shouldn't normally happen)
                console.log('Unknown user type, redirecting to home');
                navigate('/');
            }
        }
    }, [user, navigate]);

    // Clear error on component unmount
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login form submitted with:', { email, password });
        dispatch(login({ email, password }));
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "3rem" }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h4" gutterBottom>
                    Login
                </Typography>

                {error && (
                    <Alert severity="error" style={{ marginBottom: '1rem' }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />

                    <TextField
                        label="Password"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ marginTop: "1rem" }}
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Login"}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Login;