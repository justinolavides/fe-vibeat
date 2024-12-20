import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, TextField, Button, Box, Typography, Avatar, Alert, 
    CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Grid, FormHelperText 
} from '@mui/material';
import api from './services/api';

const avatarOptions = [
    'https://randomuser.me/api/portraits/lego/2.jpg',  // Male 2
    'https://randomuser.me/api/portraits/lego/3.jpg',  // Male 3
    'https://randomuser.me/api/portraits/lego/4.jpg',  // Male 4
    'https://randomuser.me/api/portraits/lego/5.jpg',  // Male 5
    'https://randomuser.me/api/portraits/lego/6.jpg',  // Female 1
    'https://randomuser.me/api/portraits/lego/7.jpg',  // Female 2
    'https://randomuser.me/api/portraits/lego/8.jpg',  // Female 3
    'https://randomuser.me/api/portraits/lego/9.jpg',
];

const Profile = ({ onProfileUpdate }) => {
    const [profile, setProfile] = useState({ name: '', email: '', bio: '', avatar: avatarOptions[0] });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/user/profile');
                setProfile(response.data);
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
            onProfileUpdate({ name: profile.name, avatar: profile.avatar });

            // Redirect to dashboard
            navigate('/music-dashboard');
        } catch (error) {
            setError('Error updating profile.');
        } finally {
            setSaving(false);
        }
    };

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
                    <Avatar alt="Profile Picture" src={profile.avatar} sx={{ width: 120, height: 120, mb: 2, border: '2px solid #fff' }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFFFFF', mb: 2 }}>{profile.name}</Typography>
                    <Typography variant="body1" sx={{ color: '#FFFFFF', mb: 2 }}>{profile.email}</Typography>
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
                                    sx={{ cursor: 'pointer', width: 80, height: 80, border: profile.avatar === avatar ? '2px solid #007AFF' : 'none' }}
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
