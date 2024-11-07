package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.dto.LoginResponseDto;

public interface AdminService {

    public LoginResponseDto login(String username, String password);
}
