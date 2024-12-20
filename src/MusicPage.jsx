        import React, { useState, useEffect } from 'react';
        import {
            Container, AppBar, Toolbar, Typography, Grid, Paper, Button, IconButton, Box, Menu, MenuItem, Avatar, Slider, List, ListItem, ListItemText, TextField
        } from '@mui/material';
        import { PlayArrow, Pause, VolumeUp, MoreVert } from '@mui/icons-material';

        const mockMusicList = [
            { id: 1, title: 'Sample A', artist: 'Artist 1', album: 'Album 1', year: '2023', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', image: 'https://robohash.org/:random.png' },
            { id: 2, title: 'Sample B', artist: 'Artist 2', album: 'Album 2', year: '2023', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', image: 'https://robohash.org/musicnote5.png' },
            { id: 3, title: 'Sample C', artist: 'Artist 3', album: 'Album 3', year: '2023', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', image: 'https://robohash.org/guitar6.png' },
        ];

        const MusicPage = () => {
            const [musicList, setMusicList] = useState(mockMusicList);
            const [nowPlaying, setNowPlaying] = useState(null);
            const [audio, setAudio] = useState(null);
            const [progress, setProgress] = useState(0);
            const [volume, setVolume] = useState(30);
            const [menuAnchorEl, setMenuAnchorEl] = useState(null);
            const [selectedSong, setSelectedSong] = useState(null);
            const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null); // New state for the profile menu
            const [searchQuery, setSearchQuery] = useState('');

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

            const handleMenuOpen = (event, song) => {
                setMenuAnchorEl(event.currentTarget);
                setSelectedSong(song);
            };

            const handleMenuClose = () => {
                setMenuAnchorEl(null);
                setSelectedSong(null);
            };

            const handleProfileMenuOpen = (event) => setProfileMenuAnchorEl(event.currentTarget); // Open profile menu
            const handleProfileMenuClose = () => setProfileMenuAnchorEl(null); // Close profile menu

            const handleSearchChange = (event) => setSearchQuery(event.target.value);

            const filteredMusicList = musicList.filter(
                (song) => song.title.toLowerCase().includes(searchQuery.toLowerCase()) || song.artist.toLowerCase().includes(searchQuery.toLowerCase())
            );

            return (
                <Container maxWidth="xl" sx={{ mt: 4 }}>
                    {/* Header */}
                    <AppBar position="static" sx={{ mb: 3, backgroundColor: '#1c1c1e' }}>
                        <Toolbar>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                Music
                            </Typography>
                            <TextField
                                variant="outlined"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                sx={{ backgroundColor: 'white', borderRadius: 1, width: 200 }}
                            />
                            <IconButton onClick={handleProfileMenuOpen}>
                                <Avatar src="/static/images/avatar/1.jpg" />
                            </IconButton>

                            {/* Profile Menu */}
                            <Menu
                                anchorEl={profileMenuAnchorEl}
                                open={Boolean(profileMenuAnchorEl)}
                                onClose={handleProfileMenuClose}
                            >
                                <MenuItem onClick={() => (window.location.href = 'http://localhost:3000/profile')}>Profile</MenuItem>
                                <MenuItem onClick={() => (window.location.href = 'http://localhost:3000/settings')}>Settings</MenuItem>
                                <MenuItem onClick={() => (window.location.href = 'http://localhost:3000/')}>Log Out</MenuItem>
                            </Menu>
                        </Toolbar>
                    </AppBar>

                    {/* Music Sections */}
                    <Grid container spacing={3}>
                        {/* Top Trending */}
                        <Grid item xs={12}>
                            <Typography variant="h5">Top Trending</Typography>
                            <List>
                                {filteredMusicList.map((song) => (
                                    <ListItem key={song.id} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={song.image} alt={song.title} width="50" height="50" style={{ marginRight: '1rem' }} />
                                        <ListItemText primary={song.title} secondary={`${song.artist} - ${song.album} (${song.year})`} />
                                        <IconButton onClick={(e) => handleMenuOpen(e, song)}><MoreVert /></IconButton>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={nowPlaying?.id === song.id && !audio?.paused ? <Pause /> : <PlayArrow />}
                                            onClick={() => handlePlayPause(song)}
                                        >
                                            {nowPlaying?.id === song.id && !audio?.paused ? 'Pause' : 'Play'}
                                        </Button>
                                        <Menu
                                            anchorEl={menuAnchorEl}
                                            open={Boolean(menuAnchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={() => console.log('Play next')}>Play Next</MenuItem>
                                            <MenuItem onClick={() => console.log('Add to playlist')}>Add to Playlist</MenuItem>
                                            <MenuItem onClick={() => console.log('Download')}>Download</MenuItem>
                                            <MenuItem onClick={() => console.log('Share')}>Share</MenuItem>
                                        </Menu>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                        {/* Recently Played */}
                        <Grid item xs={12}>
                            <Typography variant="h5">Recently Played</Typography>
                            <List>
                                {filteredMusicList.map((song) => (
                                    <ListItem key={song.id} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={song.image} alt={song.title} width="50" height="50" style={{ marginRight: '1rem' }} />
                                        <ListItemText primary={song.title} secondary={`${song.artist} - ${song.album} (${song.year})`} />
                                        <IconButton onClick={(e) => handleMenuOpen(e, song)}><MoreVert /></IconButton>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={nowPlaying?.id === song.id && !audio?.paused ? <Pause /> : <PlayArrow />}
                                            onClick={() => handlePlayPause(song)}
                                        >
                                            {nowPlaying?.id === song.id && !audio?.paused ? 'Pause' : 'Play'}
                                        </Button>
                                        <Menu
                                            anchorEl={menuAnchorEl}
                                            open={Boolean(menuAnchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={() => console.log('Play next')}>Play Next</MenuItem>
                                            <MenuItem onClick={() => console.log('Add to playlist')}>Add to Playlist</MenuItem>
                                            <MenuItem onClick={() => console.log('Download')}>Download</MenuItem>
                                            <MenuItem onClick={() => console.log('Share')}>Share</MenuItem>
                                        </Menu>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                        {/* Just For You */}
                        <Grid item xs={12}>
                            <Typography variant="h5">Just For You</Typography>
                            <List>
                                {filteredMusicList.map((song) => (
                                    <ListItem key={song.id} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={song.image} alt={song.title} width="50" height="50" style={{ marginRight: '1rem' }} />
                                        <ListItemText primary={song.title} secondary={`${song.artist} - ${song.album} (${song.year})`} />
                                        <IconButton onClick={(e) => handleMenuOpen(e, song)}><MoreVert /></IconButton>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={nowPlaying?.id === song.id && !audio?.paused ? <Pause /> : <PlayArrow />}
                                            onClick={() => handlePlayPause(song)}
                                        >
                                            {nowPlaying?.id === song.id && !audio?.paused ? 'Pause' : 'Play'}
                                        </Button>
                                        <Menu
                                            anchorEl={menuAnchorEl}
                                            open={Boolean(menuAnchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={() => console.log('Play next')}>Play Next</MenuItem>
                                            <MenuItem onClick={() => console.log('Add to playlist')}>Add to Playlist</MenuItem>
                                            <MenuItem onClick={() => console.log('Download')}>Download</MenuItem>
                                            <MenuItem onClick={() => console.log('Share')}>Share</MenuItem>
                                        </Menu>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>

                    {/* Music Player */}
                    <Paper elevation={3} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: 2, backgroundColor: '#1c1c1e', color: 'white' }}>
                        {nowPlaying ? (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <img src={nowPlaying.image} alt={nowPlaying.title} width="50" height="50" style={{ marginRight: '1rem' }} />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="subtitle1">{nowPlaying.title}</Typography>
                                    <Typography variant="subtitle2">{nowPlaying.artist}</Typography>
                                    <Slider value={progress} onChange={handleProgressChange} sx={{ color: 'white' }} />
                                </Box>
                                <IconButton onClick={() => handlePlayPause(nowPlaying)} sx={{ color: 'white' }}>
                                    {audio?.paused ? <PlayArrow /> : <Pause />}
                                </IconButton>
                                <Slider value={volume} onChange={handleVolumeChange} sx={{ width: '100px', color: 'white' }} />
                                <VolumeUp sx={{ marginLeft: 1 }} />
                            </Box>
                        ) : (
                            <Typography variant="subtitle1" align="center">No song playing</Typography>
                        )}
                    </Paper>
                </Container>
            );
        };

        export default MusicPage;
