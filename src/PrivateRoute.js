import React from 'react';
import { Navigate } from 'react-router-dom';

<<<<<<< HEAD
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('auth_token');
    
    return token ? children : <Navigate to="/" />;
};

=======

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('auth_token');


    return token ? children : <Navigate to="/login" />;
};


>>>>>>> fcf4cbb (Created Private Route for User list)
export default PrivateRoute;
