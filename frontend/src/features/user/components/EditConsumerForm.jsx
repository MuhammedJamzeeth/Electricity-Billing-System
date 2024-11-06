import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { toast } from 'react-toastify';
import useUsers from '../hooks/useUsers';

function EditConsumerForm({ consumer, onCancel }) {
  const { updateUser } = useUsers(); 
  const [formData, setFormData] = useState({
    firstName: consumer.firstName || '',
    lastName: consumer.lastName || '',
    email: consumer.email || '',
    contact_number: consumer.contact_number || '',
    address: consumer.address || '',
    meterNo: consumer.meterNo || '',
    joinDate: consumer.joinDate || '',
    phase: ['1-Phase', '3-Phase'].includes(consumer.phase) ? consumer.phase : '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const updatedConsumer = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        contact_number: formData.contact_number,
        address: formData.address,
        meterNo: formData.meterNo,
        joinDate: formData.joinDate,
        phase: formData.phase,
      };

      const response = await updateUser(consumer.accountNo, updatedConsumer);
      if (response) {
        toast.success('Consumer details updated successfully!');
        onCancel(); 
      } else {
        toast.error('Failed to update consumer. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred while updating the consumer.');
    }
  };

  return (
    <Dialog open={Boolean(consumer)} onClose={onCancel}>
      <DialogContent>
        <TextField
          margin="dense"
          label="First Name"
          name="firstName"
          value={formData.firstName || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Last Name"
          name="lastName"
          value={formData.lastName || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={formData.email || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Contact Number"
          name="contact_number"
          value={formData.contact_number || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Address"
          name="address"
          value={formData.address || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Meter No"
          name="meterNo"
          value={formData.meterNo || ''}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Join Date"
          name="joinDate"
          value={formData.joinDate || ''}
          onChange={handleChange}
          fullWidth
        />

        {/* Phase Dropdown */}
        <FormControl fullWidth margin="dense">
          <InputLabel>Phase</InputLabel>
          <Select
            name="phase"
            value={formData.phase || ''}
            onChange={handleChange}
            label="Phase"
          >
            <MenuItem value="1-Phase">1-Phase</MenuItem>
            <MenuItem value="3-Phase">3-Phase</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditConsumerForm;
