<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6c28398 (Created main App component with routing)
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import UserList from './UserList';
import PrivateRoute from './PrivateRoute';
<<<<<<< HEAD
import Register from './Register'; // Import the registration component

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
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to login by default */}
            </Routes>
        </Router>
    );
=======
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
>>>>>>> 91111d9 (Initialize project using Create React App)
=======


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/users" element={
                    <PrivateRoute>
                        <UserList />
                    </PrivateRoute>
                } />
                <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login by default */}
            </Routes>
        </Router>
    );
>>>>>>> 6c28398 (Created main App component with routing)
}


export default App;
