import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
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
                navigate('/users');  // Redirect after registration
            }
        } catch (error) {
            if (error.response && error.response.data) {
                // Log the error details
                console.error('Registration error:', error.response.data);
                setError(JSON.stringify(error.response.data));
            } else {
                setError('Registration failed');
            }
        }
    };

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundImage: 'url(/back.png)', // Ensure this path is correct
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
                        padding: '40px', 
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
                        {/* Name Input */}
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
                                marginBottom: '15px', // Adds margin for better spacing
                                boxShadow: '0 3px 5px rgba(0,0,0,0.2)' // Adds shadow for depth
                            }} // White background for input fields with rounded corners and shadow

                        />
                        {/* Email Input */}
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
                                marginBottom: '15px', // Adds margin for better spacing
                                boxShadow: '0 3px 5px rgba(0,0,0,0.2)' // Adds shadow for depth
                            }} // White background for input fields with rounded corners and shadow
                        />
                        {/* Password Input */}
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
                                marginBottom: '15px', // Adds margin for better spacing
                                boxShadow: '0 3px 5px rgba(0,0,0,0.2)' // Adds shadow for depth
                            }} // White background for input fields with rounded corners and shadow
                        />
                        {/* Register Button */}
                        <Button variant="contained" color="primary" type="submit" fullWidth style={{ marginTop: '20px', padding: '10px 0', fontWeight: 'bold' }}>
                            Register
                        </Button>
                        {/* Error Message */}
                        {error && <Typography color="error" style={{ marginTop: '10px' }}>{error}</Typography>}
                    </form>
                </Paper>
                {/* Register Box End */}
            </Container>
        </div>
    );
};

export default Register;
