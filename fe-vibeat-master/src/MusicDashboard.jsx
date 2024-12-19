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

<<<<<<< HEAD
    const handleNavigateToPlaylist = () => {
        navigate('/playlist', { state: { playlist } }); // Pass the playlist to the PlaylistPage
    };

    const filteredMusic = music.filter((song) =>
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase())
    );
=======
<<<<<<< HEAD
    const handleNavigateToPlaylist = () => {
        navigate('/playlist', { state: { playlist } }); // Pass the playlist to the PlaylistPage
    };

    const filteredMusic = music.filter((song) =>
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase())
    );
=======
    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setSelectedFile(null);
    };

    const handleRename = () => {
        // Logic to rename the selected file
        handleMenuClose();
    };

    const handleAddToPlaylist = () => {
        // Logic to add the selected file to a playlist
        handleMenuClose();
    };

    const handleAddToDownloads = () => {
        // Logic to add the selected file to downloads
        handleMenuClose();
    };

    const handleShare = () => {
        // Logic to share the selected file
        handleMenuClose();
    };

    const handleDelete = () => {
        setFiles(files.filter(file => file !== selectedFile));
        handleMenuClose();
    };

    const handlePlayNext = () => {
        // Logic to play the selected file next
        handleMenuClose();
    };

    // Format time into MM:SS
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Handle Shuffle Logic (placeholder)
    const handleShuffle = () => {
        console.log("Shuffle activated!");
    };

    // Handle Repeat Logic (placeholder)
    const handleRepeat = () => {
        console.log("Repeat activated!");
    };

    // Handle Next Song Logic (placeholder)
    const handleNext = () => {
        console.log("Next song!");
    };

    // Handle Previous Song Logic (placeholder)
    const handlePrevious = () => {
        console.log("Previous song!");
    };
>>>>>>> 3dddddbc5187c04c66aa86d81275a00e3eb2d757
>>>>>>> 5bf974d24858728b86eec7961ecdd000daf9e575

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            {/* Header */}
            <AppBar position="static" sx={{ mb: 4 }}>
                <Toolbar>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 5bf974d24858728b86eec7961ecdd000daf9e575
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
<<<<<<< HEAD
=======
=======
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Upload Music</Typography>
>>>>>>> 3dddddbc5187c04c66aa86d81275a00e3eb2d757
>>>>>>> 5bf974d24858728b86eec7961ecdd000daf9e575
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

<<<<<<< HEAD
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
=======
            {/* Now Playing Section */}
            {nowPlaying && (
                <Box mt={3}>
                    <Typography variant="h6" sx={{ mb: 1 }}>Now Playing</Typography>
                    <Paper elevation={3} sx={{
                        p: 3,
                        borderRadius: 2,
                        background: 'linear-gradient(to right, #e3f2fd, #f1f8e9)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center'
                    }}>
                        {/* Song Title and Info */}
                        <Typography variant="h6" gutterBottom>{nowPlaying.name}</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Uploaded by You</Typography>

                        {/* Playback Controls */}
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                            <IconButton onClick={() => handleShuffle()} color="primary" size="large">
                                <Shuffle />
                            </IconButton>
                            <IconButton onClick={() => handlePrevious()} color="primary" size="large">
                                <SkipPrevious />
                            </IconButton>
                            <IconButton onClick={() => handlePlayPause(nowPlaying)} color="primary" size="large">
                                {audio?.paused ? <PlayArrow fontSize="large" /> : <Pause fontSize="large" />}
                            </IconButton>
                            <IconButton onClick={() => handleNext()} color="primary" size="large">
                                <SkipNext />
                            </IconButton>
                            <IconButton onClick={() => handleRepeat()} color="primary" size="large">
                                <Repeat />
                            </IconButton>
                        </Box>

<<<<<<< HEAD
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
=======
                        {/* Progress Slider and Timers */}
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: 2 }}>
                            <Typography variant="caption" sx={{ mr: 1 }}>{formatTime(audio?.currentTime || 0)}</Typography>
                            <Slider
                                value={progress}
                                onChange={handleProgressChange}
                                sx={{ mx: 2, flex: 1 }}
                            />
                            <Typography variant="caption" sx={{ ml: 1 }}>{formatTime(audio?.duration || 0)}</Typography>
                        </Box>

                        {/* Volume Control */}
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '50%', mt: 1 }}>
                            <VolumeUp />
                            <Slider
                                value={volume}
                                onChange={handleVolumeChange}
                                sx={{ mx: 2 }}
                            />
                        </Box>
                    </Paper>
                </Box>
            )}
>>>>>>> 3dddddbc5187c04c66aa86d81275a00e3eb2d757
>>>>>>> 5bf974d24858728b86eec7961ecdd000daf9e575
        </Container>
    );
};

export default MusicDashboard;
