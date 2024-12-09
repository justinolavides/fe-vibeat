import React, { useState } from 'react';
import { Container, Button, Box, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Backdrop } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress

const Settings = () => {
    const navigate = useNavigate();
    const [openPassword, setOpenPassword] = useState(false);
    const [openTheme, setOpenTheme] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [theme, setTheme] = useState('day');
    const [loading, setLoading] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleChangePassword = () => {
        // Add your password change logic here
        setOpenPassword(false);
    };

    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        setOpenTheme(false);
        // Logic to change the theme can be added here
    };

    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/');
        }, 1000); // Display the loading screen for 1 second
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ p: 5, background: 'linear-gradient(to right, #007AFF, #5856D6)', color: '#FFFFFF', borderRadius: '15px' }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>Settings</Typography>
                <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ backgroundColor: '#FFFFFF', color: '#000000', borderRadius: '25px', height: '50px', fontSize: '16px' }}
                        onClick={() => handleNavigation('/profile')}
                    >
                        Edit Profile
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ backgroundColor: '#FFFFFF', color: '#000000', borderRadius: '25px', height: '50px', fontSize: '16px' }}
                        onClick={() => setOpenPassword(true)}
                    >
                        Change Password
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ backgroundColor: '#FFFFFF', color: '#000000', borderRadius: '25px', height: '50px', fontSize: '16px' }}
                        onClick={toggleNotifications}
                    >
                        {notificationsEnabled ? 'Notification Enabled' : 'Notification Disabled'}
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ backgroundColor: '#FFFFFF', color: '#000000', borderRadius: '25px', height: '50px', fontSize: '16px' }}
                        onClick={() => setOpenTheme(true)}
                    >
                        Themes
                    </Button>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ backgroundColor: '#FFFFFF', color: '#000000', borderRadius: '25px', height: '50px', fontSize: '16px' }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </Paper>

            {/* Change Password Dialog */}
            <Dialog open={openPassword} onClose={() => setOpenPassword(false)}>
                <DialogTitle>
                    Change Password
                    <IconButton aria-label="close" onClick={() => setOpenPassword(false)} sx={{ position: 'absolute', right: 8, top: 8, color: '#000' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="New Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleChangePassword} sx={{ backgroundColor: '#34C759', color: '#FFFFFF' }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Theme Selection Dialog with Day and Night Themes */}
            <Dialog open={openTheme} onClose={() => setOpenTheme(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    Select Theme
                    <IconButton aria-label="close" onClick={() => setOpenTheme(false)} sx={{ position: 'absolute', right: 8, top: 8, color: '#000' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Box display="flex" flexDirection="column" gap={2} alignItems="center">
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: theme === 'day' ? '#FFCC00' : '#E0E0E0',
                                color: theme === 'day' ? '#000' : '#8e8e8e',
                                borderRadius: '25px',
                                height: '50px',
                                fontSize: '16px'
                            }}
                            onClick={() => changeTheme('day')}
                        >
                            Day Theme
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: theme === 'night' ? '#4A00E0' : '#E0E0E0',
                                color: theme === 'night' ? '#FFF' : '#8e8e8e',
                                borderRadius: '25px',
                                height: '50px',
                                fontSize: '16px'
                            }}
                            onClick={() => changeTheme('night')}
                        >
                            Night Theme
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Loading Screen */}
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    );
};

export default Settings;
