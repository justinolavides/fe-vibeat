import React, { useState, useEffect } from 'react';   
import {   
  Container, AppBar, Toolbar, Typography, Grid, Paper, Button, IconButton, Box, Menu, MenuItem, Avatar, Slider, List, ListItem, ListItemText, TextField   
} from '@mui/material';   
import { PlayArrow, Pause, VolumeUp, MoreVert } from '@mui/icons-material';   
   
const mockMusicList = [   
   { id: 6, title: 'She Knows', artist: 'J. Cole & Lost Panda', url: 'https://www.youtube.com/watch?v=E2L6NxLf3ic' },  
   { id: 5, title: 'APT.', artist: 'BrunoMars & Rose', url: 'https://www.youtube.com/watch?v=i_SsnRdgitA' },  
   { id: 7, title: 'Bury the Light', artist: 'Casey Edwards', url: 'https://www.youtube.com/watch?v=pvy9km7g6fw' },  
];   
   
const MusicPage = () => {   
  const [musicList, setMusicList] = useState(mockMusicList);   
  const [nowPlaying, setNowPlaying] = useState(null);   
  const [audio, setAudio] = useState(null);   
  const [progress, setProgress] = useState(0);   
  const [volume, setVolume] = useState(30);   
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);   
  const [selectedSong, setSelectedSong] = useState(null);   
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);   
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
    if (song.url.includes('youtube.com')) {  
      setNowPlaying(song);  
    } else {  
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
   
  const handleProfileMenuOpen = (event) => setProfileMenuAnchorEl(event.currentTarget);   
  const handleProfileMenuClose = () => setProfileMenuAnchorEl(null);   
   
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
        <Grid item xs={12} md={8}>   
          <Typography variant="h5">Top Trending</Typography>   
          <List>   
           {filteredMusicList.map((song) => (   
             <ListItem key={song.id} sx={{ display: 'flex', alignItems: 'center' }}>   
               <img src={song.image} alt={song.title} width="50" height="50" style={{ marginRight: '1rem' }} />   
               <ListItemText primary={song.title} secondary={`$${song.artist} -$$ {song.album} (${song.year})`} />   
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
   
        {/* Now Playing */}   
        <Grid item xs={12} md={4}>   
          <Box>   
           <Typography variant="h6">Now Playing</Typography>   
           {nowPlaying ? (   
             <Paper elevation={3} sx={{ p: 2, mb: 2, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>   
               <Typography variant="h6">{nowPlaying.title}</Typography>   
               <Typography variant="body2" color="textSecondary">{nowPlaying.artist}</Typography>   
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
                 <Slider value={progress} onChange={handleProgressChange} sx={{ width: '100%' }} />   
               )}   
             </Paper>   
           ) : (   
             <Typography>No song is playing.</Typography>   
           )}   
          </Box>   
        </Grid>   
      </Grid>   
   
      {/* Recently Played */}   
      <Grid container spacing={3}>   
        <Grid item xs={12} md={8}>   
          <Typography variant="h5">Recently Played</Typography>   
          <List>   
           {filteredMusicList.map((song) => (   
             <ListItem key={song.id} sx={{ display: 'flex', alignItems: 'center' }}>   
               <img src={song.image} alt={song.title} width="50" height="50" style={{ marginRight: '1rem' }} />   
               <ListItemText primary={song.title} secondary={`$${song.artist} -$$ {song.album} (${song.year})`} />   
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
        <Grid item xs={12} md={4}>   
          <Box>   
           <Typography variant="h6">Just For You</Typography>   
           {filteredMusicList.map((song) => (   
             <Paper key={song.id} elevation={2} sx={{ p: 2, mb: 1 }}>   
               <Typography variant="body1">{song.title}</Typography>   
               <Typography variant="body2" color="textSecondary">{song.artist}</Typography>   
               <Button   
                variant="contained"   
                color="primary"   
                startIcon={nowPlaying?.id === song.id && !audio?.paused ? <Pause /> : <PlayArrow />}   
                onClick={() => handlePlayPause(song)}   
               >   
                {nowPlaying?.id === song.id && !audio?.paused ? 'Pause' : 'Play'}   
               </Button>   
             </Paper>   
           ))}   
          </Box>   
        </Grid>   
      </Grid>   
   
      {/* Music Player Controls */}   
      <Paper elevation={3} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: 2, backgroundColor: '#1c1c1e', color: 'white' }}>   
        {nowPlaying ? (   
          <Box sx={{ display: 'flex', alignItems: 'center' }}>   
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
