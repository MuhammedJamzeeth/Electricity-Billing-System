import { useState, useEffect } from 'react';
import axios from 'axios';

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (user.username.toLowerCase() !== "admin") {
          const response = await axios.get(`http://localhost:8081/consumers/branch/${user.userID}`);
          if (response.status === 200) {
            setUsers(response.data);
          } else {
            console.error('Failed to fetch users:', response.statusText);
          }
        }else {
          const response = await axios.get(`http://localhost:8081/consumers`);
          if (response.status === 200) {
            setUsers(response.data);
          } else {
            console.error('Failed to fetch users:', response.statusText);
          }
        }

      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const addConsumer = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8081/consumers/add', formData);
      if (response.status === 201) {
        setUsers((prevUsers) => [...prevUsers, response.data]);
        return response.data;
      }
    } catch (error) {
      console.error('Error adding consumer:', error);
    }
  };

  const deleteUser = async (accountNo) => {
    try {
      const response = await axios.delete(`http://localhost:8081/consumers/delete/${accountNo}`);
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.accountNo !== accountNo));
      }
    } catch (error) {
      console.error('Error deleting consumer:', error);
    }
  };

  const updateUser = async (accountNo, updatedConsumer) => {
    try {
      const response = await axios.put(`http://localhost:8081/consumers/update/${accountNo}`, updatedConsumer);
      return response;
    } catch (error) {
      console.error("Error updating consumer:", error);
      throw error;
    }
  };
  

  return { users, loading, error, addConsumer, deleteUser, updateUser };
}

export default useUsers;
