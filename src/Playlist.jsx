import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Grid,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, Pause, Add, Delete } from '@mui/icons-material';
import api from './services/api';


const Playlist = () => {
    const [music, setMusic] = useState([]);
    const [topCharts, setTopCharts] = useState([]);
    const [listenAgain, setListenAgain] = useState([]);
    const [search, setSearch] = useState('');
    const [nowPlaying, setNowPlaying] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [musicRes, topChartsRes, listenAgainRes] = await Promise.all([
                    api.get('/music'),
                    api.get('/top-charts'),
                    api.get('/listen-again')
                ]);
                setMusic(musicRes.data);
                setTopCharts(topChartsRes.data);
                setListenAgain(listenAgainRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handlePlayPause = (song) => {
        if (nowPlaying?.id === song.id) {
            setNowPlaying(null);
        } else {
            setNowPlaying(song);
        }
    };

    const handleAddToPlaylist = (song) => {
        setPlaylist((prev) => [...prev, song]);
        setSnackbarMessage(`Added ${song.title} to playlist`);
        setSnackbarOpen(true);
    };

    const handleRemoveFromPlaylist = (song) => {
        setPlaylist((prev) => prev.filter(track => track.id !== song.id));
        setSnackbarMessage(`Removed ${song.title} from playlist`);
        setSnackbarOpen(true);
    };

    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleProfileMenuClose = () => setAnchorEl(null);

    const handleNavigateToProfile = () => {
        setAnchorEl(null);
        navigate('/profile');
    };

    const handleSnackbarClose = () => setSnackbarOpen(false);

    const filteredMusic = music.filter((song) =>
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <AppBar position="static" sx={{ mb: 4, backgroundColor: '#007AFF' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Playlist</Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Search for songs"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{ sx: { backgroundColor: 'white', borderRadius: '4px' } }}
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
                        <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
                {/* Left Column */}
                <Grid item xs={12} md={3}>
                    <Box mb={3}>
                        <Typography variant="h6">Top Charts</Typography>
                        {topCharts.map((song) => (
                            <Paper key={song.id} elevation={2} sx={{ p: 2, mb: 1 }}>
                                <Typography variant="body1">{song.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{song.artist}</Typography>
                                <Box display="flex" justifyContent="space-between" mt={1}>
                                    <Button
                                        onClick={() => handleAddToPlaylist(song)}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<Add />}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        onClick={() => handlePlayPause(song)}
                                        variant="contained"
                                        color="primary"
                                        startIcon={nowPlaying?.id === song.id ? <Pause /> : <PlayArrow />}
                                    >
                                        {nowPlaying?.id === song.id ? 'Pause' : 'Play'}
                                    </Button>
                                </Box>
                            </Paper>
                        ))}
                    </Box>

                    <Box mb={3}>
                        <Typography variant="h6">Listen Again</Typography>
                        {listenAgain.map((song) => (
                            <Paper key={song.id} elevation={2} sx={{ p: 2, mb: 1 }}>
                                <Typography variant="body1">{song.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{song.artist}</Typography>
                                <Box display="flex" justifyContent="space-between" mt={1}>
                                    <Button
                                        onClick={() => handleAddToPlaylist(song)}
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<Add />}
                                    >
                                        Add
                                    </Button>
                                    <Button
                                        onClick={() => handlePlayPause(song)}
                                        variant="contained"
                                        color="primary"
                                        startIcon={nowPlaying?.id === song.id ? <Pause /> : <PlayArrow />}
                                    >
                                        {nowPlaying?.id === song.id ? 'Pause' : 'Play'}
                                    </Button>
                                </Box>
                            </Paper>
                        ))}
                    </Box>
                </Grid>

                {/* Middle Column */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>All Songs</Typography>
                    <Paper elevation={3} sx={{ p: 2 }}>
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
                                {filteredMusic.map((song) => (
                                    <TableRow key={song.id}>
                                        <TableCell>{song.title}</TableCell>
                                        <TableCell>{song.artist}</TableCell>
                                        <TableCell>{song.album}</TableCell>
                                        <TableCell>{song.year}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handlePlayPause(song)}
                                                variant="contained"
                                                color="primary"
                                                startIcon={nowPlaying?.id === song.id ? <Pause /> : <PlayArrow />}
                                            >
                                                {nowPlaying?.id === song.id ? 'Pause' : 'Play'}
                                            </Button>
                                            <Button
                                                onClick={() => handleAddToPlaylist(song)}
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<Add />}
                                                sx={{ ml: 1 }}
                                            >
                                                Add
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={3}>
                    {nowPlaying && (
                        <Box mb={3}>
                            <Typography variant="h6">Now Playing</Typography>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="body1">{nowPlaying.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{nowPlaying.artist}</Typography>
                            </Paper>
                        </Box>
                    )}

                    <Box mb={3}>
                        <Typography variant="h6">Your Playlist</Typography>
                        <List>
                            {playlist.map((song) => (
                                <ListItem key={song.id}>
                                    <ListItemText primary={song.title} secondary={`${song.artist} • ${song.album}`} />
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFromPlaylist(song)}>
                                        <Delete />
                                    </IconButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
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

export default Playlist;
