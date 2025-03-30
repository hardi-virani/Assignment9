import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Typography,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent
} from "@mui/material";

function CompanyShowcase() {
    const [companyImages, setCompanyImages] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        // fetch images on component mount
        axios
            .get("http://localhost:8080/company-images")
            .then((res) => {
                setCompanyImages(res.data);
            })
            .catch((err) => {
                console.error("Error fetching images:", err);
                setError("Could not load company images.");
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
        </Container>
    );
}

export default CompanyShowcase;