package com.electricitybillingsystem.backend.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BranchAddRequestDto {

    @NotBlank(message = "branch name can not be empty")
    private String branchName;

    @NotBlank(message = "location can not be empty")
    private String location;

    @NotBlank(message = "password can not be empty")
    private String password;

    @NotBlank(message = "contact number can not be empty")
    private String contactNo;
}
