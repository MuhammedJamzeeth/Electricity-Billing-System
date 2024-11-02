package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.exceptions.InvalidCredentialException;
import com.electricitybillingsystem.backend.backend.models.Admin;
import com.electricitybillingsystem.backend.backend.repositories.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final AdminRepository adminRepository;

    public String login(String username, String password) {

        Admin admin = adminRepository.findByUsername(username)
                .orElseThrow(() -> new InvalidCredentialException("Invalid username or password"));

        return "Login successful";
    }

}
