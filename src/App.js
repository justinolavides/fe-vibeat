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
import Settings from './Settings'; // Import the Settings component
import Playlist from './Playlist'; // Import Playlist component
import './App.css';

/**
 * The main App component, which wraps the entire application in a Router
 * component. Handles state for the user's profile data, and provides a
 * function to update this data. Renders different routes based on the URL
 * path, including the login, register, admin, contact, music dashboard,
 * profile, settings, playlist, forgot password, and reset password pages.
 */
function App() {
    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        bio: '',
        avatar: '/static/images/avatar/1.jpg',
    });

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
                <Route path="/playlist" element={<Playlist />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
