import React from "react";
import { Typography, Container } from "@mui/material";

function Contact() {
    return (
        <Container style={{ marginTop: "2rem" }}>
            <Typography variant="h4" gutterBottom>Contact Us</Typography>
            <Typography variant="body1">
                For inquiries, reach out at <strong>contact@jobportal.com</strong>.
            </Typography>
        </Container>
    );
}

export default Contact;