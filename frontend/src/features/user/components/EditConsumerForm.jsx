import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Typography
} from '@mui/material';
import { toast } from 'react-toastify';
import useUsers from '../hooks/useUsers';

function EditConsumerForm({ consumer, onCancel }) {
  const { updateUser } = useUsers();
  const user = JSON.parse(localStorage.getItem('user'))
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact_number: '',
    address: '',
    meterNo: '',
    joinDate: '',
    phase: '1-Phase',
    branch: ''
  });

  useEffect(() => {
    if (consumer) {
      setFormData({
        firstName: consumer.firstName || '',
        lastName: consumer.lastName || '',
        email: consumer.email || '',
        contact_number: consumer.contact_number || '',
        address: consumer.address || '',
        meterNo: consumer.meterNo || '',
        joinDate: consumer.joinDate || '',
        phase: consumer.phase || '1-Phase',
        branch: user.userID || ''
      });
    }
  }, [consumer]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'contact_number', 'address', 'meterNo', 'branch'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill out the ${field.replace('_', ' ')} field.`);
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const updatedConsumer = {
        ...formData  // This includes firstName, lastName, email, contact_number, address, meterNo, joinDate, phase, and branch
      };
  
      const response = await updateUser(consumer.accountNo, updatedConsumer);
      
      if (response && (response.status === 200 || response.status === 201 || response === true)) {
        toast.success('Consumer details updated successfully!');
        onCancel();
      } else {
        throw new Error('Unexpected response');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Failed to update consumer details');
    }
  };

  return (
    <Dialog open={Boolean(consumer)} onClose={onCancel}>
      <DialogContent>
        <Typography variant="h6" gutterBottom>Edit Consumer Details</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contact Number"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Meter No"
              name="meterNo"
              value={formData.meterNo}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Phase</InputLabel>
              <Select
                name="phase"
                value={formData.phase}
                onChange={handleChange}
              >
                <MenuItem value="1-Phase">1-Phase</MenuItem>
                <MenuItem value="3-Phase">3-Phase</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="secondary">Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditConsumerForm;
