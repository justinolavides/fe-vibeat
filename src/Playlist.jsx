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
    Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from './services/api';


const Playlist = () => {
    const [music, setMusic] = useState([]);
    const [topCharts, setTopCharts] = useState([]);
    const [listenAgain, setListenAgain] = useState([]);
    const [search, setSearch] = useState('');
    const [nowPlaying, setNowPlaying] = useState(null);
    const [playlist, setPlaylist] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

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

    const handlePlay = (song) => setNowPlaying(song);

    const handleAddToPlaylist = (song) => setPlaylist((prev) => [...prev, song]);

    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleProfileMenuClose = () => setAnchorEl(null);

    const handleNavigateToProfile = () => {
        setAnchorEl(null);
        navigate('/profile');
    };

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
                                <Typography variant="body2" color="textSecondary">{song.artist}</Typography>
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

                {/* Middle Column */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>Playlist</Typography>
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
                        <Typography variant="h6"></Typography>
                        <List>
                            {playlist.map((song, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={song.title} secondary={`${song.artist} • ${song.album}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Playlist;
