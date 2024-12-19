import React, { useState } from 'react';
import {
    Container, AppBar, Toolbar, Typography, TextField, Grid, Paper,
    Button, IconButton, Box, Slider, Menu, MenuItem, Avatar
} from '@mui/material';
import { PlayArrow, Pause, Add, VolumeUp } from '@mui/icons-material';

const mockSearchResults = [
    { id: 1, title: 'Search Result Song A', artist: 'Artist A', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 2, title: 'Search Result Song B', artist: 'Artist B', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 3, title: 'Search Result Song C', artist: 'Artist C', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

const SearchResults = () => {
    const [searchResults] = useState(mockSearchResults);
    const [search, setSearch] = useState('');
    const [nowPlaying, setNowPlaying] = useState(null);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(30);
    const [audio, setAudio] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePlayPause = (song) => {
        if (!song.url) {
            console.error('Song URL is missing');
            return;
        }
        if (nowPlaying?.id === song.id) {
            audio.paused ? audio.play() : audio.pause();
        } else {
            if (audio) audio.pause();
            const newAudio = new Audio(song.url);
            newAudio.volume = volume / 100;
            newAudio.play().catch(() => console.error('Error playing audio.'));
            setAudio(newAudio);
            setNowPlaying(song);
        }
    };

    const handleVolumeChange = (event, newValue) => {
        setVolume(newValue);
        if (audio) audio.volume = newValue / 100;
    };

    const handleProgressChange = (event, newValue) => {
        if (audio) {
            audio.currentTime = (newValue / 100) * audio.duration;
            setProgress(newValue);
        }
    };

    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleProfileMenuClose = () => setAnchorEl(null);

    const filteredResults = searchResults.filter((song) =>
        song.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            {/* Header */}
            <AppBar position="static" sx={{ mb: 3, backgroundColor: '#1c1c1e' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Search Results</Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Search songs"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        size="small"
                    />
                    <IconButton onClick={handleProfileMenuOpen}>
                        <Avatar src="/static/images/avatar/1.jpg" />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
                        <MenuItem onClick={() => { window.location.href = 'http://localhost:3000/profile'; }}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={() => { window.location.href = 'http://localhost:3000/settings'; }}>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={() => {
                            window.location.href = 'http://localhost:3000/';
                        }}>
                            Log Out
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
                {/* Search Results Column */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>Results</Typography>
                    {filteredResults.map((song) => (
                        <Paper
                            key={song.id}
                            elevation={3}
                            sx={{
                                display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center', p: 2, mb: 2, borderRadius: 2,
                                background: 'linear-gradient(to right, #f9f9f9, #fff)',
                            }}
                        >
                            <Box>
                                <Typography variant="h6">{song.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{song.artist}</Typography>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={nowPlaying?.id === song.id && !audio?.paused ? <Pause /> : <PlayArrow />}
                                    onClick={() => handlePlayPause(song)}
                                    sx={{ mr: 1 }}
                                >
                                    {nowPlaying?.id === song.id && !audio?.paused ? 'Pause' : 'Play'}
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<Add />}
                                >
                                    Add to Playlist
                                </Button>
                            </Box>
                        </Paper>
                    ))}
                </Grid>

                {/* Now Playing Column */}
                <Grid item xs={12} md={4}>
                    <Box>
                        <Typography variant="h6">Now Playing</Typography>
                        {nowPlaying ? (
                            <Paper elevation={3} sx={{
                                p: 2, borderRadius: 2,
                                background: 'linear-gradient(to right, #e3f2fd, #f1f8e9)',
                            }}>
                                <Typography variant="h6" gutterBottom>{nowPlaying.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{nowPlaying.artist}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <IconButton onClick={() => handlePlayPause(nowPlaying)} color="primary">
                                        {audio?.paused ? <PlayArrow /> : <Pause />}
                                    </IconButton>
                                    <Slider
                                        value={progress}
                                        onChange={handleProgressChange}
                                        sx={{ mx: 2, flex: 1 }}
                                    />
                                    <VolumeUp />
                                    <Slider
                                        value={volume}
                                        onChange={handleVolumeChange}
                                        sx={{ width: 100, ml: 1 }}
                                    />
                                </Box>
                            </Paper>
                        ) : (
                            <Typography>No song is playing.</Typography>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SearchResults;
