import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, AppBar, Toolbar, Button, TextField, Paper, FormControlLabel, Checkbox, Link, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from './services/api'; // Import the centralized Axios instance

const Contact = () => {
    const [showLogin, setShowLogin] = useState(false); // State to control login form visibility
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const loginRef = useRef(null);

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

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    useEffect(() => {
        if (showLogin && loginRef.current) {
            console.log('Scrolling to login form');
            loginRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showLogin]);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        ViBeat
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                    <Button color="inherit" onClick={() => navigate('/about')}>About</Button>
                    <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>
                    <Button color="inherit" onClick={handleLoginClick}>Login</Button>
                </Toolbar>
            </AppBar>

            <Container style={{ padding: '50px', color: '#FFFFFF', backgroundColor: '#444', marginTop: '20px' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="body1">
                    Address: 27 13 Lowe Haven, Tel: 111 343 43 43, Email: business@info.com
                </Typography>
            </Container>

            {showLogin && (
                <Container maxWidth="sm" style={{ zIndex: 2, marginTop: '20px' }} ref={loginRef}>
                    <Paper 
                        elevation={5} 
                        style={{ 
                            padding: '30px', 
                            background: 'linear-gradient(to right, #8e2de2, #4a00e0)', 
                            borderRadius: '5px',
                            color: '#FFFFFF',
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
                                    boxShadow: '0 30px 5px rgba(0,0,0,0.2)' 
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
                                    boxShadow: '0 30px 5px rgba(0,0,0,0.2)' 
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
                                <Link component="button" variant="body2" style={{ color: '#FFFFFF' }} onClick={() => navigate('/forgot-password')}>
                                    Forgot Password?
                                </Link>
                            </div>
                        </form>
                    </Paper>
                </Container>
            )}
        </>
    );
};

export default Contact;
