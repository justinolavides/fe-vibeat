import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, TextField, Paper, Table, TableBody, TableCell, TableHead, TableRow, Avatar, Grid, Button, AvatarGroup } from '@mui/material';
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
        <Container>
            {/* Greeting and Search Bar */}
            <Box mb={3}>
                <Typography variant="h4" gutterBottom>Good Afternoon!</Typography>
                <TextField
                    label="Search for songs"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>

            <Grid container spacing={3}>
                {/* Left Column */}
                <Grid item xs={12} md={3}>
                    <Box mb={3}>
                        <Typography variant="h6">Top Charts</Typography>
                        {topCharts.map(song => (
                            <Paper key={song.id} elevation={2} sx={{ p: 2, mb: 1 }}>
                                <Typography variant="body1">{song.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{song.artist}</Typography>
                            </Paper>
                        ))}
                    </Box>

                    <Box mb={3}>
                        <Typography variant="h6">Listen Again</Typography>
                        {listenAgain.map(song => (
                            <Paper key={song.id} elevation={2} sx={{ p: 2, mb: 1 }}>
                                <Typography variant="body1">{song.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{song.artist}</Typography>
                            </Paper>
                        ))}
                    </Box>

                    <Box mb={3}>
                        <Typography variant="h6">My Friends</Typography>
                        <AvatarGroup max={4}>
                            {/* Replace with actual friend avatars */}
                            <Avatar src="/static/images/avatar/1.jpg" />
                            <Avatar src="/static/images/avatar/2.jpg" />
                            <Avatar src="/static/images/avatar/3.jpg" />
                            <Avatar src="/static/images/avatar/4.jpg" />
                        </AvatarGroup>
                    </Box>

                    <Box mb={3}>
                        <Typography variant="h6">Favorite Artists</Typography>
                        <AvatarGroup max={4}>
                            {/* Replace with actual artist avatars */}
                            <Avatar src="/static/images/avatar/1.jpg" />
                            <Avatar src="/static/images/avatar/2.jpg" />
                            <Avatar src="/static/images/avatar/3.jpg" />
                            <Avatar src="/static/images/avatar/4.jpg" />
                        </AvatarGroup>
                    </Box>
                </Grid>

                {/* Middle Column */}
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" gutterBottom>Music List</Typography>
                    <Paper>
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
                                            <Button onClick={() => handlePlay(song)} variant="contained" color="primary">Play</Button>
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
                            <Paper elevation={2} sx={{ p: 2 }}>
                                <Typography variant="body1">{nowPlaying.title}</Typography>
                                <Typography variant="body2" color="textSecondary">{nowPlaying.artist}</Typography>
                                {/* Add more details and controls as needed */}
                            </Paper>
                        </Box>
                    )}

                    <Box mb={3}>
                        <Typography variant="h6">Next Up</Typography>
                        {/* Add logic to show queued songs */}
                        <Paper elevation={2} sx={{ p: 2 }}>
                            <Typography variant="body1">La Mama de La Mama</Typography>
                            <Typography variant="body2" color="textSecondary">El Alfa</Typography>
                        </Paper>
                    </Box>

                    <Box mb={3}>
                        <Typography variant="h6">Connection Status</Typography>
                        <Typography variant="body2" color="textSecondary">Connected</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MusicDashboard;
