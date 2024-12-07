import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import UserList from './UserList';
import PrivateRoute from './PrivateRoute';
import Register from './Register';
import Contact from './Contact'; 
import ForgotPassword from './ForgotPassword'; // Import the forgot password component
import ResetPassword from './ResetPassword'; // Import the reset password component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} /> 
                <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Add the forgot password route */}
                <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Add the reset password route */}
                <Route path="/users" element={
                    <PrivateRoute>
                        <UserList />
                    </PrivateRoute>
                } />
                <Route path="/contact" element={<Contact />} /> 
                <Route path="*" element={<Navigate to="/" />} /> 
            </Routes>
        </Router>
    );
}

export default App;
