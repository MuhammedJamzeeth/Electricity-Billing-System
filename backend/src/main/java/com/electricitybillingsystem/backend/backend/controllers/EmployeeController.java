package com.electricitybillingsystem.backend.backend.controllers;

import com.electricitybillingsystem.backend.backend.models.Employee;
import com.electricitybillingsystem.backend.backend.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/employees")
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PostMapping("/employees/add")
    public Employee createEmployee(@RequestBody Employee employee) {
        return employeeService.createEmployee(employee);
    }



    @PutMapping("/employees/update/{empId}")
    public Employee updateEmployee(@PathVariable Integer empId, @RequestBody Employee employee) {
        return employeeService.updateEmployee(empId, employee);
    }

    @DeleteMapping("/employees/delete/{empId}")
    public void deleteEmployee(@PathVariable Integer empId) {
        employeeService.deleteEmployee(empId);
    }

    //empployee count in dashboard
    @GetMapping("/employees/count")
    public long getEmployeeCount() {
        return employeeService.getEmployeeCount();
    }


}
