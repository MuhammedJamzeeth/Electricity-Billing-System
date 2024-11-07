package com.electricitybillingsystem.backend.backend.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class AddConsumerRequest {

    private Long accountNo;
    private String firstName;
    private String lastName;
    private String email;
    private Long meterNo;
    private Timestamp joinDate;
    private String address;
    private String phase;
    private String contact_number ;
    private Integer branchId;
}
