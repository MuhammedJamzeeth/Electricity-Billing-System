import React, { useState } from 'react';
import { Button } from '@mui/material';
import useUsers from '../../features/user/hooks/useUsers.jsx';
import UserTable from '../../features/user/components/UserTable.jsx';
import AddConsumerForm from '../../features/user/components/AddConsumerForm.jsx'; // Import the form component

function User() {
  const users = useUsers();
  
  // State to manage the form visibility
  const [formOpen, setFormOpen] = useState(false);

  const handleEdit = (user) => {
    console.log('Edit user:', user);
  };

  const handleDelete = (userId) => {
    console.log('Delete user with ID:', userId);
  };

  const handleOpenForm = () => {
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
  };

  const handleAddConsumer = (newConsumer) => {
    console.log('New consumer data:', newConsumer);
    handleCloseForm();
  };

  return (
    <div className="mt-4">
      <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Consumer Details</h2>
          <Button variant="contained" color="primary" onClick={handleOpenForm}>
            Add User
          </Button>
        </div>
      </div>
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <AddConsumerForm 
        open={formOpen} 
        onClose={handleCloseForm} 
        onAdd={handleAddConsumer} 
      />
    </div>
  );
}

export default User;
