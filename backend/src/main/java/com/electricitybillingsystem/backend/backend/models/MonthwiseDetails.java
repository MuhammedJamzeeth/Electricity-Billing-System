package com.electricitybillingsystem.backend.backend.models;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class MonthwiseDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Use IDENTITY for auto-increment
    private Long mId; // Changed to Long for auto-increment

    @Column(nullable = false)
    private String accountNo;

    private String crntDate;
    private String crntUnit;
    private String monthBill;
    //private String billStatus; //to identify the redbill or not
}
