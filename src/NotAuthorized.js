import React from 'react';
import { Typography, Container } from '@mui/material';

const NotAuthorized = () => (
    <Container>
        <Typography variant="h4" component="h1" gutterBottom>
            Access Denied
        </Typography>
        <Typography variant="body1">
            You do not have the necessary permissions to view this page.
        </Typography>
    </Container>
);

export default NotAuthorized;
