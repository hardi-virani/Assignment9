import React from "react";
import jobPosts from "../data/jobPosts";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Container,
    Grid,
    Chip
} from "@mui/material";

function JobListings() {
    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    };

    return (
        <Container style={{ marginTop: "2rem" }}>
            <Typography variant="h4" gutterBottom>
                Current Job Openings
            </Typography>

            <Grid container spacing={2}>
                {jobPosts.map((job) => (
                    <Grid item xs={12} md={6} lg={4} key={job.id}>
                        <Card style={{ marginBottom: "1rem" }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    {job.title}
                                </Typography>

                                {/* Required Skills */}
                                <Typography variant="subtitle1" gutterBottom>
                                    Required Skills:
                                </Typography>
                                <div style={{ marginBottom: "0.5rem" }}>
                                    {job.requiredSkills.map((skill, index) => (
                                        <Chip
                                            key={index}
                                            label={skill}
                                            style={{ marginRight: "0.4rem", marginBottom: "0.4rem" }}
                                        />
                                    ))}
                                </div>

                                {/* Salary */}
                                <Typography variant="body1" gutterBottom>
                                    <strong>Salary:</strong> {job.salary}
                                </Typography>

                                {/* Description */}
                                <Typography variant="body2" color="text.secondary">
                                    {/* {job.description} */}
                                    {truncateText(job.description, 150)}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    display="block"
                                    style={{ marginTop: "0.5rem" }}
                                >
                                    {job.lastUpdated}
                                </Typography>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    href={job.applyLink}
                                    target="_blank"
                                    style={{ marginTop: "0.75rem" }}
                                >
                                    Apply
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default JobListings;