package com.electricitybillingsystem.backend.backend.repositories;

import com.electricitybillingsystem.backend.backend.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

    //employee count in dashboard
    @Query(value = "SELECT COUNT(*) FROM employee", nativeQuery = true)
    long countEmployees();
}
