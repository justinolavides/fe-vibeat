import React, { useState, useEffect, useRef } from 'react';
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
    Slider,
} from '@mui/material';
import { VolumeUp, Shuffle, SkipPrevious, PlayArrow, Pause, SkipNext, Repeat } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from './services/api'; // Your axios instance

const useFetchData = (endpoint) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(endpoint);
                setData(response.data);
            } catch (error) {
                console.error(`Error fetching ${endpoint}:`, error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [endpoint]);

    return { data, loading };
};

const MusicList = ({ songs, onPlay, onAddToPlaylist }) => (
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
            {songs.map((song) => (
                <TableRow key={song.id}>
                    <TableCell>{song.title}</TableCell>
                    <TableCell>{song.artist}</TableCell>
                    <TableCell>{song.album}</TableCell>
                    <TableCell>{song.year}</TableCell>
                    <TableCell>
                        <Button onClick={() => onPlay(song)} variant="contained" color="primary">
                            Play
                        </Button>
                        <Button
                            onClick={() => onAddToPlaylist(song)}
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
);

const MusicDashboard = () => {
    const [search, setSearch] = useState('');
    const [nowPlaying, setNowPlaying] = useState(null);
    const [playlist, setPlaylist] = useState(
        JSON.parse(localStorage.getItem('playlist')) || []
    );
    const [anchorEl, setAnchorEl] = useState(null);

    const audioRef = useRef(null);
    const navigate = useNavigate();

    const { data: music, loading: loadingMusic } = useFetchData('/music');
    const { data: topCharts, loading: loadingTopCharts } = useFetchData('/top-charts');
    const { data: listenAgain, loading: loadingListenAgain } = useFetchData('/listen-again');

    useEffect(() => {
        localStorage.setItem('playlist', JSON.stringify(playlist));
    }, [playlist]);

    const handlePlay = (song) => {
        setNowPlaying(song);
        if (audioRef.current) {
            audioRef.current.src = song.audioUrl; // Assume song.audioUrl contains the audio file URL
            audioRef.current.play();
        }
    };

    const handleAddToPlaylist = (song) => {
        if (!playlist.some((s) => s.id === song.id)) {
            setPlaylist([...playlist, song]);
        }
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Clear authentication data
        navigate('/'); // Navigate to homepage
    };

    const handleNavigateToProfile = () => {
        setAnchorEl(null);
        navigate('/profile'); // Navigate to profile page
    };

    const handleNavigateToPlaylist = () => {
        navigate('/playlist', { state: { playlist } }); // Pass playlist to playlist page
    };

    const filteredMusic = music.filter((song) =>
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase())
    );

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <AppBar position="static" sx={{ mb: 4 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        ViBeat
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleNavigateToPlaylist}
                        sx={{ mr: 2 }}
                    >
                        Playlist
                    </Button>
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
                        <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
                        <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Box mb={3}>
                        <Typography variant="h6">Top Charts</Typography>
                        {loadingTopCharts ? (
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
                        {loadingListenAgain ? (
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

                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>
                        Music List
                    </Typography>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        {loadingMusic ? (
                            <CircularProgress />
                        ) : (
                            <MusicList
                                songs={filteredMusic}
                                onPlay={handlePlay}
                                onAddToPlaylist={handleAddToPlaylist}
                            />
                        )}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={3}>
                    {nowPlaying && (
                        <Box mb={3}>
                            <Typography variant="h6">Now Playing</Typography>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="body1">{nowPlaying.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {nowPlaying.artist}
                                </Typography>
                                <audio ref={audioRef} controls style={{ width: '100%' }} />
                            </Paper>
                        </Box>
                    )}

                    <Box mb={3}>
                        <Typography variant="h6">Playlist</Typography>
                        <List>
                            {playlist.slice(0, 3).map((song, index) => (
                                <ListItem key={index}>
                                    <ListItemText
                                        primary={song.title}
                                        secondary={`${song.artist} • ${song.album}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        {playlist.length > 0 && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNavigateToPlaylist}
                                sx={{ mt: 2 }}
                            >
                                View Full Playlist
                            </Button>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MusicDashboard;
