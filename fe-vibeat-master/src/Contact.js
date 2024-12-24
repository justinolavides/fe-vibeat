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
                navigate('/admin');  // Redirect after login
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
            loginRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showLogin]);

    return (
        <>
            <AppBar position="static" style={{ background: '#1c1c1e' }}>
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

            <Container style={{ padding: '50px', color: '#FFFFFF', backgroundColor: '#2c2c2e', marginTop: '20px', borderRadius: '8px' }}>
                <Typography variant="h4" component="h2" gutterBottom style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Contact Us
                </Typography>
                <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    We're here to assist you! Reach out to us via the following methods:
                </Typography>

                {/* Contact List */}
                <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h6" component="h3" gutterBottom style={{ fontWeight: 'bold' }}>
                        Email:
                    </Typography>
                    <Typography variant="body1">General Inquiries: justinolavides8@gmail.com</Typography>
                    <Typography variant="body1">Support: Genesis@gmail.com</Typography>
                    <Typography variant="body1">Sales: ViBeat@gmail.com</Typography>
                    
                    <Typography variant="h6" component="h3" gutterBottom style={{ fontWeight: 'bold', marginTop: '20px' }}>
                        Phone:
                    </Typography>
                    <Typography variant="body1">General Inquiries: +1-800-123-4567</Typography>
                    <Typography variant="body1">Support: +1-800-987-6543</Typography>
                    <Typography variant="body1">Sales: +1-800-567-1234</Typography>
                    
                    <Typography variant="h6" component="h3" gutterBottom style={{ fontWeight: 'bold', marginTop: '20px' }}>
                        Address:
                    </Typography>
                    <Typography variant="body1">ViBeat Music Company</Typography>
                    <Typography variant="body1">Bugo</Typography>
                    <Typography variant="body1">Cagayan de Oro City, 9000</Typography>
                    <Typography variant="body1">Philippines</Typography>
                    
                    <Typography variant="h6" component="h3" gutterBottom style={{ fontWeight: 'bold', marginTop: '20px' }}>
                        Business Hours:
                    </Typography>
                    <Typography variant="body1">Monday - Friday: 9:00 AM to 6:00 PM</Typography>
                    <Typography variant="body1">Saturday: 10:00 AM to 4:00 PM</Typography>
                    <Typography variant="body1">Sunday: Closed</Typography>
                    
                    <Typography variant="h6" component="h3" gutterBottom style={{ fontWeight: 'bold', marginTop: '20px' }}>
                        Follow Us:
                    </Typography>
                    <Link href="https://www.facebook.com/profile.php?id=61570904286413" target="_blank" style={{ color: '#1da1f2', textDecoration: 'none' }}>
                        Facebook
                    </Link>
                    <Link href="https://www.twitter.com/example" target="_blank" style={{ color: '#1da1f2', textDecoration: 'none', marginTop: '10px' }}>
                        Twitter
                    </Link>
                    <Link href="https://www.instagram.com/example" target="_blank" style={{ color: '#1da1f2', textDecoration: 'none', marginTop: '10px' }}>
                        Instagram
                    </Link>
                </Box>
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
