import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  CircularProgress,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import EditConsumerForm from './EditConsumerForm';
import useUsers from '../hooks/useUsers';

function UserTable({ searchTerm }) {
  const { users, loading, error, deleteUser } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedConsumer, setSelectedConsumer] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [consumerToDelete, setConsumerToDelete] = useState(null);

  // Ensure users data is being set properly
  useEffect(() => {
    if (users) {
      // Filter users based on the search term
      if (searchTerm) {
        setFilteredUsers(
          users.filter((user) =>
            user.accountNo.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      } else {
        setFilteredUsers(users); // Set all users if no search term
      }
    }
  }, [users, searchTerm]);

  const handleDeleteClick = (consumer) => {
    setConsumerToDelete(consumer);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(consumerToDelete.accountNo);
      toast.success('Consumer deleted successfully!');
      setOpenDeleteDialog(false);
      setConsumerToDelete(null);
    } catch (error) {
      toast.error('Failed to delete consumer');
      setOpenDeleteDialog(false);
      setConsumerToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
    setConsumerToDelete(null);
  };

  const handleEditClick = (consumer) => {
    setSelectedConsumer(consumer);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedConsumer(null);
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        Error fetching users: {error.message}
      </Typography>
    );
  }

  return (
    <div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer component={Paper} sx={{ maxHeight: '600px', overflowY: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center">Id</TableCell>
                <TableCell align="center">Account No</TableCell>
                <TableCell align="center">Full Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Meter No</TableCell>
                <TableCell align="center">Join Date</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Phase</TableCell>
                <TableCell align="center">Contact Number</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {filteredUsers.map((user) => (
                <TableRow key={user.accountNo} hover>
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell align="center">{user.accountNo}</TableCell>
                  <TableCell align="center">{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.meterNo}</TableCell>
                  <TableCell align="center">
                    {new Date(user.joinDate).toLocaleDateString('en-GB')}
                  </TableCell>
                  <TableCell align="center">{user.address}</TableCell>
                  <TableCell align="center">{user.phase}</TableCell>
                  <TableCell align="center">{user.contact_number}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEditClick(user)}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDeleteClick(user)} sx={{ color: 'red' }}>
                      <DeleteForeverOutlinedIcon sx={{ color: 'inherit' }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <EditConsumerForm consumer={selectedConsumer} onCancel={handleCloseEditDialog} />

      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this consumer?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="secondary">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="primary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserTable;
