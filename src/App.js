import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import UserList from './UserList';
import PrivateRoute from './PrivateRoute';
import Register from './Register';
import Contact from './Contact';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import MusicDashboard from './MusicDashboard';
import Profile from './Profile'; // Import Profile component
import './App.css';

function App() {
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
                <Route path="/music-dashboard" element={<MusicDashboard />} />
                <Route path="/profile" element={<Profile />} /> {/* Add the profile route */}
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
