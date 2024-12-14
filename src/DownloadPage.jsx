import React, { useEffect, useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Paper,
    Grid,
    Button,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Snackbar,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    LinearProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Download, PlayArrow, Pause } from '@mui/icons-material';
import api from './services/api';

const DownloadPage = () => {
    const [downloads, setDownloads] = useState([]);
    const [search, setSearch] = useState('');
    const [nowPlaying, setNowPlaying] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [audio, setAudio] = useState(null);
    const [downloadProgress, setDownloadProgress] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDownloads = async () => {
            try {
                const response = await api.get('/downloads');
                setDownloads(response.data);
            } catch (error) {
                console.error('Error fetching downloads:', error);
            }
        };
        fetchDownloads();
    }, []);

    const handlePlayPause = (item) => {
        if (nowPlaying?.id === item.id) {
            audio.paused ? audio.play() : audio.pause();
        } else {
            if (audio) audio.pause();
            const newAudio = new Audio(item.url);
            setAudio(newAudio);
            newAudio.play();
            setNowPlaying(item);
        }
    };

    const handleDownload = (item) => {
        const url = item.url;
        const link = document.createElement('a');
        link.href = url;
        link.download = url.split('/').pop();
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        xhr.onprogress = (event) => {
            if (event.lengthComputable) {
                const progress = Math.round((event.loaded / event.total) * 100);
                setDownloadProgress((prev) => ({ ...prev, [item.id]: progress }));
            }
        };
        xhr.onload = () => {
            const blob = new Blob([xhr.response]);
            const downloadUrl = URL.createObjectURL(blob);
            link.href = downloadUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setSnackbarMessage('Download completed');
            setSnackbarOpen(true);
            setDownloadProgress((prev) => ({ ...prev, [item.id]: 100 }));
        };
        xhr.send();
        setSnackbarMessage('Download started...');
        setSnackbarOpen(true);
    };

    const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleProfileMenuClose = () => setAnchorEl(null);
    const handleNavigateToProfile = () => { setAnchorEl(null); navigate('/profile'); };
    const handleSnackbarClose = () => setSnackbarOpen(false);

    const filteredDownloads = downloads.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.artist.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container maxWidth="xl" sx={{ mt: 4 }}>
            <AppBar position="static" sx={{ mb: 4, backgroundColor: '#007AFF' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Download Page</Typography>
                    <TextField
                        variant="outlined"
                        placeholder="Search for downloads"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ backgroundColor: 'white', borderRadius: '4px' }}
                    />
                    <IconButton onClick={handleProfileMenuOpen}>
                        <Avatar src="/static/images/avatar/1.jpg" alt="Profile" />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileMenuClose}>
                        <MenuItem onClick={handleNavigateToProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
                        <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom>Available Downloads</Typography>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        {filteredDownloads.length === 0 ? (
                            <Typography variant="h6" align="center">No downloads available</Typography>
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
                                    {filteredDownloads.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.artist}</TableCell>
                                            <TableCell>{item.album}</TableCell>
                                            <TableCell>{item.year}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Button
                                                        onClick={() => handlePlayPause(item)}
                                                        variant="contained"
                                                        color="primary"
                                                        startIcon={nowPlaying?.id === item.id ? <Pause /> : <PlayArrow />}
                                                    >
                                                        {nowPlaying?.id === item.id ? 'Pause' : 'Play'}
                                                    </Button>
                                                    <Tooltip title="Download">
                                                        <Button
                                                            onClick={() => handleDownload(item)}
                                                            variant="contained"
                                                            color="secondary"
                                                            startIcon={<Download />}
                                                        >
                                                            Download
                                                        </Button>
                                                    </Tooltip>
                                                </Box>
                                                {downloadProgress[item.id] !== undefined && (
                                                    <Box sx={{ width: '100%', mt: 1 }}>
                                                        {downloadProgress[item.id] < 100 && (
                                                            <LinearProgress variant="determinate" value={downloadProgress[item.id]} />
                                                        )}
                                                    </Box>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />

            {nowPlaying && (
                <Box mt={4} display="flex" justifyContent="center">
                    <audio controls src={nowPlaying.url}>
                        Your browser does not support the audio element.
                    </audio>
                </Box>
            )}
        </Container>
    );
};

export default DownloadPage;
