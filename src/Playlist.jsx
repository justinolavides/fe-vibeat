import React, { useEffect, useState } from 'react';
import {
    Container, AppBar, Toolbar, Typography, TextField, Grid, Paper,
    Button, List, ListItem, ListItemText, IconButton, Snackbar, Box, Slider, Menu, MenuItem, Avatar
} from '@mui/material';
import { Add, Delete, PlayArrow, Pause, VolumeUp } from '@mui/icons-material';

const mockMusic = [
    { id: 1, title: 'Song A', artist: 'Artist 1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, title: 'Song B', artist: 'Artist 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 3, title: 'Song C', artist: 'Artist 3', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

const Playlist = () => {
    const [music, setMusic] = useState([]);
    const [search, setSearch] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [nowPlaying, setNowPlaying] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(30);
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        // Simulate API call
        setMusic(mockMusic);
    }, []);

    useEffect(() => {
        if (audio) {
            const updateProgress = () => {
                if (audio.duration) {
                    setProgress((audio.currentTime / audio.duration) * 100);
                }
            };

            audio.addEventListener('timeupdate', updateProgress);
            return () => {
                audio.removeEventListener('timeupdate', updateProgress);
            };
        }
    }, [audio]);

    const handlePlayPause = (song) => {
        if (!song.url) {
            console.error('Song URL is missing');
            return;
        }

        if (nowPlaying?.id === song.id) {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        } else {
            if (audio) {
                audio.pause();
            }
            const newAudio = new Audio(song.url);
            newAudio.volume = volume / 100;
            newAudio.play().catch(() => {
                console.error('Error playing audio. URL may be invalid.');
            });
            setAudio(newAudio);
            setNowPlaying(song);
        }
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        if (audio) {
            audio.volume = newValue / 100;
        }
    };

    const handleProgressChange = (event, newValue) => {
        if (audio) {
            audio.currentTime = (newValue / 100) * audio.duration;
            setProgress(newValue);
        }
    };

    const handleAddToPlaylist = (song) => {
        setPlaylist((prev) => [...prev, song]);
        setSnackbarMessage(`${song.title} added to playlist`);
        setSnackbarOpen(true);
    };

    const handleRemoveFromPlaylist = (song) => {
        setPlaylist((prev) => prev.filter((track) => track.id !== song.id));
        setSnackbarMessage(`${song.title} removed from playlist`);
        setSnackbarOpen(true);
    };

    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleProfileMenuClose = () => setAnchorEl(null);
    const handleNavigateToProfile = () => { setAnchorEl(null); /* navigate to profile */ };
    const handleNavigateToSettings = () => { setAnchorEl(null); /* navigate to settings */ };
    const handleLogout = () => { setAnchorEl(null); /* handle logout */ };

    const filteredMusic = music.filter((song) =>
        song.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            {/* Header */}
            <AppBar position="static" sx={{ mb: 3 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Playlist</Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Search songs"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ backgroundColor: 'white', borderRadius: 1 }}
                    />
                    <IconButton onClick={handleProfileMenuOpen}>
                        <Avatar src="/static/images/avatar/1.jpg" alt="Profile" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleProfileMenuClose}
                    >
                        <MenuItem onClick={handleNavigateToProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleNavigateToSettings}>Settings</MenuItem>
                        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
                {/* Left Column - Songs List */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>All Songs</Typography>
                    {filteredMusic.map((song) => (
                        <Paper key={song.id} elevation={2} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="body1">{song.title}</Typography>
                            <Typography variant="body2" color="textSecondary">{song.artist}</Typography>
                            <Button
                                onClick={() => handlePlayPause(song)}
                                variant="contained"
                                color="primary"
                                startIcon={nowPlaying?.id === song.id && !audio?.paused ? <Pause /> : <PlayArrow />}
                                sx={{ mt: 1, mr: 1 }}
                            >
                                {nowPlaying?.id === song.id && !audio?.paused ? 'Pause' : 'Play'}
                            </Button>
                            <Button
                                onClick={() => handleAddToPlaylist(song)}
                                variant="contained"
                                color="secondary"
                                startIcon={<Add />}
                                sx={{ mt: 1 }}
                            >
                                Add
                            </Button>
                        </Paper>
                    ))}
                </Grid>

                {/* Right Column - Playlist and Music Player */}
                <Grid item xs={12} md={4}>
                    <Box mb={3}>
                        <Typography variant="h6">Playlist</Typography>
                        <List>
                            {playlist.length > 0 ? (
                                playlist.map((song, index) => (
                                    <ListItem key={index}>
                                        <ListItemText
                                            primary={song.title}
                                            secondary={song.artist}
                                        />
                                        <IconButton onClick={() => handleRemoveFromPlaylist(song)}>
                                            <Delete />
                                        </IconButton>
                                    </ListItem>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    Your playlist is empty.
                                </Typography>
                            )}
                        </List>
                    </Box>

                    {/* Music Player */}
                    <Box mb={3}>
                        <Typography variant="h6">Now Playing</Typography>
                        {nowPlaying ? (
                            <Paper elevation={2} sx={{ p: 2 }}>
                                <Typography variant="body1">{nowPlaying.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{nowPlaying.artist}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <IconButton onClick={() => handlePlayPause(nowPlaying)}>
                                        {nowPlaying && !audio?.paused ? <Pause /> : <PlayArrow />}
                                    </IconButton>
                                    <Slider
                                        value={progress}
                                        onChange={handleProgressChange}
                                        aria-labelledby="continuous-slider"
                                        sx={{ mx: 2 }}
                                    />
                                    <VolumeUp />
                                    <Slider
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        aria-labelledby="volume-slider"
                                        sx={{ ml: 2, width: 100 }}
                                    />
                                </Box>
                            </Paper>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No song is currently playing.
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default Playlist;
