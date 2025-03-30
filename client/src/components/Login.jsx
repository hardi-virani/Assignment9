import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box
} from "@mui/material";

function Login() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            /* const response = await axios.post("http://localhost:3001/user/login", {
                email,
                password,
                }); */

            // We call our new endpoint in Node
            const response = await axios.post("http://localhost:8080/user/login", {
                email,
                password
            });

            if (response.data.success) {
                // Store session info in localStorage
                localStorage.setItem("loggedIn", "true");
                // Navigate to the home page or wherever
                navigate("/");
            } else {
                setError("Invalid credentials");
            }
        } catch (err) {
            setError("Login failed. Please check your credentials.");
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "3rem" }}>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <TextField
                    label="Password"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && (
                    <Typography variant="body2" color="error" style={{ marginTop: "1rem" }}>
                        {error}
                    </Typography>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: "1rem" }}
                    fullWidth
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
}

export default Login;