import React, { useState } from 'react';
import { Button, TextField, InputAdornment, IconButton, CircularProgress, Typography, Grid, Box } from '@mui/material';
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
      <Grid container spacing={2} alignItems="flex-end">
        {/* Search Box */}
        <Grid item xs={8} sm={4}>
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
        </Grid>

        <Grid item xs={4} sm={7.5} textAlign="end">
          <Button variant="contained" color="primary" onClick={handleOpenForm}>
            Add User
          </Button>
        </Grid>
      </Grid>

      {loading && <CircularProgress />}

      {consumerData ? (
        <div>
          <Typography variant="h6">Consumer Details:</Typography>
          <pre>{JSON.stringify(consumerData, null, 2)}</pre>
        </div>
      ) : null}

      <Box mt={3}>
        <UserTable searchTerm={searchTerm} />
      </Box>

      <AddConsumerForm open={formOpen} onClose={handleCloseForm} onAdd={handleAddConsumer} />
    </div>
  );
}

export default User;
