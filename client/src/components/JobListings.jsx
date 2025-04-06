// src/components/JobListings.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../store/slices/jobSlice';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Container,
    Grid,
    Chip,
    CircularProgress,
    Alert,
    Pagination,
    Box
} from "@mui/material";

function JobListings() {
    const dispatch = useDispatch();
    const { jobs, loading, error } = useSelector((state) => state.jobs);
    const [fetchAttempted, setFetchAttempted] = useState(false);

    // State for pagination
    const [page, setPage] = useState(1);
    const jobsPerPage = 6;

    useEffect(() => {
        console.log('JobListings component mounted');

        // Function to fetch jobs
        const loadJobs = async () => {
            console.log('Attempting to fetch jobs...');
            try {
                setFetchAttempted(true);
                await dispatch(fetchJobs()).unwrap();
                console.log('Jobs fetched successfully');
            } catch (err) {
                console.error('Error fetching jobs in component:', err);
            }
        };

        loadJobs();
    }, [dispatch]);

    // Log when jobs data changes
    useEffect(() => {
        console.log('Jobs data in component:', jobs);
    }, [jobs]);

    // Handle page change
    const handlePageChange = (event, value) => {
        setPage(value);
        // Scroll to top on page change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Calculate pagination
    const indexOfLastJob = page * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs ? jobs.slice(indexOfFirstJob, indexOfLastJob) : [];
    const totalPages = jobs ? Math.ceil(jobs.length / jobsPerPage) : 0;

    // Helper function to truncate text
    const truncateText = (text, maxLength = 150) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    // Handle retry button click
    const handleRetry = () => {
        dispatch(fetchJobs());
    };

    return (
        <Container style={{ marginTop: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                Current Job Openings
            </Typography>

            {error && (
                <Alert
                    severity="error"
                    style={{ marginBottom: '1rem' }}
                    action={
                        <Button color="inherit" size="small" onClick={handleRetry}>
                            Retry
                        </Button>
                    }
                >
                    {error}
                </Alert>
            )}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {fetchAttempted && jobs && jobs.length === 0 ? (
                        <Alert severity="info" style={{ marginBottom: '1rem' }}>
                            No job listings found. Check back later for new opportunities.
                        </Alert>
                    ) : (
                        <Grid container spacing={2}>
                            {currentJobs.map((job) => (
                                <Grid item xs={12} md={6} lg={4} key={job._id}>
                                    <Card style={{ marginBottom: "1rem", height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <CardContent style={{ flexGrow: 1 }}>
                                            <Typography variant="h5" gutterBottom>
                                                {job.jobTitle}
                                            </Typography>

                                            <Typography variant="subtitle1" gutterBottom>
                                                <strong>Company:</strong> {job.companyName}
                                            </Typography>

                                            <Typography variant="body1" gutterBottom>
                                                <strong>Salary:</strong> {job.salary}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                style={{ marginTop: '1rem', marginBottom: '1rem' }}
                                            >
                                                {truncateText(job.description, 150)}
                                            </Typography>

                                            <Typography
                                                variant="caption"
                                                display="block"
                                                style={{ marginTop: "0.5rem" }}
                                            >
                                                Posted: {new Date(job.createdAt).toLocaleDateString()}
                                            </Typography>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{ marginTop: "0.75rem" }}
                                            >
                                                Apply
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}

                    {/* Pagination - only show if we have jobs and more than one page */}
                    {jobs && jobs.length > 0 && totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                color="primary"
                                onChange={handlePageChange}
                            />
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
}

export default JobListings;