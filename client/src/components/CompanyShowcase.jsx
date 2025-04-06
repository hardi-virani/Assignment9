// src/components/CompanyShowcase.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Typography,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CircularProgress
} from "@mui/material";
import { API_ENDPOINTS } from "../config/apiConfig";

function CompanyShowcase() {
    const [companyImages, setCompanyImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // fetch images on component mount
        setLoading(true);
        axios
            .get(API_ENDPOINTS.GET_COMPANY_IMAGES)
            .then((res) => {
                setCompanyImages(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching images:", err);
                setError("Could not load company images.");
                setLoading(false);
            });
    }, []);

    return (
        <Container style={{ marginTop: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                Company Showcase
            </Typography>

            {error && (
                <Typography variant="body1" color="error" paragraph>
                    {error}
                </Typography>
            )}

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
                    <CircularProgress />
                </div>
            ) : (
                <Grid container spacing={2}>
                    {companyImages.map((company, idx) => (
                        <Grid item xs={12} md={4} key={idx}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={company.url}
                                    alt={company.name}
                                />
                                <CardContent>
                                    <Typography variant="h6">{company.name}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
}

export default CompanyShowcase;