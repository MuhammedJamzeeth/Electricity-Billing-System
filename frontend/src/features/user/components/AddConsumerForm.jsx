import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddConsumerForm = ({ open, onClose, onAdd, refreshTable, consumerData }) => {
  const [formData, setFormData] = useState({
    id: '',
    accountNo: '',
    firstName: '',
    lastName: '',
    email: '',
    meterNo: '',
    joinDate: '',
    address: '',
    phase: '',
    contact_number: '',
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (consumerData) {
      setFormData(consumerData); // Populate form with existing consumer data for update
    } else {
      // Reset the form for adding a new consumer
      resetForm();
    }
  }, [consumerData, open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      id: '',
      accountNo: '',
      firstName: '',
      lastName: '',
      email: '',
      meterNo: '',
      joinDate: '',
      address: '',
      phase: '',
      contact_number: '',
    });
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.accountNo) errors.accountNo = 'Account number is required.';
    if (!formData.firstName) errors.firstName = 'First name is required.';
    if (!formData.lastName) errors.lastName = 'Last name is required.';
    if (!formData.email) errors.email = 'Email is required.';
    if (!formData.meterNo) errors.meterNo = 'Meter number is required.';
    if (!formData.joinDate) errors.joinDate = 'Join date is required.';
    if (!formData.address) errors.address = 'Address is required.';
    if (!formData.phase) errors.phase = 'Phase is required.';
    if (!formData.contact_number) errors.contact_number = 'Contact number is required.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      let response;

      if (formData.id) {
        // Update existing consumer
        response = await axios.put(`http://localhost:8081/consumers/update/${formData.id}`, formData);
      } else {
        // Add new consumer
        const consumersResponse = await axios.get('http://localhost:8081/consumers');
        const consumers = consumersResponse.data;
        const newId = consumers.length > 0 ? Math.max(...consumers.map(c => c.id)) + 1 : 1;

        const newConsumerData = { ...formData, id: newId };
        response = await axios.post('http://localhost:8081/consumers/add', newConsumerData);
      }

      console.log("Form data being sent:", formData);
      console.log("API Response:", response.data);

      if (response.status === 200 || response.status === 201) {
        onAdd(response.data);
        toast.success('Consumer saved successfully!');
        resetForm(); // Reset form after successful submission
        refreshTable(); // Refresh the table to show the updated data
        onClose(); // Close the dialog
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to save consumer. Please try again.');
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{formData.id ? 'Update Consumer' : 'Add Consumer'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              name="accountNo"
              label="Account No"
              type="text"
              fullWidth
              error={!!formErrors.accountNo}
              helperText={formErrors.accountNo}
              value={formData.accountNo}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              error={!!formErrors.lastName}
              helperText={formErrors.lastName}
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              error={!!formErrors.email}
              helperText={formErrors.email}
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="meterNo"
              label="Meter No"
              type="text"
              fullWidth
              error={!!formErrors.meterNo}
              helperText={formErrors.meterNo}
              value={formData.meterNo}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="joinDate"
              label="Join Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!formErrors.joinDate}
              helperText={formErrors.joinDate}
              value={formData.joinDate}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="address"
              label="Address"
              type="text"
              fullWidth
              error={!!formErrors.address}
              helperText={formErrors.address}
              value={formData.address}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="dense" error={!!formErrors.phase}>
              <InputLabel id="phase-select-label">Phase</InputLabel>
              <Select
                labelId="phase-select-label"
                name="phase"
                value={formData.phase}
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="1 Phase">1-Phase</MenuItem>
                <MenuItem value="3 Phase">3-Phase</MenuItem>
              </Select>
              <FormHelperText>{formErrors.phase}</FormHelperText>
            </FormControl>
            <TextField
              margin="dense"
              name="contact_number"
              label="Contact Number"
              type="text"
              fullWidth
              error={!!formErrors.contact_number}
              helperText={formErrors.contact_number}
              value={formData.contact_number}
              onChange={handleInputChange}
            />
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" color="primary">{formData.id ? 'Update' : 'Add'}</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick draggable pauseOnHover />
    </>
  );
};

export default AddConsumerForm;