import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import UserList from './UserList';
import PrivateRoute from './PrivateRoute';
import Register from './Register';
import Contact from './Contact';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import MusicDashboard from './MusicDashboard';
import Profile from './Profile';
import Settings from './Settings';
import Playlist from './Playlist'; // Import Playlist component
import './App.css';

function App() {
    const [userProfile, setUserProfile] = useState({ name: '', email: '', bio: '', avatar: '/static/images/avatar/1.jpg' });

    // Function to update profile data
    const handleProfileUpdate = (updatedProfile) => {
        setUserProfile(updatedProfile);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={
                    <PrivateRoute>
                        <UserList />
                    </PrivateRoute>
                } />
                <Route path="/contact" element={<Contact />} />
                <Route path="/music-dashboard" element={<MusicDashboard userProfile={userProfile} />} />
                <Route path="/profile" element={<Profile onProfileUpdate={handleProfileUpdate} userProfile={userProfile} />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/playlist" element={<Playlist />} /> {/* Add the playlist route */}
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
