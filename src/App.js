import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import UserList from './UserList';
import PrivateRoute from './PrivateRoute';
import Register from './Register';
import Contact from './Contact';
import ForgotPassword from './ForgotPassword'; // Import ForgotPassword component
import ResetPassword from './ResetPassword'; // Import ResetPassword component
import MusicDashboard from './MusicDashboard'; // Import the MusicDashboard component
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
                <Route path="/music-dashboard" element={<MusicDashboard />} /> {/* Add the music dashboard route */}
                <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add the forgot password route */}
                <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Add the reset password route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
