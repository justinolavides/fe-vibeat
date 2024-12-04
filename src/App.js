import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import UserList from './UserList';
import PrivateRoute from './PrivateRoute';
import Register from './Register'; // Import the registration component
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} /> {/* Add the registration route */}
                <Route path="/users" element={
                    <PrivateRoute>
                        <UserList />
                    </PrivateRoute>
                } />
                <Route path="/contact" element={<Contact />} /> {/* Add the contact route */}
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to login by default */}
            </Routes>
        </Router>
    );
}

export default App;
