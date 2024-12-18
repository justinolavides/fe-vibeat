import React, { useEffect, useState } from 'react';
import {
    Container, Box, Typography, TextField, Paper, Grid, Button, AppBar, Toolbar, IconButton,
    Menu, MenuItem, Avatar, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Slider
} from '@mui/material';
import { PlayArrow, Pause, VolumeUp, SkipNext, SkipPrevious, Download } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const mockDownloads = [
    { id: 1, title: 'Sample Song A', artist: 'Artist A', album: 'Album A', year: '2000', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    { id: 2, title: 'Sample Song B', artist: 'Artist B', album: 'Album B', year: '2000', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
    { id: 3, title: 'Sample Song C', artist: 'Artist C', album: 'Album C', year: '2000', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
];

const DownloadPage = () => {
    const [downloads, setDownloads] = useState([]);
    const [search, setSearch] = useState('');
    const [nowPlaying, setNowPlaying] = useState(null);
    const [audio, setAudio] = useState(null);
    const [volume, setVolume] = useState(30);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [duration, setDuration] = useState('00:00');
    const [playlist, setPlaylist] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setDownloads(mockDownloads);
    }, []);

    useEffect(() => {
        if (audio) {
            const updateProgress = () => {
                if (audio.duration) {
                    setProgress((audio.currentTime / audio.duration) * 100);
                    setCurrentTime(formatTime(audio.currentTime));
                    setDuration(formatTime(audio.duration));
                }
            };
            audio.addEventListener('timeupdate', updateProgress);
            return () => {
                audio.removeEventListener('timeupdate', updateProgress);
            };
        }
    }, [audio]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    const handlePlayPause = (item) => {
        if (nowPlaying?.id === item.id) {
            audio.paused ? audio.play() : audio.pause();
        } else {
            audio?.pause();
            const newAudio = new Audio(item.url);
            newAudio.volume = volume / 100;
            newAudio.play().catch(() => console.error('Error playing audio.'));
            setAudio(newAudio);
            setNowPlaying(item);
        }
    };

    const handleNextTrack = () => {
        const currentIndex = downloads.findIndex((item) => item.id === nowPlaying?.id);
        const nextTrack = downloads[(currentIndex + 1) % downloads.length];
        handlePlayPause(nextTrack);
    };

    const handlePreviousTrack = () => {
        const currentIndex = downloads.findIndex((item) => item.id === nowPlaying?.id);
        const prevTrack = downloads[(currentIndex - 1 + downloads.length) % downloads.length];
        handlePlayPause(prevTrack);
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

    const handleAddToPlaylist = (item) => {
        setPlaylist((prevPlaylist) => [...prevPlaylist, item]);
        setSnackbarMessage(`${item.title} added to playlist`);
        setSnackbarOpen(true);
    };

    const handleRemoveFromPlaylist = (item) => {
        setPlaylist((prevPlaylist) => prevPlaylist.filter((song) => song.id !== item.id));
        setSnackbarMessage(`${item.title} removed from playlist`);
        setSnackbarOpen(true);
    };

    const handleDownload = () => {
        if (nowPlaying) {
            const link = document.createElement('a');
            link.href = nowPlaying.url;
            link.download = nowPlaying.title + '.mp3';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setSnackbarMessage('Download started...');
            setSnackbarOpen(true);
        }
    };

    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleProfileMenuClose = () => setAnchorEl(null);
    const handleSnackbarClose = () => setSnackbarOpen(false);
    const handleNavigateToProfile = () => { setAnchorEl(null); navigate('/profile'); };

    const filteredDownloads = downloads.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.artist.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <AppBar position="static" sx={{ mb: 4, backgroundColor: '#007AFF' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Downloads</Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Search for downloads"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                    />
                    <IconButton onClick={handleProfileMenuOpen}>
                        <Avatar src="/static/images/avatar/1.jpg" alt="Profile" />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
                        <MenuItem onClick={handleNavigateToProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
                <Grid item xs={12} md={9}>
                    <Typography variant="h5" gutterBottom>Downloads</Typography>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        {filteredDownloads.length === 0 ? (
                            <Typography variant="h6" align="center">No downloads available</Typography>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Artist</TableCell>
                                        <TableCell>Album</TableCell>
                                        <TableCell>Year</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredDownloads.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.artist}</TableCell>
                                            <TableCell>{item.album}</TableCell>
                                            <TableCell>{item.year}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Button
                                                        onClick={() => handlePlayPause(item)}
                                                        variant="contained"
                                                        color="primary"
                                                        startIcon={nowPlaying?.id === item.id ? <Pause /> : <PlayArrow />}
                                                    >
                                                        {nowPlaying?.id === item.id ? 'Pause' : 'Play'}
                                                    </Button>
                                                    {playlist.some((song) => song.id === item.id) ? (
                                                        <Button onClick={() => handleRemoveFromPlaylist(item)} variant="outlined" color="secondary">
                                                            Remove from Playlist
                                                        </Button>
                                                    ) : (
                                                        <Button onClick={() => handleAddToPlaylist(item)} variant="outlined" color="secondary">
                                                            Add to Playlist
                                                        </Button>
                                                    )}
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </Paper>
                </Grid>

                {/* Now Playing Section */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h5" gutterBottom>Now Playing</Typography>
                    <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="subtitle1">Now Playing:</Typography>
                            <Typography variant="body1">
                                {nowPlaying ? `${nowPlaying.title} - ${nowPlaying.artist}` : 'No track selected'}
                            </Typography>
                        </Box>
                        {nowPlaying && (
                            <Box mt={2} width="100%">
                                {/* Timer */}
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="body2">{currentTime}</Typography>
                                    <Typography variant="body2">{duration}</Typography>
                                </Box>

                                {/* Progress Bar */}
                                <Slider value={progress} onChange={handleProgressChange} sx={{ mt: 2 }} />

                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                    <VolumeUp />
                                    <Slider value={volume} onChange={handleVolumeChange} sx={{ width: 100, ml: 2 }} />
                                </Box>

                                {/* Play/Pause, Next/Previous */}
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                                    <IconButton onClick={handlePreviousTrack}>
                                        <SkipPrevious />
                                    </IconButton>
                                    <IconButton onClick={() => handlePlayPause(nowPlaying)}>
                                        {nowPlaying?.id ? (audio?.paused ? <PlayArrow /> : <Pause />) : <PlayArrow />}
                                    </IconButton>
                                    <IconButton onClick={handleNextTrack}>
                                        <SkipNext />
                                    </IconButton>
                                </Box>

                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleDownload}
                                    startIcon={<Download />}
                                    sx={{ mt: 2 }}
                                >
                                    Download
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default DownloadPage;
