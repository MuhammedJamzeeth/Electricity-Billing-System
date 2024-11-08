package com.electricitybillingsystem.backend.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Entity
@RequiredArgsConstructor
@Getter
@Setter
public class Consumer {


    @Id
    private Long accountNo;

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Column(nullable = false, unique = true)
    private Long meterNo;

    @Column(nullable = false)
    private Timestamp joinDate;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(nullable = false, length = 15)
    private String phase;

    @Column(nullable = false)
    private String contact_number ;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "branch_id", referencedColumnName = "branch_id")
    private Branch branch;

    //added by siyam
//    @JsonManagedReference
//    @OneToMany(mappedBy = "consumer", cascade = CascadeType.ALL,orphanRemoval = true)
//    private List<Payment> payments;

    //added by siyam
    @JsonManagedReference
    @OneToMany(mappedBy = "consumer", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<EBill> eBills;



}
