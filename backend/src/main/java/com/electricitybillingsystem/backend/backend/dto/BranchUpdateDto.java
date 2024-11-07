package com.electricitybillingsystem.backend.backend.dto;

import jakarta.validation.constraints.Null;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BranchUpdateDto {
    private String branchName;

    private String location;

    @Null
    private String password;

    private String contactNo;
}
