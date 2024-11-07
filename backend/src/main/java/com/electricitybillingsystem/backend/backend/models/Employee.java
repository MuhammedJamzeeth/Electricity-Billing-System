package com.electricitybillingsystem.backend.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@RequiredArgsConstructor
@Getter
@Setter
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer empId;

    @Column(nullable = false, length = 100)
    private String empName;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "branch_Id", nullable = false)
    private Branch branch;  // Assuming Branch is another entity mapped to branch table

    @JsonProperty("branchId")
    public void setBranchId(Integer branchId) {
        if (branchId != null) {
            Branch branch = new Branch();
            branch.setBranchId(branchId);
            this.branch = branch;
        }
    }

    @Column(length = 255)
    private String address;

    @Column(length = 15)
    private String contactNo;

}
