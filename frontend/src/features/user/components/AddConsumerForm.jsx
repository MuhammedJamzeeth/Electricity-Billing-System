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
  IconButton,
} from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const AddConsumerForm = ({ open, onClose, onAdd, refreshTable }) => {
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
  const [fieldValidations, setFieldValidations] = useState({
    accountNo: false,
    email: false,
    contact_number: false,
  });

  useEffect(() => {
    if (open) {
      fetchNextConsumerId();
      resetForm();
    }
  }, [open]);

  const fetchNextConsumerId = async () => {
    try {
      const response = await axios.get('http://localhost:8081/consumers');
      if (response.status === 200 && Array.isArray(response.data)) {
        const nextId = response.data.length + 1;
        setFormData((prevData) => ({ ...prevData, id: nextId }));
      }
    } catch (error) {
      console.error('Error fetching consumer ID:', error);
      toast.error('Failed to fetch consumer ID. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Validate fields dynamically
    if (name === 'accountNo') validateAccountNo(value);
    if (name === 'email') validateEmail(value);
    if (name === 'contact_number') validateContactNumber(value);
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
    setFieldValidations({
      accountNo: false,
      email: false,
      contact_number: false,
    });
  };

  const validateAccountNo = (value) => {
    const isValid = /^\d{10}$/.test(value); // Check for 10 digits
    setFieldValidations((prev) => ({ ...prev, accountNo: isValid }));
    return isValid;
  };

  const validateEmail = (value) => {
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value); // Simple email regex
    setFieldValidations((prev) => ({ ...prev, email: isValid }));
    return isValid;
  };

  const validateContactNumber = (value) => {
    const isValid = /^\+94-\d{2}-\d{3}-\d{4}$/.test(value); // Match format +94-##-###-####
    setFieldValidations((prev) => ({ ...prev, contact_number: isValid }));
    return isValid;
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
      const response = await axios.post('http://localhost:8081/consumers/add', formData);
      if (response.status === 200 || response.status === 201) {
        onAdd(response.data);
        toast.success('Consumer added successfully!');
        resetForm();
        refreshTable();
        onClose();
      } else {
        throw new Error('Invalid response data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to add consumer. Please try again.');
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Consumer</DialogTitle>
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
              InputProps={{
                endAdornment: fieldValidations.accountNo ? <CheckCircleIcon sx={{ color: 'green' }} /> : <ErrorIcon sx={{ color: 'red' }} />,
              }}
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
              InputProps={{
                endAdornment: fieldValidations.email ? <CheckCircleIcon sx={{ color: 'green' }} /> : <ErrorIcon sx={{ color: 'red' }} />,
              }}
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
              InputProps={{
                endAdornment: fieldValidations.contact_number ? <CheckCircleIcon sx={{ color: 'green' }} /> : <ErrorIcon sx={{ color: 'red' }} />,
              }}
            />
            <DialogActions>
              <Button onClick={onClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Add Consumer
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default AddConsumerForm;
