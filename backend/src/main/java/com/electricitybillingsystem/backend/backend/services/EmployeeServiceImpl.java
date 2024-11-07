package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.models.Employee;
import com.electricitybillingsystem.backend.backend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee updateEmployee(Integer emp_Id, Employee employeeDetails) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(emp_Id);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            employee.setEmpName(employeeDetails.getEmpName());
            employee.setBranch(employeeDetails.getBranch());
            employee.setAddress(employeeDetails.getAddress());
            return employeeRepository.save(employee);
        } else {
            throw new RuntimeException("Employee not found with ID: " + emp_Id);
        }
    }

    @Override
    public void deleteEmployee(Integer emp_Id) {
        employeeRepository.deleteById(emp_Id);
    }

    //employee count in dashboard
    @Override
    public long getEmployeeCount() {
        return employeeRepository.countEmployees();
    }
}
