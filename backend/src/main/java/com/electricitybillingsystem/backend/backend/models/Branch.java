package com.electricitybillingsystem.backend.backend.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "branch")
@Getter
@Setter
@RequiredArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Branch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "branch_Id")
    private Integer branchId;

    @Column(name = "branch_name", length = 100)
    private String branchName;

    @Column(name = "location", length = 200)
    private String location;

    @Column(name = "branch_username", length = 100)
    private String branchUsername;

    @Column(name = "contact_no", length = 20)
    private String contactNo;

    @Column(name = "password")
    private String password;

    @JsonManagedReference
    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Consumer> consumers;

    @JsonManagedReference
    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Employee> employees;


}

