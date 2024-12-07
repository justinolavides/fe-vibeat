import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Link } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from './services/api';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.post('/reset-password', { token, password, password_confirmation: passwordConfirmation });
            setMessage('Password has been reset successfully.');
            setError('');
            navigate('/login');
        } catch (error) {
            setError('Failed to reset password. Please try again.');
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
                        padding: '30px',
                        borderRadius: '15px',
                        background: 'linear-gradient(to right, #8e2de2, #4a00e0)', // Gradient background
                        color: '#FFFFFF',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Reset Password
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="New Password"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            sx={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '5px',
                                marginBottom: '15px',
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            fullWidth
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                                backgroundColor: 'rgb(21, 101, 192)', // Matched color
                                color: '#FFF',
                                '&:hover': { backgroundColor: 'rgb(45, 128, 216)' },
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

export default ResetPassword;
