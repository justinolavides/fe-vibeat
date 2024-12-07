<<<<<<< HEAD
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from './services/api'; // Import the centralized Axios instance

const ResetPassword = () => {
    const { token } = useParams(); // Get token from URL
    const [email, setEmail] = useState('');
=======
//Resetpassword
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Box, Link } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from './services/api';

const ResetPassword = () => {
    const { token } = useParams();
>>>>>>> ResetPassword
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
<<<<<<< HEAD
            const response = await api.post('/reset-password', { token, email, password, password_confirmation: passwordConfirmation });
            setMessage('Password has been reset successfully.');
            setError('');
            navigate('/login'); // Redirect to login page
=======
            await api.post('/reset-password', { token, password, password_confirmation: passwordConfirmation });
            setMessage('Password has been reset successfully.');
            setError('');
            navigate('/login');
>>>>>>> ResetPassword
        } catch (error) {
            setError('Failed to reset password. Please try again.');
            setMessage('');
        }
    };

    return (
<<<<<<< HEAD
        <Box 
=======
        <Box
>>>>>>> ResetPassword
            sx={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
<<<<<<< HEAD
                backgroundImage: 'url(/back.png)', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
            }}
        >
            <Box 
=======
                backgroundImage: 'url(/path-to-your-background-image)', // Add your background image path
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
            }}
        >
            <Box
>>>>>>> ResetPassword
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
<<<<<<< HEAD
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
=======
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
>>>>>>> ResetPassword
                        Reset Password
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
<<<<<<< HEAD
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
=======
>>>>>>> ResetPassword
                            label="New Password"
                            fullWidth
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            variant="outlined"
<<<<<<< HEAD
                            sx={{ 
                                backgroundColor: '#FFFFFF', 
                                borderRadius: '5px',
                                marginBottom: '15px', 
                                boxShadow: '0 3px 5px rgba(0,0,0,0.2)' 
                            }}
                        />
                        <TextField
                            label="Confirm New Password"
=======
                            sx={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '5px',
                                marginBottom: '15px',
                            }}
                        />
                        <TextField
                            label="Confirm Password"
>>>>>>> ResetPassword
                            fullWidth
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            margin="normal"
                            variant="outlined"
<<<<<<< HEAD
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
=======
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
>>>>>>> ResetPassword
                </Paper>
            </Container>
        </Box>
    );
};

export default ResetPassword;
