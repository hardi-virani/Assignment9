import React from "react";
import { Typography, Container } from "@mui/material";

function Home() {
    return (
        <Container style={{ marginTop: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                Welcome to Our Job Portal
            </Typography>
            <Typography variant="body1">
                Discover top career opportunities and explore our featured companies.
            </Typography>
        </Container>
    );
}

export default Home;