import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/not-authorized" />;
    }

    return children;
};

export default PrivateRoute;
