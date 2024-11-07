import React, { useState } from 'react';
import { Button, TextField, InputAdornment, IconButton, CircularProgress, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import UserTable from '../../features/user/components/UserTable.jsx';
import AddConsumerForm from '../../features/user/components/AddConsumerForm.jsx';

function User() {
  const [searchTerm, setSearchTerm] = useState('');
  const [consumerData, setConsumerData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      setLoading(true);
      try {
        const response = await axios.get(`/consumers/search/${searchTerm.trim()}`);
        setConsumerData(response.data);
      } catch (error) {
        console.error('Error fetching consumer:', error);
      } finally {
        setLoading(false);
      }
    }
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
     

      <div className="p-4 bg-gray-50 rounded-lg shadow-lg flex justify-end mb-4 spa">
      <div style={{ marginBottom: '16px'}}>
        <TextField
          placeholder="Search by Account No."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      {loading && <CircularProgress />}

      {consumerData ? (
        <div>
          <Typography variant="h6">Consumer Details:</Typography>
          <pre>{JSON.stringify(consumerData, null, 2)}</pre>
        </div>
      ) : null}
        <Button variant="contained" color="primary" onClick={handleOpenForm}>
          Add User
        </Button>
      </div>

      <UserTable searchTerm={searchTerm} />

      <AddConsumerForm open={formOpen} onClose={handleCloseForm} onAdd={handleAddConsumer} />
    </div>
  );
}

export default User;
