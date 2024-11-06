// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from 'react';
//
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   CircularProgress,
//   Typography, IconButton, Button,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import styles from './EmployeeTable.module.css';
// import DeleteIcon from '@mui/icons-material/Delete';
//
//
// const EmployeeTable = () => {
//   const [employees, setEmployees] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentEmployee, setCurrentEmployee] = useState({});
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [loading, setLoading] = useState(true);
//   //addemp
//   const [isAdding, setIsAdding] = useState(false); // New state for adding
//   const [newEmployee, setNewEmployee] = useState({ empId: '', empName: '', address: '', contactNo: '', branchId: '' });
//
//   // Fetch employees data
//   useEffect(() => {
//     fetch('http://localhost:8080/employees')
//         .then(response => response.json())
//         .then(data => {
//           setEmployees(data);
//           setLoading(false);
//         })
//         .catch(error => {
//           console.error('Error fetching employees:', error);
//           setLoading(false);
//         });
//   }, []);
//
//   // Open edit form with current employee data
//   const handleEditClick = (employee) => {
//     setCurrentEmployee(employee);
//     setIsEditing(true);
//   };
//
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentEmployee(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//
//   const handleUpdateEmployee = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/employees/update/${currentEmployee.empId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(currentEmployee),
//       });
//
//       if (!response.ok) throw new Error('Failed to update employee');
//
//       setEmployees(employees.map(emp => (emp.empId === currentEmployee.empId ? currentEmployee : emp)));
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating employee:', error);
//     }
//   };
//
//   const handleDeleteEmployee = async (empId) => {
//     try {
//       const response = await fetch(`http://localhost:8080/employees/delete/${empId}`, {
//         method: 'DELETE',
//       });
//
//       if (!response.ok) throw new Error('Failed to delete employee');
//
//       setEmployees(employees.filter(emp => emp.empId !== empId));
//     } catch (error) {
//       console.error('Error deleting employee:', error);
//     }
//   };
//
//
//
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
//
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//
//   if (loading) {
//     return (
//         <div className={styles.loadingContainer}>
//           <CircularProgress />
//         </div>
//     );
//   }
//
//   const handleNewInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewEmployee(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//
//   const handleAddEmployee = async () => {
//     try {
//       // Sending the branchId as part of the employee data
//       const response = await fetch('http://localhost:8080/employees/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           empName: newEmployee.empName,
//           address: newEmployee.address,
//           contactNo: newEmployee.contactNo,
//           branchId: parseInt(newEmployee.branchId, 2), // Ensure it's a number
//         }),
//       });
//
//       if (!response.ok) throw new Error('Failed to add employee');
//
//       const addedEmployee = await response.json();
//       setEmployees([...employees, addedEmployee]);
//       setIsAdding(false);
//       setNewEmployee({ empName: '', address: '', contactNo: '', branchId: '' });
//     } catch (error) {
//       console.error('Error adding employee:', error);
//     }
//   };
//
//
//
//
//   return (
//       <div className={styles.tableContainer}>
//         <Typography variant="h4" align="center" className={styles.title}>
//           Employee List
//         </Typography>
//         <Button
//             variant="contained"
//             style={{ backgroundColor: 'green', color: 'white', marginBottom: '16px' }}
//             onClick={() => setIsAdding(true)}
//         >
//           Add New Employee
//         </Button>
//         <Paper sx={{width: '100%', margin: '0 auto', overflow: 'hidden' }}>
//           <TableContainer sx={{ maxHeight: 500 }}>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="center" style={{ backgroundColor: 'lightblue' }}>Employee ID</TableCell>
//                   <TableCell align="center" style={{ backgroundColor: 'lightblue' }}>Name</TableCell>
//                   <TableCell align="center" style={{ backgroundColor: 'lightblue' }}>Address</TableCell>
//                   <TableCell align="center" style={{ backgroundColor: 'lightblue' }}>Contact NO</TableCell>
//                   <TableCell align="center" style={{ backgroundColor: 'lightblue' }}>Branch</TableCell>
//                   <TableCell align="center" style={{ backgroundColor: 'lightblue' }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {employees
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map(employee => (
//                         <TableRow key={employee.empId} hover>
//                           <TableCell align="center">{employee.empId}</TableCell>
//                           <TableCell align="center">{employee.empName}</TableCell>
//                           <TableCell align="center">{employee.address}</TableCell>
//                           <TableCell align="center">{employee.contactNo}</TableCell>
//                           <TableCell align="center">{employee.branch ? employee.branch.branchName : 'N/A'}</TableCell>
//                           <TableCell align="center">
//                             <IconButton
//                                 aria-label="edit"
//                                 onClick={() => handleEditClick(employee)} // Add click handler
//                             >
//                               <EditIcon />
//                             </IconButton>
//                             <IconButton
//                                 aria-label="delete"
//                                 onClick={() => handleDeleteEmployee(employee.empId)} // Add click handler
//                             >
//                               <DeleteIcon />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//               rowsPerPageOptions={[10, 25, 50]}
//               component="div"
//               count={employees.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//         {isAdding && (
//             <div className={styles.popup}>
//               <div className={styles.popupContent}>
//                 <h2>Add New Employee</h2>
//                 <label>
//                   Employee ID:
//                   <input
//                       type="text"
//                       name="empId"
//                       value={newEmployee.empId}
//                       onChange={handleNewInputChange}
//                   />
//                 </label>
//                 <label>
//                   Name:
//                   <input
//                       type="text"
//                       name="empName"
//                       value={newEmployee.empName}
//                       onChange={handleNewInputChange}
//                   />
//                 </label>
//                 <label>
//                   Address:
//                   <input
//                       type="text"
//                       name="address"
//                       value={newEmployee.address}
//                       onChange={handleNewInputChange}
//                   />
//                 </label>
//                 <label>
//                   Contact No:
//                   <input
//                       type="text"
//                       name="contactNo"
//                       value={newEmployee.contactNo}
//                       onChange={handleNewInputChange}
//                   />
//                 </label>
//                 <label>
//                   Branch ID:
//                   <input
//                       type="text"
//                       name="branchId"
//                       value={newEmployee.branchId}
//                       onChange={handleNewInputChange}
//                   />
//                 </label>
//                 <div className={styles.popupActions}>
//                   <button onClick={handleAddEmployee}>Save</button>
//                   <button onClick={() => setIsAdding(false)}>Cancel</button>
//                 </div>
//               </div>
//             </div>
//         )}
//
//
//         {isEditing && (
//             <div className={styles.popup}>
//               <div className={styles.popupContent}>
//                 <h2>Edit Employee</h2>
//                 <label>
//                   Name:
//                   <input
//                       type="text"
//                       name="empName"
//                       value={currentEmployee.empName}
//                       onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   Address:
//                   <input
//                       type="text"
//                       name="address"
//                       value={currentEmployee.address}
//                       onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   Contact No:
//                   <input
//                       type="text"
//                       name="contactNo"
//                       value={currentEmployee.contactNo}
//                       onChange={handleInputChange}
//                   />
//                 </label>
//                 <label>
//                   Branch Name:
//                   <input
//                       type="text"
//                       name="branch.branchName"
//                       value={currentEmployee.branch?.branchName || ''}
//                       disabled
//                   />
//                 </label>
//                 <div className={styles.popupActions}>
//                   <button onClick={handleUpdateEmployee}>Save</button>
//                   <button onClick={() => setIsEditing(false)}>Cancel</button>
//                 </div>
//               </div>
//             </div>
//         )}
//       </div>
//   );
// };
//
// export default EmployeeTable;
//


// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Typography, IconButton, Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import styles from './EmployeeTable.module.css';
import DeleteIcon from '@mui/icons-material/Delete';


const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  // Add employee form
  const [isAdding, setIsAdding] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ empId: '', empName: '', address: '', contactNo: '', branchId: '' });

  // Fetch employees data
  useEffect(() => {
    fetch('http://localhost:8080/employees')
        .then(response => response.json())
        .then(data => {
          setEmployees(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching employees:', error);
          setLoading(false);
        });
  }, []);

  // Open edit form with current employee data
  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:8080/employees/update/${currentEmployee.empId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentEmployee),
      });

      if (!response.ok) throw new Error('Failed to update employee');

      setEmployees(employees.map(emp => (emp.empId === currentEmployee.empId ? currentEmployee : emp)));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (empId) => {
    try {
      const response = await fetch(`http://localhost:8080/employees/delete/${empId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete employee');

      setEmployees(employees.filter(emp => emp.empId !== empId));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
        <div className={styles.loadingContainer}>
          <CircularProgress />
        </div>
    );
  }

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddEmployee = async () => {
    try {
      // Ensure that branchId is a valid number
      const response = await fetch('http://localhost:8080/employees/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          empName: newEmployee.empName,
          address: newEmployee.address,
          contactNo: newEmployee.contactNo,
          branchId: parseInt(newEmployee.branchId, 10), // Ensure it's a number
        }),
      });

      if (!response.ok) throw new Error('Failed to add employee');

      const addedEmployee = await response.json();
      setEmployees([...employees, addedEmployee]);
      setIsAdding(false);  // Close the form after adding
      setNewEmployee({ empId: '', empName: '', address: '', contactNo: '', branchId: '' }); // Reset the form
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
      <div className={styles.tableContainer}>
        <Typography variant="h4" align="center" className={styles.title}>
          Employee List
        </Typography>
        <Button
            variant="contained"
            style={{ backgroundColor: 'green', color: 'white', marginBottom: '16px' }}
            onClick={() => setIsAdding(true)}
        >
          Add New Employee
        </Button>
        <Paper sx={{width: '100%', margin: '0 auto', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ backgroundColor: 'lightblue' }}>Employee ID</TableCell>
                  <TableCell align="center" style={{ backgroundColor: 'lightblue' }}>Name</TableCell>
                  <TableCell align="center" style={{ backgroundColor: 'lightblue' }}>Address</TableCell>
                  <TableCell align="center" style={{ backgroundColor: 'lightblue' }}>Contact NO</TableCell>
                  <TableCell align="center" style={{ backgroundColor: 'lightblue' }}>Branch</TableCell>
                  <TableCell align="center" style={{ backgroundColor: 'lightblue' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(employee => (
                        <TableRow key={employee.empId} hover>
                          <TableCell align="center">{employee.empId}</TableCell>
                          <TableCell align="center">{employee.empName}</TableCell>
                          <TableCell align="center">{employee.address}</TableCell>
                          <TableCell align="center">{employee.contactNo}</TableCell>
                          <TableCell align="center">{employee.branch ? employee.branch.branchName : 'N/A'}</TableCell>
                          <TableCell align="center">
                            <IconButton
                                aria-label="edit"
                                onClick={() => handleEditClick(employee)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                                aria-label="delete"
                                onClick={() => handleDeleteEmployee(employee.empId)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={employees.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>



        {/* Add New Employee Form */}
        {isAdding && (
            <div className={styles.popup}>
              <div className={styles.popupContent}>
                <h2>Add New Employee</h2>
                <label>
                  Name:
                  <input
                      type="text"
                      name="empName"
                      value={newEmployee.empName}
                      onChange={handleNewInputChange}
                  />
                </label>
                <label>
                  Address:
                  <input
                      type="text"
                      name="address"
                      value={newEmployee.address}
                      onChange={handleNewInputChange}
                  />
                </label>
                <label>
                  Contact No:
                  <input
                      type="text"
                      name="contactNo"
                      value={newEmployee.contactNo}
                      onChange={handleNewInputChange}
                  />
                </label>
                <label>
                  Branch ID:
                  <input
                      type="text"
                      name="branchId"
                      value={newEmployee.branchId}
                      onChange={handleNewInputChange}
                  />
                </label>
                <div className={styles.popupActions}>
                  <button onClick={handleAddEmployee}>Save</button>
                  <button onClick={() => setIsAdding(false)}>Cancel</button>
                </div>
              </div>
            </div>
        )}

        {/* Edit Employee Form */}
        {isEditing && (
            <div className={styles.popup}>
              <div className={styles.popupContent}>
                <h2>Edit Employee</h2>
                <label>
                  Name:
                  <input
                      type="text"
                      name="empName"
                      value={currentEmployee.empName}
                      onChange={handleInputChange}
                  />
                </label>
                <label>
                  Address:
                  <input
                      type="text"
                      name="address"
                      value={currentEmployee.address}
                      onChange={handleInputChange}
                  />
                </label>
                <label>
                  Contact No:
                  <input
                      type="text"
                      name="contactNo"
                      value={currentEmployee.contactNo}
                      onChange={handleInputChange}
                  />
                </label>
                <div className={styles.popupActions}>
                  <button onClick={handleUpdateEmployee}>Save</button>
                  <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
};

export default EmployeeTable;
