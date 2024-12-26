import React, { useState, useEffect, useRef } from 'react';   
import {   
  Container,  Box,  Typography,  Button,  AppBar  ,Toolbar,  IconButton,  Avatar,  Menu,  MenuItem,  TextField,Grid,  Paper,  Table,  TableBody,  TableCell,  TableHead,  TableRow,  CircularProgress,  Drawer,  ListItemIcon,  List,ListItem ,ListItemText, Slider,   
} from '@mui/material';   
import {   
  Home,   
  LibraryMusic,   
  PlaylistPlay,  CloudDownload,  Settings,  Notifications as NotificationsIcon,  Upload as UploadIcon,  Add as AddIcon, PlayArrow, Pause, VolumeUp,   
} from '@mui/icons-material';   
import { useNavigate } from 'react-router-dom';   
import api from './services/api'; // Your axios instance   
   
const mockMusic = [   
  { id: 5, title: 'Slay', artist: 'YouTube Artist', url: 'https://www.youtube.com/watch?v=qlzcHe_gusE', image: 'https://img.youtube.com/vi/qlzcHe_gusE/0.jpg' },
  {id:2, title: 'Me marry', artist: 'YouTube Artist', url: 'https://www.youtube.com/watch?v=QEMDL7bljbw', image: 'https://img.youtube.com/vi/qlzcHe_gusE/0.jpg' },   
];   
   
const randomSongs = [   
   { id: 4, title: 'Making Love Out of Nothing at All', artist: 'Air Supply', url: 'https://www.youtube.com/watch?v=pdRVD0OJg3c' },  
   { id: 5, title: 'APT.', artist: 'BrunoMars & Rose', url: 'https://www.youtube.com/watch?v=i_SsnRdgitA' },  
   { id: 6, title: 'BoB Nothin On You', artist: ' Bruno Mars Lyrics Bruno Mars Jason Mraz', url: 'https://www.youtube.com/watch?v=-5heGER5xwc' },  
   { id: 7, title: 'Together', artist: 'Ne-Yo ', url: 'https://www.youtube.com/watch?v=DEhLOH7sitA' },  
   { id: 8, title: 'Marry Me', artist: 'Jason Derulo', url: 'https://www.youtube.com/watch?v=QEMDL7bljbw' },  
   { id: 8, title: 'Sunshine in My Pocket', artist: 'The Vibes', url: 'https://www.youtube.com/watch?v=jHTa6Uj9q8Q&list=RDjHTa6Uj9q8Q&start_radio=1' },  
    
    
  
];   
   
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
   
