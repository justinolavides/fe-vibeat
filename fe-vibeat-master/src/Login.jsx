import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Paper, Checkbox, FormControlLabel, Link, Box, AppBar, Toolbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import api from './services/api'; // Import the centralized Axios instance

const Home = () => {
    const location = useLocation();
    const [showLogin, setShowLogin] = useState(false); // State to control login form visibility
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.showLogin) {
            setShowLogin(true);
        }
    }, [location.state]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors
        try {
            const response = await api.post('/login', { email, password });

            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
                navigate('/admin');  // Redirect after successful login
            } else {
                setError('Invalid login credentials'); // Show error if no token returned
            }
        } catch (error) {
            setError('An error occurred during login');
        }
    };

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleHomeClick = () => {
        setShowLogin(false);
    };

    return (
        <>
            <AppBar position="static" style={{ backgroundColor: 'rgba(50, 0, 0, 0.3)' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
                        <span style={{ color: '#FFFFFF', fontWeight: 'bold', textShadow: '4px 2px', fontSize: '50px' }}>VIB</span>
                        <span style={{ color: '#000000', fontWeight: 'bold', textShadow: '4px 2px', fontSize: '50px' }}>EAT</span>
                    </Typography>
                    <Button color="inherit" onClick={handleHomeClick}>Home</Button>
                    <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>
                    <Button color="inherit" onClick={handleLoginClick}>Login</Button>
                </Toolbar>
            </AppBar>

            <div
                style={{
                    height: 'calc(100vh - 64px)', // Adjust height to account for AppBar
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',  // Changed to space-between to push content apart
                    backgroundImage: 'url(/back.png)', 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    padding: '0 50px',  // Adjust padding for spacing
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(21, 1, 1, 0.39)', 
                        zIndex: 1
                    }}
                />
                
                {!showLogin && (
                    <Container maxWidth="sm" style={{ zIndex: 2 }}>
                        <Typography variant="h3" component="h1" gutterBottom style={{ textAlign: 'center', fontFamily: 'Times New Roman, Times, serif' }}>
                            <span style={{ color: '#FFFFFF', fontWeight: 'bold', textShadow: '4px 2px', fontSize: '50px' }}>VIB</span>
                            <span style={{ color: '#000000', fontWeight: 'bold', textShadow: '4px 2px', fontSize: '50px' }}>EAT</span>
                        </Typography>
                        <Box textAlign="left" mb={2} ml={1}>
                            <Typography variant="h6" component="p" style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'left', fontFamily: 'Times New Roman, Times, serif' }}>
                                Welcome to ViBeat, your go-to platform for seamless music management and user interaction.
                            </Typography>
                        </Box>
                    </Container>
                )}

                {showLogin && (
                    <Container maxWidth="sm" style={{ zIndex: 2 }}>
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

                {!showLogin && (
                    <img
                        src="/HomeLogo.png" 
                        alt="Home Logo"
                        style={{
                            zIndex: 2,
                            maxWidth: '500px',
                            marginLeft: '20px',
                            height: '500px',
                            borderRadius: '10px'
                        }}
                    />
                )}
            </div>

            {!showLogin && (
                <div id="about-section" style={{ padding: '50px', color: '#FFFFFF', backgroundColor: '#333', marginTop: '20px' }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="body1">
                        ViBeat is your ultimate destination for music management and user interaction. Our platform provides artists and fans with the tools they need to manage their music, connect with each other, and enjoy a seamless musical experience.
                    </Typography>
                </div>
            )}
        </>
    );
};

export default Home;
