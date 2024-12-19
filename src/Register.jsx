import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Link, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from './services/api'; // Import the centralized Axios instance

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/register', {
                name,
                email,
                password,
            });

            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
                navigate('/admin');  // Redirect after registration
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Registration error:', error.response.data);
                setError(JSON.stringify(error.response.data));
            } else {
                setError('Registration failed');
            }
        }
    };

    const handleLoginRedirect = () => {
        navigate('/', { state: { showLogin: true } });
    };

    return (
        <>
            <AppBar position="static" style={{ backgroundColor: 'rgba(50, 0, 0, 0.3)' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ cursor: 'pointer' }}>
                        <span style={{ color: '#FFFFFF', fontWeight: 'bold', textShadow: '4px 2px', fontSize: '50px' }}>VIB</span>
                        <span style={{ color: '#000000', fontWeight: 'bold', textShadow: '4px 2px', fontSize: '50px' }}>EAT</span>
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                    <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>
                    <Button color="inherit" onClick={() => navigate('/', { state: { showLogin: true } })}>Login</Button>
                </Toolbar>
            </AppBar>

            <div
                style={{
                    height: 'calc(100vh - 64px)', // Adjust height to account for AppBar
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'url(/back.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                }}
            >
                {/* Background Overlay */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.7)',  // Semi-transparent black overlay
                        zIndex: 1
                    }}
                />
                <Container maxWidth="sm" style={{ zIndex: 2 }}>
                    {/* Register Box Start */}
                    <Paper 
                        elevation={5} 
                        style={{ 
                            padding: '20px', 
                            background: 'linear-gradient(to right, #8e2de2, #4a00e0)', 
                            borderRadius: '10px',
                            color: '#FFFFFF',
                        }}
                    >
                        {/* Register Title */}
                        <Typography variant="h4" component="h1" gutterBottom style={{ color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' }}>
                            Register
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                margin="normal"
                                variant="outlined"
                                style={{ 
                                    backgroundColor: '#FFFFFF', 
                                    borderRadius: '5px',
                                    marginBottom: '10px', 
                                    boxShadow: '0 30px 5px rgba(0,0,0,0.2)' 
                                }} 
                            />
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
                                    marginBottom: '10px', 
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
                                    marginBottom: '10px', 
                                    boxShadow: '0 30px 5px rgba(0,0,0,0.2)' 
                                }} 
                            />
                            <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '10px', padding: '10px 0', fontWeight: 'bold' }}>
                                Register
                            </Button>
                            {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
                        </form>
                        <Typography variant="body2" style={{ marginTop: '20px', textAlign: 'center', color: '#FFFFFF' }}>
                            Already have an account?{' '}
                            <Link component="button" variant="body2" style={{ color: '#FFFFFF' }} onClick={handleLoginRedirect}>
                                Login Here
                            </Link>
                        </Typography>
                    </Paper>
                </Container>
            </div>
        </>
    );
};

export default Register;
