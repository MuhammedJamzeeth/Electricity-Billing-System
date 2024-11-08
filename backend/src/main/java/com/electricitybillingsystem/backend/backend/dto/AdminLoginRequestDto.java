package com.electricitybillingsystem.backend.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminLoginRequestDto {

    @NotBlank(message = "username must not be empty")
    private String username;

    @NotBlank(message = "password must not be empty")
    private String password;

    @NotBlank(message = "branch must not be empty")
    private String branch;

}
