import React, { useEffect, useState } from 'react';
import {
    Container, AppBar, Toolbar, Typography, TextField, Grid, Paper,
    Button, List, ListItem, ListItemText, IconButton, Snackbar, Box, Slider, Menu, MenuItem, Avatar, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Add, Delete, PlayArrow, Pause, VolumeUp, PlaylistAdd, PlaylistPlay } from '@mui/icons-material';

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
    const [playlists, setPlaylists] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(30);
    const [audio, setAudio] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [selectedSong, setSelectedSong] = useState(null);

    useEffect(() => {
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

    const handleAddToPlaylist = (song, playlistName) => {
        const updatedPlaylists = playlists.map(playlist => {
            if (playlist.name === playlistName) {
                if (playlist.songs.some(track => track.id === song.id)) {
                    setSnackbarMessage(`${song.title} is already in the playlist`);
                    setSnackbarOpen(true);
                    return playlist;
                }
                setSnackbarMessage(`${song.title} added to playlist`);
                setSnackbarOpen(true);
                return { ...playlist, songs: [...playlist.songs, song] };
            }
            return playlist;
        });
        setPlaylists(updatedPlaylists);
    };

    const handleRemoveFromPlaylist = (songId, playlistName) => {
        const updatedPlaylists = playlists.map(playlist => {
            if (playlist.name === playlistName) {
                return { ...playlist, songs: playlist.songs.filter(song => song.id !== songId) };
            }
            return playlist;
        });
        setPlaylists(updatedPlaylists);
        setSnackbarMessage('Song removed from playlist');
        setSnackbarOpen(true);
    };

    const handleCreatePlaylist = () => {
        if (newPlaylistName && !playlists.some(playlist => playlist.name === newPlaylistName)) {
            setPlaylists([...playlists, { name: newPlaylistName, songs: [] }]);
            setSnackbarMessage('Playlist created');
            setSnackbarOpen(true);
            setNewPlaylistName('');
            setDialogOpen(false);
        } else {
            setSnackbarMessage('Playlist name already exists or is empty');
            setSnackbarOpen(true);
        }
    };

    const handleOpenAddToPlaylistDialog = (song) => {
        setSelectedSong(song);
        setDialogOpen(true);
    };

    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleProfileMenuClose = () => setAnchorEl(null);

    const filteredMusic = music.filter((song) =>
        song.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            {/* Header */}
            <AppBar position="static" sx={{ mb: 3, backgroundColor: '#1c1c1e' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Music Playlist</Typography>
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
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
                {/* Left Column */}
                <Grid item xs={12} md={8}>
                    <Typography variant="h5" gutterBottom>All Songs</Typography>
                    {filteredMusic.map((song) => (
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
                                <IconButton
                                    color="secondary"
                                    onClick={() => handleOpenAddToPlaylistDialog(song)}
                                >
                                    <PlaylistAdd />
                                </IconButton>
                            </Box>
                        </Paper>
                    ))}
                </Grid>

                {/* Right Column */}
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

                    <Box mt={3}>
                        <Typography variant="h6">Playlists</Typography>
                        {playlists.map((playlist, index) => (
                            <Box key={index} mb={2}>
                                <Typography variant="subtitle1">{playlist.name}</Typography>
                                <List>
                                    {playlist.songs.map((song) => (
                                        <ListItem key={song.id}>
                                            <ListItemText primary={song.title} secondary={song.artist} />
                                            <IconButton
                                                edge="end"
                                                color="error"
                                                onClick={() => handleRemoveFromPlaylist(song.id, playlist.name)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </ListItem>
                                    ))}
                                </List>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<PlaylistPlay />}
                                    onClick={() => {
                                        // Logic to play the playlist, e.g., playing the first song in the playlist
                                        const firstSong = playlist.songs[0];
                                        if (firstSong) {
                                            handlePlayPause(firstSong);
                                        }
                                    }}
                                >
                                    Play Playlist
                                </Button>
                            </Box>
                        ))}
                    </Box>

                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PlaylistAdd />}
                        onClick={() => setDialogOpen(true)}
                        fullWidth
                    >
                        Create Playlist
                    </Button>
                </Grid>
            </Grid>

            {/* Create Playlist Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Create New Playlist</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Playlist Name"
                        variant="outlined"
                        fullWidth
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreatePlaylist} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for notifications */}
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
