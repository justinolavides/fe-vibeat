import React, { useState, useEffect } from 'react';
import {
    Container, AppBar, Toolbar, Typography, Grid, Box, Button, TextField, IconButton, Menu, MenuItem, Avatar, Paper, Slider
} from '@mui/material';
import { CloudUpload, PlayArrow, Pause, VolumeUp, MoreVert, PlaylistAdd, FileDownload, Delete, Edit, Share } from '@mui/icons-material';

const UploadMusic = () => {
    const [files, setFiles] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [nowPlaying, setNowPlaying] = useState(null);
    const [audio, setAudio] = useState(null);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(30);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

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

    const handleFileChange = (event) => {
        setFiles([...files, ...event.target.files]);
    };

    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleProfileMenuClose = () => setAnchorEl(null);

    const handleUpload = () => {
        // Handle the file upload logic here
        files.forEach(file => {
            console.log('Uploading:', file.name);
            // Add your upload logic here
        });
    };

    const handlePlayPause = (file) => {
        if (nowPlaying?.name === file.name) {
            audio.paused ? audio.play() : audio.pause();
        } else {
            if (audio) audio.pause();
            const newAudio = new Audio(URL.createObjectURL(file));
            newAudio.volume = volume / 100;
            newAudio.play().catch(() => console.error('Error playing audio.'));
            setAudio(newAudio);
            setNowPlaying(file);
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

    const handleMenuOpen = (event, file) => {
        setMenuAnchorEl(event.currentTarget);
        setSelectedFile(file);
    };

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

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            {/* Header */}
            <AppBar position="static" sx={{ mb: 3, backgroundColor: '#1c1c1e' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Upload Music</Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Search songs"
                        sx={{ backgroundColor: 'white', borderRadius: 1 }}
                        size="small"
                    />
                    <IconButton onClick={handleProfileMenuOpen}>
                        <Avatar src="/static/images/avatar/1.jpg" />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Upload Section */}
            <Paper elevation={3} sx={{
                p: 4, textAlign: 'center', background: 'linear-gradient(to right, #ff69b4, #ffcc00)', borderRadius: 2
            }}>
                <CloudUpload sx={{ fontSize: 50, color: '#007bff' }} />
                <Typography variant="h6" sx={{ mt: 2 }}>Drag and drop files to upload</Typography>
                <Typography variant="body2" color="textSecondary">Your music will be public until you publish them.</Typography>
                <input
                    type="file"
                    id="fileInput"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => document.getElementById('fileInput').click()}
                    sx={{ mt: 2 }}
                >
                    Select Files
                </Button>
                
            </Paper>

            {/* Display selected files */}
            {files.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h6">My Music Upload List</Typography>
                    {files.map((file, index) => (
                        <Paper
                            key={index}
                            elevation={3}
                            sx={{
                                display: 'flex', justifyContent: 'space-between',
                                alignItems: 'center', p: 2, mb: 2, borderRadius: 2,
                                background: 'linear-gradient(to right, #f9f9f9, #fff)',
                            }}
                        >
                            <Box>
                                <Typography variant="h6">{file.name}</Typography>
                                <Typography variant="body2" color="textSecondary">Uploaded by You</Typography>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={nowPlaying?.name === file.name && !audio?.paused ? <Pause /> : <PlayArrow />}
                                    onClick={() => handlePlayPause(file)}
                                    sx={{ mr: 1 }}
                                >
                                    {nowPlaying?.name === file.name && !audio?.paused ? 'Pause' : 'Play'}
                                </Button>
                                <IconButton onClick={(e) => handleMenuOpen(e, file)}>
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    anchorEl={menuAnchorEl}
                                    open={Boolean(menuAnchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleRename}><Edit /> Rename</MenuItem>
                                    <MenuItem onClick={handleAddToPlaylist}><PlaylistAdd /> Add to Playlist</MenuItem>
                                    <MenuItem onClick={handleAddToDownloads}><FileDownload /> Add to Downloads</MenuItem>
                                    <MenuItem onClick={handleShare}><Share /> Share</MenuItem>
                                    <MenuItem onClick={handleDelete}><Delete /> Delete</MenuItem>
                                    <MenuItem onClick={handlePlayNext}><PlayArrow /> Play Next</MenuItem>
                                </Menu>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            )}

            {/* Now Playing Section */}
            {nowPlaying && (
                <Box mt={3}>
                    <Typography variant="h6">Now Playing</Typography>
                    <Paper elevation={3} sx={{
                        p: 2, borderRadius: 2,
                        background: 'linear-gradient(to right, #e3f2fd, #f1f8e9)',
                    }}>
                        <Typography variant="h6" gutterBottom>{nowPlaying.name}</Typography>
                        <Typography variant="body2" color="textSecondary">Uploaded by You</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <IconButton onClick={() => handlePlayPause(nowPlaying)} color="primary">
                                {audio?.paused ? <PlayArrow /> : <Pause />}
                            </IconButton>
                            <Slider
                                value={progress}
                                onChange={handleProgressChange}
                                sx={{ mx: 2, flex: 1 }}
                            />
                            <VolumeUp />
                            <Slider
                                value={volume}
                                onChange={handleVolumeChange}
                                sx={{ width: 100, ml: 1 }}
                            />
                        </Box>
                    </Paper>
                </Box>
            )}
        </Container>
    );
};

export default UploadMusic;
