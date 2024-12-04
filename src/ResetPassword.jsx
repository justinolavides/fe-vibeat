import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from './services/api'; // Import the centralized Axios instance

const ResetPassword = () => {
    const { token } = useParams(); // Get token from URL
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/reset-password', { token, email, password, password_confirmation: passwordConfirmation });
            setMessage('Password has been reset successfully.');
            setError('');
            navigate('/login'); // Redirect to login page
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
                backgroundImage: 'url(/back.png)', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            }}
        >
            <Box 
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.7)',
                    zIndex: 1
                }}
            />
            <Container maxWidth="sm" sx={{ zIndex: 2 }}>
                <Paper 
                    elevation={5} 
                    sx={{ 
                        padding: '30px', 
                        background: 'linear-gradient(to right, #8e2de2, #4a00e0)', 
                        borderRadius: '15px',
                        color: '#FFFFFF'
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' }}>
                        Reset Password
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
                                boxShadow: '0 3px 5px rgba(0,0,0,0.2)' 
                            }}
                        />
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
                                boxShadow: '0 3px 5px rgba(0,0,0,0.2)' 
                            }}
                        />
                        <TextField
                            label="Confirm New Password"
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
                                boxShadow: '0 3px 5px rgba(0,0,0,0.2)' 
                            }}
                        />
                        <Button 
                            type="submit" 
                            fullWidth 
                            variant="contained" 
                            color="primary" 
                            sx={{ padding: '10px 0', marginTop: '20px', borderRadius: '5px' }}
                        >
                            Reset Password
                        </Button>
                    </form>
                    {message && <Typography variant="body1" sx={{ color: 'green', marginTop: '10px' }}>{message}</Typography>}
                    {error && <Typography variant="body1" sx={{ color: 'red', marginTop: '10px' }}>{error}</Typography>}
                </Paper>
            </Container>
        </Box>
    );
};

export default ResetPassword;
