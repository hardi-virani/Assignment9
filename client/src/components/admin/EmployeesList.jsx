// src/components/admin/EmployeesList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/slices/userSlice';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Alert
} from '@mui/material';

const EmployeesList = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        console.log('EmployeesList component mounted, fetching users');
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <Container style={{ marginTop: '2rem' }}>
            <Typography variant="h4" gutterBottom>
                Users List
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <CircularProgress />
                </div>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Full Name</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Type</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.length > 0 ? (
                                users.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.fullName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.type}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} align="center">
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default EmployeesList;