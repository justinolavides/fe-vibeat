import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/forgot-password', { email });
            if (response.status === 200) {
                navigate('/reset-password');
            } else {
                setError(response.data.message);
                setMessage('');
            }
        } catch (error) {
            setError('Failed to send password reset email. Please try again.');
            setMessage('');
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url(/path-to-your-background-image)', // Add your background image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.5)', // Slightly darken the background
                    zIndex: 1,
                }}
            />
            <Container maxWidth="sm" sx={{ zIndex: 2 }}>
                <Paper
                    elevation={5}
                    sx={{
                        padding: '50px',
                        borderRadius: '5px',
                        background: 'linear-gradient(to right,rgb(15, 15, 16),rgb(208, 204, 218))', // Gradient background
                        color: '#FFFFFF',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Forgot Password
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email Address"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            sx={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '5px',
                                marginBottom: '15px',
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                padding: '10px 0',
                                backgroundColor: '#1976D2', // Matched color
                                color: '#FFF',
                                '&:hover': { backgroundColor: '#1565C0' },
                                marginTop: '15px',
                            }}
                        >
                            Confirm
                        </Button>
                        {message && (
                            <Typography variant="body2" sx={{ color: 'green', marginTop: '10px' }}>
                                {message}
                            </Typography>
                        )}
                        {error && (
                            <Typography variant="body2" sx={{ color: 'red', marginTop: '10px' }}>
                                {error}
                            </Typography>
                        )}
                    </form>
                    <Box mt={2}>
                        <Link
                            component="button"
                            variant="body2"
                            onClick={() => navigate('/login')}
                            sx={{ color: '#FFFFFF', textDecoration: 'underline' }}
                        >
                            Back to Login
                        </Link>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default ForgotPassword;