const MusicList = ({ songs, onPlayPause, nowPlaying, isPlaying }) => (   
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
          <TableCell>{song.album || 'Unknown Album'}</TableCell>   
          <TableCell>{song.year || 'Unknown Year'}</TableCell>   
          <TableCell>   
           <Button   
             onClick={() => onPlayPause(song)}   
             variant="contained"   
             color="primary"   
             startIcon={nowPlaying?.id === song.id ? <Pause /> : <PlayArrow />}   
           >   
             {nowPlaying?.id === song.id ? 'Pause' : 'Play'}   
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
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);   
  const [isPlaying, setIsPlaying] = useState(false);   
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);   
  const [menuSong, setMenuSong] = useState(null);   
  const [audio, setAudio] = useState(null);   
  const [progress, setProgress] = useState(0);   
  const [volume, setVolume] = useState(30);   
   
  const audioRef = useRef(null);   
  const navigate = useNavigate();   
   
  const { data: music, loading: loadingMusic } = useFetchData('/music');   
  const { data: topCharts, loading: loadingTopCharts } = useFetchData('/top-charts');   
   
  useEffect(() => {   
    localStorage.setItem('playlist', JSON.stringify(playlist));   
  }, [playlist]);   
   
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
    if (song.url.includes('youtube.com')) {   
      setNowPlaying(song);   
    } else {   
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
    }   
  };   
   
  const handleAddToPlaylist = (song) => {   
    if (!playlist.some((s) => s.id === song.id)) {   
      setPlaylist([...playlist, song]);   
    }   
  };   
   
  const handleMenuOpen = (event, song) => {   
    setMenuAnchorEl(event.currentTarget);   
    setMenuSong(song);   
  };   
   
  const handleMenuClose = () => {   
    setMenuAnchorEl(null);   
    setMenuSong(null);   
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
   
  const handleNotificationClick = (event) => {   
    setNotificationsAnchorEl(event.currentTarget);   
  };   
   
  const handleNotificationsClose = () => {   
    setNotificationsAnchorEl(null);   
  };   
   
  const handleUploadMusic = () => {   
    navigate('/upload');   
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
   
  const filteredMusic = [...music, ...randomSongs].filter((song) =>   
    song.title.toLowerCase().includes(search.toLowerCase()) ||   
    song.artist.toLowerCase().includes(search.toLowerCase())   
  );   
   
  return (   
    <Container maxWidth="xl" sx={{ mt: 4 }}>   
      <Drawer   
        variant="permanent"   
        sx={{   
          width: 240,   
          flexShrink: 0,   
          '& .MuiDrawer-paper': {   
           width: 240,   
           boxSizing: 'border-box',   
          },   
        }}   
      >   
        <Toolbar />   
        <Box sx={{ overflow: 'auto' }}>   
          <List>   
           {['Home', 'Music', 'Playlist', 'Download', 'Settings'].map((text, index) => {   
             const icons = [   
               <Home />,   
               <LibraryMusic />,   
               <PlaylistPlay />,   
               <CloudDownload />,   
               <Settings />,   
             ];   
   
             const handleNavigation = () => {   
               if (text === 'Home') {   
                navigate('/music-dashboard');   
               } else if (text === 'Download') {   
                window.location.href = 'http://localhost:3000/downloads';   
               } else {   
                navigate(`/${text.toLowerCase()}`);   
               }   
             };   
   
             return (   
               <ListItem button key={text} onClick={handleNavigation}>   
                <ListItemIcon>{icons[index]}</ListItemIcon>   
                <ListItemText primary={text} />   
               </ListItem>   
             );   
           })}   
          </List>   
        </Box>   
      </Drawer>   
   
      <AppBar position="static" sx={{ mb: 4 }}>   
        <Toolbar>   
          <Typography variant="h6" sx={{ flexGrow: 1 }}>   
           ViBeat   
          </Typography>   
          <IconButton onClick={handleUploadMusic} sx={{ mr: 2 }}>   
           <UploadIcon sx={{ color: 'white' }} />   
          </IconButton>   
          <IconButton onClick={handleNotificationClick} sx={{ mr: 2 }}>   
           <NotificationsIcon sx={{ color: 'white' }} />   
          </IconButton>   
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
           <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>   
           <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>   
           <MenuItem onClick={handleLogout}>Log Out</MenuItem>   
          </Menu>   
   
          <Menu   
           anchorEl={notificationsAnchorEl}   
           open={Boolean(notificationsAnchorEl)}   
           onClose={handleNotificationsClose}   
          >   
           <MenuItem>   
             <ListItemText primary="Welcome to ViBeat!" />   
           </MenuItem>   
           <MenuItem>   
             <ListItemText primary="Explore new features." />   
           </MenuItem>   
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
                  onClick={() => handlePlayPause(song)}   
                  variant="contained"   
                  color="primary"   
                  startIcon={nowPlaying?.id === song.id ? <Pause /> : <PlayArrow />}   
                  sx={{ mt: 1 }}   
                >   
                  {nowPlaying?.id === song.id ? 'Pause' : 'Play'}   
                </Button>   
                <IconButton   
                  onClick={(e) => handleMenuOpen(e, song)}   
                  sx={{   
                    ml: 1,   
                    border: '2px solid black',   
                    borderRadius: '4px',   
                    color: 'black',   
                    fontSize: '0.8rem',   
                    width: '32px',   
                    height: '32px',   
                  }}   
                >   
                  <AddIcon fontSize="small" />   
                </IconButton>   
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
               onPlayPause={handlePlayPause}   
               nowPlaying={nowPlaying}   
               isPlaying={isPlaying}   
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
               {nowPlaying.url.includes('youtube.com') ? (   
                <iframe   
                  width="100%"   
                  height="315"   
                  src={`https://www.youtube.com/embed/${nowPlaying.url.split('v=')[1]}`}   
                  frameBorder="0"   
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"   
                  allowFullScreen   
                />   
               ) : (   
                <audio ref={audioRef} controls style={{ width: '100%' }} src={nowPlaying.url} />   
               )}   
               <Slider   
                value={progress}   
                onChange={handleProgressChange}   
                sx={{ width: '100%' }}   
               />   
               <Slider   
                value={volume}   
                onChange={handleVolumeChange}   
                sx={{ width: '100%' }}   
               />   
             </Paper>   
           </Box>   
          )}   
   
          {/* First Top Trending Playlist */}   
          <Box mb={3}>   
           <Typography variant="h6">Top Charts</Typography>   
           {mockMusic.map((song) => (   
             <Paper key={song.id} elevation={2} sx={{ p: 2, mb: 1 }}>   
               <Typography variant="body1">{song.title}</Typography>   
               <Typography variant="body2" color="textSecondary">   
                {song.artist}   
               </Typography>   
               <Button   
                onClick={() => handlePlayPause(song)}   
                variant="contained"   
                color="primary"   
                startIcon={nowPlaying?.id === song.id ? <Pause /> : <PlayArrow />}   
                sx={{ mt: 1 }}   
               >   
                {nowPlaying?.id === song.id ? 'Pause' : 'Play'}   
               </Button>   
               <IconButton   
                onClick={(e) => handleMenuOpen(e, song)}   
                sx={{   
                  ml: 1,   
                  border: '2px solid black',   
                  borderRadius: '4px',   
                  color: 'black',   
                  fontSize: '0.8rem',   
                  width: '32px',   
                  height: '32px',   
                }}   
               >   
                <AddIcon fontSize="small" />   
               </IconButton>   
             </Paper>   
           ))}   
          </Box>   
   
          {/* Duplicate Top Trending Playlist */}   
          <Box mb={3}>   
           <Typography variant="h6">Recently Played</Typography>   
           {mockMusic.map((song) => (   
             <Paper key={song.id} elevation={2} sx={{ p: 2, mb: 1 }}>   
               <Typography variant="body1">{song.title}</Typography>   
               <Typography variant="body2" color="textSecondary">   
                {song.artist}   
               </Typography>   
               <Button   
                onClick={() => handlePlayPause(song)}   
                variant="contained"   
                color="primary"   
                startIcon={nowPlaying?.id === song.id ? <Pause /> : <PlayArrow />}   
                sx={{ mt: 1 }}   
               >   
                {nowPlaying?.id === song.id ? 'Pause' : 'Play'}   
               </Button>   
               <IconButton   
                onClick={(e) => handleMenuOpen(e, song)}   
                sx={{   
                  ml: 1,   
                  border: '2px solid black',   
                  borderRadius: '4px',   
                  color: 'black',   
                  fontSize: '0.8rem',   
                  width: '32px',   
                  height: '32px',   
                }}   
               >   
                <AddIcon fontSize="small" />   
               </IconButton>   
             </Paper>   
           ))}   
          </Box>   
        </Grid>   
      </Grid>   
   
      <Menu   
        anchorEl={menuAnchorEl}   
        open={Boolean(menuAnchorEl)}   
        onClose={handleMenuClose}   
      >   
        <MenuItem onClick={() => {   
          handleAddToPlaylist(menuSong);   
          handleMenuClose();   
        }}>Add to Playlist</MenuItem>   
        <MenuItem onClick={handleMenuClose}>Add to Download</MenuItem>   
      </Menu>   
    </Container>   
  );   
};   
export default MusicDashboard;
