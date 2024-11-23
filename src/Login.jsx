import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Checkbox, FormControlLabel, Link } from '@mui/material';
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
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.7)', 
                    zIndex: 1
                }}
            />
            <Container maxWidth="sm" style={{ zIndex: 2 }}>
                <Paper 
                    elevation={5} 
                    style={{ 
                        padding: '30px', 
                        background: 'linear-gradient(to right, #8e2de2, #4a00e0)', 
                        borderRadius: '15px',
                        color: '#FFFFFF'
                    }}
                >
                    <Typography variant="h4" component="h1" gutterBottom style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' }}>
                        Login
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            variant="outlined"
                            style={{ 
                                backgroundColor: '#FFFFFF', 
                                borderRadius: '5px',
                                marginBottom: '15px', 
                                boxShadow: '0 3px 5px rgba(0,0,0,0.2)' 
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
                                backgroundColor: '#FFFFFF', 
                                borderRadius: '5px',
                                marginBottom: '15px', 
                                boxShadow: '0 3px 5px rgba(0,0,0,0.2)' 
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox color="primary" />}
                            label="Remember me"
                            style={{ marginTop: '15px', color: '#FFFFFF' }}
                        />
                        <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '20px', padding: '10px 0', fontWeight: 'bold' }}>
                            Login
                        </Button>
                        {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
                        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
                            <Link component="button" variant="body2" style={{ color: '#FFFFFF' }} onClick={() => navigate('/register')}>
                                Don't have an account? Register
                            </Link>
                            <Link component="button" variant="body2" style={{ color: '#FFFFFF' }} onClick={() => navigate('/reset-password')}>
                                Forgot Password?
                            </Link>
                        </div>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default Login;
