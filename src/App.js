import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import UserList from './UserList';
import PrivateRoute from './PrivateRoute';
<<<<<<< HEAD
import Register from './Register'; // Import the registration component
import logo from './logo.svg';
import Contact from './Contact';
import './App.css';
=======
import Register from './Register';
import Contact from './Contact'; 
import ForgotPassword from './ForgotPassword'; // Import the forgot password component
import ResetPassword from './ResetPassword'; // Import the reset password component
>>>>>>> ResetPassword

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
<<<<<<< HEAD
                <Route path="/register" element={<Register />} /> {/* Add the registration route */}
=======
                <Route path="/register" element={<Register />} /> 
                <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add the forgot password route */}
                <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Add the reset password route */}
>>>>>>> ResetPassword
                <Route path="/users" element={
                    <PrivateRoute>
                        <UserList />
                    </PrivateRoute>
                } />
<<<<<<< HEAD
                <Route path="/contact" element={<Contact />} /> {/* Add the contact route */}
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to login by default */}
=======
                <Route path="/contact" element={<Contact />} /> 
                <Route path="*" element={<Navigate to="/" />} /> 
>>>>>>> ResetPassword
            </Routes>
        </Router>
    );
}

export default App;
