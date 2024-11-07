package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.models.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> getAllEmployees();
    Employee createEmployee(Employee employee);
    Employee updateEmployee(Integer empId, Employee employeeDetails);
    void deleteEmployee(Integer empId);

    //employee count in dashboard
    long getEmployeeCount();

}
