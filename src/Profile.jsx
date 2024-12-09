import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography, Paper, Avatar, Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Grid, FormHelperText } from '@mui/material';
import api from './services/api';

const Profile = ({ onProfileUpdate }) => {
    const [profile, setProfile] = useState({ name: '', email: '', bio: '', avatar: '/static/images/avatar/1.jpg' });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState('/static/images/avatar/1.jpg');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/user/profile');
                setProfile(response.data);
                setSelectedAvatar(response.data.avatar || '/static/images/avatar/1.jpg');
            } catch (error) {
                setError('Failed to fetch profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleAvatarChange = (avatar) => {
        setSelectedAvatar(avatar);
        setProfile({ ...profile, avatar });
        setOpenDialog(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!profile.name || !profile.email) {
            setError('Name and Email are required.');
            return;
        }

        setSaving(true);
        setError('');
        try {
            const response = await api.put('/user/profile', profile);
            setMessage(response.data.message);

            // Update profile in parent component
            onProfileUpdate({ name: profile.name, avatar: selectedAvatar });

            // Redirect to dashboard
            navigate('/music-dashboard');
        } catch (error) {
            setError('Error updating profile.');
        } finally {
            setSaving(false);
        }
    };

    const avatarOptions = [
        '/static/images/avatar/1.jpg',
        '/static/images/avatar/2.jpg',
        '/static/images/avatar/3.jpg',
        '/static/images/avatar/4.jpg',
    ];

    if (loading) {
        return (
            <Container maxWidth="md">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, background: 'linear-gradient(to right, #f39c12, #f1c40f)', padding: 4, borderRadius: '15px' }}>
            <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="flex-start">
                {/* Left Section */}
                <Box display="flex" flexDirection="column" alignItems="center" width="40%">
                    <Avatar alt="Profile Picture" src={selectedAvatar} sx={{ width: 120, height: 120, mb: 2, border: '2px solid #fff' }} />
                    <Button variant="contained" onClick={() => setOpenDialog(true)} sx={{ mb: 1, backgroundColor: '#007AFF', color: '#FFFFFF' }}>
                        Choose Avatar
                    </Button>
                </Box>

                {/* Right Section */}
                <Box width="55%">
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFFFFF', mb: 2 }}>Profile Details</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '5px', mb: 2 }}
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={profile.email}
                            onChange={handleChange}
                            margin="normal"
                            fullWidth
                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '5px', mb: 2 }}
                        />
                        <TextField
                            label="Bio"
                            name="bio"
                            value={profile.bio}
                            onChange={handleChange}
                            margin="normal"
                            multiline
                            rows={4}
                            fullWidth
                            sx={{ backgroundColor: '#FFFFFF', borderRadius: '5px', mb: 2 }}
                        />
                        {error && <FormHelperText error>{error}</FormHelperText>}
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor: '#27ae60', color: '#FFFFFF' }} disabled={saving}>
                            {saving ? 'Saving...' : 'Save'}
                        </Button>
                    </form>
                    {message && (
                        <Alert severity="success" sx={{ mt: 2 }}>
                            {message}
                        </Alert>
                    )}
                </Box>
            </Box>

            {/* Avatar Selection Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Choose Your Avatar</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {avatarOptions.map((avatar) => (
                            <Grid item xs={3} key={avatar}>
                                <Avatar
                                    alt="Avatar Option"
                                    src={avatar}
                                    onClick={() => handleAvatarChange(avatar)}
                                    sx={{ cursor: 'pointer', width: 80, height: 80, border: selectedAvatar === avatar ? '2px solid #007AFF' : 'none' }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default Profile;
