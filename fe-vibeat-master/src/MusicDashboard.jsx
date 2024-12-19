import React, { useState, useEffect } from 'react';
import {
    Container,
    Box,
    Typography,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    TextField,
    Grid,
    Paper,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
} from '@mui/material';
import {
    Home as HomeIcon,
    LibraryMusic as MusicIcon,
    PlaylistPlay as PlaylistIcon,
    Download as DownloadIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from './services/api'; // Your axios instance

const MusicDashboard = () => {
    const [music, setMusic] = useState([]);
    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const response = await api.get('/music');
                setMusic(response.data);
            } catch (error) {
                console.error('Error fetching music:', error);
            }
        };

        fetchMusic();
    }, []);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Example: remove token from localStorage
        navigate('/'); // Navigate to homepage
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Left Sidebar */}
            <Box
                sx={{
                    width: 240,
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: 2,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    ViBeat
                </Typography>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigate('/home')}>
                            <ListItemIcon>
                                <HomeIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigate('/music')}>
                            <ListItemIcon>
                                <MusicIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Music" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigate('/playlists')}>
                            <ListItemIcon>
                                <PlaylistIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Playlists" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigate('/downloads')}>
                            <ListItemIcon>
                                <DownloadIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Downloads" />
                        </ListItemButton>
                    </ListItem>
                    <Divider sx={{ bgcolor: 'white' }} />
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigate('/settings')}>
                            <ListItemIcon>
                                <SettingsIcon sx={{ color: 'white' }} />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1 }}>
                {/* Header */}
                <AppBar position="static" sx={{ bgcolor: 'primary.dark' }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Hello, User!
                        </Typography>
                        <TextField
                            variant="outlined"
                            placeholder="Search for songs"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            size="small"
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 1,
                                mr: 2,
                                width: 300,
                            }}
                        />
                        <IconButton onClick={handleProfileMenuOpen}>
                            <Avatar src="/static/images/avatar/1.jpg" alt="Profile" />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleProfileMenuClose}
                        >
                            <MenuItem onClick={() => handleNavigate('/profile')}>Profile</MenuItem>
                            <MenuItem onClick={() => handleNavigate('/settings')}>Settings</MenuItem>
                            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>

                {/* Main Grid Content */}
                <Grid container spacing={3} sx={{ p: 3 }}>
                    {/* Left Section */}
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Just for You
                        </Typography>
                        {music.slice(0, 5).map((song) => (
                            <Paper key={song.id} elevation={2} sx={{ p: 2, mb: 1 }}>
                                <Typography variant="body1">{song.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {song.artist}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    sx={{ mt: 1 }}
                                >
                                    Add to Playlist
                                </Button>
                            </Paper>
                        ))}
                    </Grid>

                    {/* Right Section */}
                    <Grid item xs={12} md={8}>
                        <Typography variant="h6" gutterBottom>
                            Recently Played
                        </Typography>
                        {music.slice(5, 10).map((song) => (
                            <Paper key={song.id} elevation={2} sx={{ p: 2, mb: 1 }}>
                                <Typography variant="body1">{song.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {song.artist}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    sx={{ mt: 1 }}
                                >
                                    Add to Playlist
                                </Button>
                            </Paper>
                        ))}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default MusicDashboard;
