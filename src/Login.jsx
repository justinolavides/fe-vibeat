import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Checkbox, FormControlLabel, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from './services/api'; // Import the centralized Axios instance

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/login', { email, password });

            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
                navigate('/users');  // Redirect after login
            }
        } catch (error) {
            setError('Invalid login credentials');
        }
    };

    return (
        <div
            style={{
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
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.7)', 
                    zIndex: 1
                }}
            />
            <Container maxWidth="lg" style={{ zIndex: 2, textAlign: 'center', marginTop: '30px' }}>
                <Typography 
                    variant="h3" 
                    component="h1" 
                    style={{ 
                        fontWeight: 'bold', 
                        fontStyle: 'italic', 
                        fontFamily: 'Cursive, Arial',
                        textShadow: '2px 2px 4px rgba(0, 0, 1, 0.5)', 
                        color: '#FFFFFF',
                        marginBottom: '40px'
                    }}
                >
                    ViBeat-Music
                </Typography>
                <Box style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box style={{ flex: 1, color: '#FFFFFF', padding: '20px', textAlign: 'left' }}>
                        <Typography 
                            variant="h5" 
                            style={{ 
                                fontWeight: 'bold', 
                                fontStyle: 'italic', 
                                fontFamily: 'Cursive, Arial',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' 
                            }}
                        >
                            Welcome to ViBeat-Music
                        </Typography>
                        <Typography 
                            variant="body1" 
                            style={{ 
                                marginTop: '20px', 
                                fontFamily: 'Arial, sans-sef',
                                color: '#FFFFFF'
                            }}
                        >
                            Your ultimate destination for music discovery and connection. Dive into diverse genres, create personalized playlists, and join a vibrant community of music lovers and artists. Whether you're here to listen, share, or perform, ViBeat-Music is your gateway to a world where every beat resonates. 🎶
                        </Typography>
                    </Box>
                    <Paper 
                        elevation={5} 
                        style={{ 
                            flex: '100px',
                            padding: '50px', 
                            background: '#FFFFFF', 
                            borderRadius: '15px',
                            color: '#333',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: 'linear-gradient(to right, #8e2de2, #4a00e0)', // Purple to blue gradient
                            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.2)' // Soft shadow for depth
                        }}
                    >
                        <Typography variant="h4" component="h2" gutterBottom style={{ color: '#8e#FFFFF2de2', fontWeight: 'bold' }}>
                            User Login
                        </Typography>
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                            <TextField
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                margin="normal"
                                variant="outlined"
                                style={{ 
                                    backgroundColor: '#F5F5F5', 
                                    borderRadius: '5px',
                                    marginBottom: '15px', 
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Light shadow for inputs
                                }}
                            />
                            <TextField
                                label="Password"
                                fullWidth
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                margin="normal"
                                variant="outlined"
                                style={{ 
                                    backgroundColor: '#F5F5F5', 
                                    borderRadius: '5px',
                                    marginBottom: '15px', 
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Light shadow for inputs
                                }}
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" />}
                                label="Remember me"
                                style={{ color: '#333' }}
                            />
                            <Button 
                                variant="contained" 
                                type="submit" 
                                fullWidth 
                                style={{ 
                                    marginTop: '20px', 
                                    padding: '10px 0', 
                                    fontWeight: 'bold',
                                    backgroundColor: '#8e2de2',
                                    color: '#FFFFFF'
                                }}
                            >
                                Login
                            </Button>
                            {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
                            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                <Link component="button" variant="body2" style={{ color: 'white' }} onClick={() => navigate('/register')}>
                                    Don't have an account? Register
                                </Link>
                                <Link component="button" variant="body2" style={{ color: 'white' }} onClick={() => navigate('/reset-password')}>
                                    Forgot Password?
                                </Link>
                            </div>
                        </form>
                    </Paper>
                </Box>
            </Container>
        </div>
    );
};

export default Login;
