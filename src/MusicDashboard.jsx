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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from './services/api'; // Your axios instance

const MusicDashboard = () => {
    const [music, setMusic] = useState([]);
    const [topCharts, setTopCharts] = useState([]);
    const [listenAgain, setListenAgain] = useState([]);
    const [search, setSearch] = useState('');
    const [nowPlaying, setNowPlaying] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const response = await api.get('/music');
                setMusic(response.data);
            } catch (error) {
                console.error('Error fetching music:', error);
            }
        };

        const fetchTopCharts = async () => {
            try {
                const response = await api.get('/top-charts');
                setTopCharts(response.data);
            } catch (error) {
                console.error('Error fetching top charts:', error);
            }
        };

        const fetchListenAgain = async () => {
            try {
                const response = await api.get('/listen-again');
                setListenAgain(response.data);
            } catch (error) {
                console.error('Error fetching listen again songs:', error);
            }
        };

        fetchMusic();
        fetchTopCharts();
        fetchListenAgain();
    }, []);

    const handlePlay = (song) => {
        setNowPlaying(song);
    };

    const handleAddToPlaylist = (song) => {
        setPlaylist([...playlist, song]);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        // Clear authentication data (e.g., token)
        localStorage.removeItem('authToken'); // Example: remove token from localStorage
        navigate('/'); // Navigate to homepage
    };

    const handleNavigateToProfile = () => {
        setAnchorEl(null); // Close the menu
        navigate('/profile'); // Navigate to the Profile page
    };

    const filteredMusic = music.filter((song) =>
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            {/* Header */}
            <AppBar position="static" sx={{ mb: 4 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        ViBeat
                    </Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Search for songs"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            sx: { backgroundColor: 'white', borderRadius: '4px' }
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
                        <MenuItem onClick={handleNavigateToProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
                        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
                {/* Left Column - Top Charts and Listen Again */}
                <Grid item xs={12} md={3}>
                    <Box mb={3}>
                        <Typography variant="h6">Top Charts</Typography>
                        {topCharts.map((song) => (
                            <Paper key={song.id} elevation={2} sx={{ p: 2, mb: 1 }}>
                                <Typography variant="body1">{song.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {song.artist}
                                </Typography>
                                <Button
                                    onClick={() => handleAddToPlaylist(song)}
                                    variant="contained"
                                    color="secondary"
                                    sx={{ mt: 1 }}
                                >
                                    Add to Playlist
                                </Button>
                            </Paper>
                        ))}
                    </Box>

                    <Box mb={3}>
                        <Typography variant="h6">Listen Again</Typography>
                        {listenAgain.map((song) => (
                            <Paper key={song.id} elevation={2} sx={{ p: 2, mb: 1 }}>
                                <Typography variant="body1">{song.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {song.artist}
                                </Typography>
                                <Button
                                    onClick={() => handleAddToPlaylist(song)}
                                    variant="contained"
                                    color="secondary"
                                    sx={{ mt: 1 }}
                                >
                                    Add to Playlist
                                </Button>
                            </Paper>
                        ))}
                    </Box>
                </Grid>

                {/* Middle Column - Music List */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Music List
                    </Typography>
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
                                                onClick={() => handlePlay(song)}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Play
                                            </Button>
                                            <Button
                                                onClick={() => handleAddToPlaylist(song)}
                                                variant="contained"
                                                color="secondary"
                                                sx={{ ml: 1 }}
                                            >
                                                Add to Playlist
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                {/* Right Column - Now Playing and Playlist */}
                <Grid item xs={12} md={3}>
                    {nowPlaying && (
                        <Box mb={3}>
                            <Typography variant="h6">Now Playing</Typography>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="body1">{nowPlaying.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {nowPlaying.artist}
                                </Typography>
                            </Paper>
                        </Box>
                    )}

                    <Box mb={3}>
                        <Typography variant="h6">Playlist</Typography>
                        <List>
                            {playlist.map((song, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={song.title}
                                        secondary={`${song.artist} • ${song.album}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MusicDashboard;
