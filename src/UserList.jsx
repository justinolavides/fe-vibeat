import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Pagination } from '@mui/material';
import api from './services/api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users?page=${currentPage}');
                console.log("API Response:", response.data); // Log the response data

                // Ensure the data format is correct and set state
                if (response.data && response.data.data) {
                    setUsers(response.data.data);
                    setTotalPages(response.data.last_page);
                } else {
                    setUsers([]);
                    setTotalPages(1);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                setUsers([]);
                setTotalPages(1);
            }
        };

        fetchUsers();
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <Container>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4}>No users found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
            <Pagination 
                count={totalPages} 
                page={currentPage} 
                onChange={handlePageChange} 
                color="primary" 
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />
        </Container>
    );
};

export default UserList;
