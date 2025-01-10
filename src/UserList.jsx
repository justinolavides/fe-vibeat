import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Pagination, CircularProgress, Typography, TextField, IconButton, Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, MenuItem, Select, FormControl, InputLabel, AppBar, Toolbar } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Sort as SortIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from './services/api'; // Import the centralized Axios instance

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);  
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [sortField, setSortField] = useState('name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [pageSize, setPageSize] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/users?page=${currentPage}&search=${searchTerm}&sort=${sortField}&direction=${sortDirection}&pageSize=${pageSize}`);
                setUsers(response.data.data);  
                setFilteredUsers(response.data.data);
                setTotalPages(response.data.last_page); 
                setError('');  
            } catch (error) {
                console.error("Error fetching users:", error);
                setError('Error fetching users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [currentPage, searchTerm, sortField, sortDirection, pageSize]);

    useEffect(() => {
        const results = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredUsers(results);
    }, [searchTerm, users]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value); 
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleDeleteClick = (id) => {
        setUserIdToDelete(id);
        setConfirmDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        setConfirmDialogOpen(false);
        try {
            const response = await api.delete(`/users/${userIdToDelete}`);
            if (response.status === 200) {
                setUsers(users.filter(user => user.id !== userIdToDelete));
                setFilteredUsers(filteredUsers.filter(user => user.id !== userIdToDelete));
                setSnackbarMessage('User deleted successfully');
            } else {
                setSnackbarMessage('Error deleting user');
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            setSnackbarMessage('Error deleting user');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleDialogClose = () => {
        setConfirmDialogOpen(false);
    };

    const handleSort = (field) => {
        const isAsc = sortField === field && sortDirection === 'asc';
        setSortDirection(isAsc ? 'desc' : 'asc');
        setSortField(field);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        navigate('/login'); // Redirect to login page
    };

    return (
        <Container>
            <AppBar position="static" style={{ marginBottom: '20px' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Admin Management
                    </Typography>
                    <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Typography variant="h4" gutterBottom>User Accounts</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="Search Users"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: '20px' }}
            />
            <FormControl variant="outlined" style={{ marginBottom: '20px', minWidth: 120 }}>
                <InputLabel>Page Size</InputLabel>
                <Select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    label="Page Size"
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
            </FormControl>
            <Paper>
                {loading ? (
                    <CircularProgress style={{ display: 'block', margin: '20px auto' }} />
                ) : (
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID <IconButton onClick={() => handleSort('id')}><SortIcon /></IconButton></TableCell>
                                <TableCell>Name <IconButton onClick={() => handleSort('name')}><SortIcon /></IconButton></TableCell>
                                <TableCell>Email <IconButton onClick={() => handleSort('email')}><SortIcon /></IconButton></TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <IconButton color="primary">
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="secondary" onClick={() => handleDeleteClick(user.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No users found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </Paper>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />

        </Container>
    );
};

export default UserList;
