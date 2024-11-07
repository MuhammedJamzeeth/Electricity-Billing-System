import React, { useState } from 'react';
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
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import useUsers from '../hooks/useUsers';
import { toast } from 'react-toastify';
import EditConsumerForm from './EditConsumerForm'; 

function UserTable() {
  const { users, loading, error, deleteUser } = useUsers();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deletingAccountNo, setDeletingAccountNo] = useState(null);
  const [editConsumer, setEditConsumer] = useState(null);

  const handleOpenConfirmation = () => {
    setConfirmDeleteOpen(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmDeleteOpen(false);
  };

  const handleDeleteClick = (accountNo) => {
    setDeletingAccountNo(accountNo);
    handleOpenConfirmation();
  };

  const handleDeleteConfirm = async () => {
    if (deletingAccountNo) {
      try {
        await deleteUser(deletingAccountNo);
        toast.success('Consumer deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete consumer. Please try again.');
      } finally {
        handleCloseConfirmation();
        setDeletingAccountNo(null);
      }
    }
  };

  const handleEditClick = (consumer) => {
    setEditConsumer(consumer); 
  };

  const handleEditCancel = () => {
    setEditConsumer(null); 
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
            <TableHead  >
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
              {users.map((user) => (
                <TableRow key={user.accountNo} hover>
                  <TableCell align="center">{user.id}</TableCell>
                  <TableCell align="center">{user.accountNo}</TableCell>
                  <TableCell align="center">{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.meterNo}</TableCell>
                  <TableCell align="center">{user.joinDate}</TableCell>
                  <TableCell align="center">{user.address}</TableCell>
                  <TableCell align="center">{user.phase}</TableCell>
                  <TableCell align="center">{user.contact_number}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEditClick(user)}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDeleteClick(user.accountNo)} sx={{ color: 'red' }}>
                      <DeleteForeverOutlinedIcon sx={{ color: 'inherit' }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Dialog open={confirmDeleteOpen} onClose={handleCloseConfirmation}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this consumer? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {editConsumer && (
        <EditConsumerForm
          consumer={editConsumer}
          onCancel={handleEditCancel}
        />
      )}
    </div>
  );
}

export default UserTable;
