import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Paper, Table, TableBody, TableCell, TableHead, TableRow, Avatar, Grid, Button, AvatarGroup, AppBar, Toolbar, List, ListItem, ListItemText, Divider } from '@mui/material';
import api from './services/api'; // Import your axios instance

const MusicDashboard = () => {
    const [music, setMusic] = useState([]);
    const [topCharts, setTopCharts] = useState([]);
    const [listenAgain, setListenAgain] = useState([]);
    const [search, setSearch] = useState('');
    const [nowPlaying, setNowPlaying] = useState(null);

    useEffect(() => {
        const fetchMusic = async () => {
            try {
                const response = await api.get('/music');
                setMusic(response.data);
            } catch (error) {
                console.error("Error fetching music:", error);
            }
        };

        const fetchTopCharts = async () => {
            try {
                const response = await api.get('/top-charts');
                setTopCharts(response.data);
            } catch (error) {
                console.error("Error fetching top charts:", error);
            }
        };

        const fetchListenAgain = async () => {
            try {
                const response = await api.get('/listen-again');
                setListenAgain(response.data);
            } catch (error) {
                console.error("Error fetching listen again songs:", error);
            }
        };

        fetchMusic();
        fetchTopCharts();
        fetchListenAgain();
    }, []);

    const handlePlay = (song) => {
        setNowPlaying(song);
    };

    const filteredMusic = music.filter(song =>
        song.title.toLowerCase().includes(search.toLowerCase()) ||
        song.artist.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            {/* Left Sidebar */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={2}>
                    <List>
                        <ListItem button>
                            <ListItemText primary="Discover" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Speaker" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Albums" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Browse" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Themes" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Playlist" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Account" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Library" />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary="Settings" />
                        </ListItem>
                    </List>
                </Grid>

                {/* Main Section */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>Discover</Typography>
                    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                        <Typography variant="h6">Begin your Career To Become a Killer Product Designer</Typography>
                        <Typography variant="body2" color="textSecondary">by Esther Howard</Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>Listen Now</Button>
                    </Paper>

                    <Typography variant="h5" gutterBottom>Top Episode</Typography>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        {filteredMusic.map((song) => (
                            <Box key={song.id} mb={2}>
                                <Typography variant="body1">{song.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{song.artist}</Typography>
                                <Button variant="contained" color="primary" onClick={() => handlePlay(song)} sx={{ mt: 1 }}>Listen now</Button>
                            </Box>
                        ))}
                    </Paper>
                </Grid>

                {/* Right Sidebar */}
                <Grid item xs={12} md={4}>
                    <Box mb={3}>
                        <Typography variant="h6">Quick Search</Typography>
                        <TextField
                            variant="outlined"
                            placeholder="Search for songs"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            fullWidth
                            sx={{ mb: 2 }}
                        />
                    </Box>

                    <Box mb={3}>
                        <Typography variant="h6">Favorite Playlist</Typography>
                        <List>
                            {listenAgain.map(song => (
                                <ListItem key={song.id}>
                                    <ListItemText primary={song.title} secondary={`${song.artist} • ${song.album}`} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {nowPlaying && (
                        <Box mb={3}>
                            <Typography variant="h6">Currently Playing</Typography>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Typography variant="body1">{nowPlaying.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{nowPlaying.artist}</Typography>
                                {/* Add more details and controls as needed */}
                            </Paper>
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default MusicDashboard;
