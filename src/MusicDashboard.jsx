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
    CircularProgress,
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
    const [loading, setLoading] = useState({
        music: true,
        topCharts: true,
        listenAgain: true,
    });

    const defaultSong = {
        title: 'Sample Song',
        artist: 'Sample Artist',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const response = await api.get('/music');
                setMusic(response.data);
            } catch (error) {
                console.error('Error fetching music:', error);
            } finally {
                setLoading((prev) => ({ ...prev, music: false }));
            }
        };

        const fetchTopCharts = async () => {
            try {
                const response = await api.get('/top-charts');
                setTopCharts(response.data);
            } catch (error) {
                console.error('Error fetching top charts:', error);
            } finally {
                setLoading((prev) => ({ ...prev, topCharts: false }));
            }
        };

        const fetchListenAgain = async () => {
            try {
                const response = await api.get('/listen-again');
                setListenAgain(response.data);
            } catch (error) {
                console.error('Error fetching listen again songs:', error);
            } finally {
                setLoading((prev) => ({ ...prev, listenAgain: false }));
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
        localStorage.removeItem('authToken');
        navigate('/');
    };

    const handleNavigateToProfile = () => {
        setAnchorEl(null);
        navigate('/profile');
    };

    const handleNavigateToSettings = () => {
        setAnchorEl(null);
        navigate('/settings');
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
                            sx: { backgroundColor: 'white', borderRadius: '4px' },
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
                        <MenuItem onClick={handleNavigateToSettings}>Settings</MenuItem>
                        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
                {/* Left Column - Top Charts and Listen Again */}
                <Grid item xs={12} md={3}>
                    <Box mb={3}>
                        <Typography variant="h6">Top Charts</Typography>
                        {loading.topCharts ? (
                            <CircularProgress />
                        ) : (
                            topCharts.map((song) => (
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
                            ))
                        )}
                    </Box>

                    <Box mb={3}>
                        <Typography variant="h6">Listen Again</Typography>
                        {loading.listenAgain ? (
                            <CircularProgress />
                        ) : (
                            listenAgain.map((song) => (
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
                            ))
                        )}
                    </Box>
                </Grid>

                {/* Middle Column - Music List */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Music List
                    </Typography>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        {loading.music ? (
                            <Box display="flex" justifyContent="center">
                                <CircularProgress />
                            </Box>
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
                        )}
                    </Paper>
                </Grid>

                {/* Right Column - Now Playing and Playlist */}
                <Grid item xs={12} md={3}>
                    <Box mb={3}>
                        <Typography variant="h6">Now Playing</Typography>
                        {nowPlaying ? (
                            <Paper elevation={2} sx={{ p: 2 }}>
                                <Typography variant="body1">{nowPlaying.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {nowPlaying.artist}
                                </Typography>
                                <audio controls src={nowPlaying.url} style={{ width: '100%' }} />
                            </Paper>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No song is currently playing.
                            </Typography>
                        )}
                    </Box>

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
                                    </ListItem>
                                ))
                            ) : (
                                <Typography variant="body2" color="textSecondary">
                                    Your playlist is empty.
                                </Typography>
                            )}
                        </List>
                    </Box>

                    {/* Default Song Player */}
                    <Box mb={3}>
                        <Typography variant="h6">Sample Song</Typography>
                        <Paper elevation={2} sx={{ p: 2 }}>
                            <Typography variant="body1">{defaultSong.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {defaultSong.artist}
                            </Typography>
                            <audio controls src={defaultSong.url} style={{ width: '100%' }} />
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MusicDashboard;