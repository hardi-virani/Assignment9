// Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Job Portal
                </Typography>

                {/* Common navigation links for all users */}
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/about">
                    About
                </Button>
                <Button color="inherit" component={Link} to="/contact">
                    Contact
                </Button>
                <Button color="inherit" component={Link} to="/companies">
                    Companies
                </Button>

                {/* Conditional navigation based on authentication and user role */}
                {user ? (
                    <>
                        {/* Admin-specific links */}
                        {user.type === 'admin' && (
                            <Box display="flex">
                                <Button color="inherit" component={Link} to="/admin/employees">
                                    Employees
                                </Button>
                                <Button color="inherit" component={Link} to="/admin/add-job">
                                    Add Job
                                </Button>
                            </Box>
                        )}

                        {/* Employee-specific links */}
                        {user.type === 'employee' && (
                            <Button color="inherit" component={Link} to="/jobs">
                                Jobs
                            </Button>
                        )}

                        {/* Logout button */}
                        <Button color="inherit" onClick={handleLogout}>
                            Logout ({user.fullName})
                        </Button>
                    </>
                ) : (
                    <>
                        {/* Authentication links for non-logged-in users */}
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;