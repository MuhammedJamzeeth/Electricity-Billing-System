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

const AddConsumerForm = ({ open, onClose, onAdd, refreshTable }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const generateAccountNumber = () => {
    return '765' + Math.floor(1000000 + Math.random() * 9000000);
  };

  const [formData, setFormData] = useState({
    accountNo: '',
    firstName: '',
    lastName: '',
    email: '',
    meterNo: '',
    joinDate: '',
    address: '',
    phase: '',
    contact_number: '',
    branchId: user.userID,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isValid, setIsValid] = useState({
    accountNo: true,
    email: true,
    contact_number: true,
  });

 
  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'accountNo') validateAccountNo(value);
    else if (name === 'email') validateEmail(value);
    else if (name === 'contact_number') validateContactNumber(value);
  };

  const resetForm = () => {
    setFormData({
      accountNo: generateAccountNumber(), 
      firstName: '',
      lastName: '',
      email: '',
      meterNo: '',
      joinDate: '',
      address: '',
      phase: '',
      contact_number: '',
      branchId: user.userID || '',
    });
    setFormErrors({});
    setIsValid({
      accountNo: true,
      email: true,
      contact_number: true,
    });
  };

  const validateAccountNo = async (value) => {
  
    const isValidAccount = /^[0-9]{10}$/.test(value);
    setIsValid((prev) => ({ ...prev, accountNo: isValidAccount }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      accountNo: isValidAccount ? '' : 'Account number must be 10 digits',
    }));

    if (isValidAccount) {
      
      try {
        const response = await axios.get(`http://localhost:8081/consumers/check-account/${value}`);
        if (!response.data.isUnique) {
          setIsValid((prev) => ({ ...prev, accountNo: false }));
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            accountNo: 'Account number already exists',
          }));
        }
      } catch (error) {
        console.error('Error checking account number uniqueness:', error);
      }
    }
  };

  const validateEmail = (value) => {
    const isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,}$/.test(value);
    setIsValid((prev) => ({ ...prev, email: isValidEmail }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      email: isValidEmail ? '' : 'Enter a valid email',
    }));
  };

  const validateContactNumber = (value) => {
    const isValidContact = /^07\d{8}$/.test(value); 
    setIsValid((prev) => ({ ...prev, contact_number: isValidContact }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      contact_number: isValidContact ? '' : 'Contact number must start with 070 and be 10 digits',
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.accountNo) errors.accountNo = 'Account number is required';
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.meterNo) errors.meterNo = 'Meter number is required';
    if (!formData.address) errors.address = 'Address is required';
    if (!formData.phase) errors.phase = 'Phase selection is required';
    if (!formData.contact_number) errors.contact_number = 'Contact number is required';
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
              error={!isValid.accountNo}
              helperText={formErrors.accountNo}
              value={formData.accountNo}
              onChange={handleInputChange}
              placeholder="Account number is auto-generated"
              disabled 
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
              placeholder="Enter first name"
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
              placeholder="Enter last name"
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              error={!isValid.email}
              helperText={formErrors.email}
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter a valid email"
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
              placeholder="Enter meter number"
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
              placeholder="Enter address"
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
                <MenuItem value="1-Phase">1-Phase</MenuItem>
                <MenuItem value="3-Phase">3-Phase</MenuItem>
              </Select>
              <FormHelperText>{formErrors.phase}</FormHelperText>
            </FormControl>
            <TextField
              margin="dense"
              name="contact_number"
              label="Contact No"
              type="text"
              fullWidth
              error={!isValid.contact_number}
              helperText={formErrors.contact_number}
              value={formData.contact_number}
              onChange={handleInputChange}
              placeholder="Enter contact number"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default AddConsumerForm;
