import React from "react";
import { Typography, Container } from "@mui/material";

function About() {
    return (
        <Container style={{ marginTop: "2rem" }}>
            <Typography variant="h4" gutterBottom>About Us</Typography>
            <Typography variant="body1">
                We are committed to connecting top talent with leading organizations.
                Our platform helps you find the right role and company culture.
            </Typography>
        </Container>
    );
}

export default About;