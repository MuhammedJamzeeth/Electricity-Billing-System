import React, { useState } from 'react';
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
    <Dialog open={Boolean(consumer)} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogContent>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center', mb: 2 }}>
          Edit Consumer Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Contact Number"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="dense"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Meter No"
              name="meterNo"
              value={formData.meterNo}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="dense"
              label="Join Date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
              type="date"
              fullWidth
              variant="outlined"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="dense" variant="outlined" size="small">
              <InputLabel>Phase</InputLabel>
              <Select
                name="phase"
                value={formData.phase}
                onChange={handleChange}
                label="Phase"
              >
                <MenuItem value="1-Phase">1-Phase</MenuItem>
                <MenuItem value="3-Phase">3-Phase</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', padding: '16px' }}>
        <Button onClick={onCancel} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditConsumerForm;
