package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.exceptions.InvalidCredentialException;
import com.electricitybillingsystem.backend.backend.models.Admin;
import com.electricitybillingsystem.backend.backend.repositories.AdminRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminServiceImpl implements AdminService{

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public String login(String username, String password) {

        Admin admin = adminRepository.findByUsername(username)
                .orElseThrow(() -> new InvalidCredentialException("Invalid username"));

        final var encodedPassword = admin.getPassword();
        final var isCorrectPassword = passwordEncoder.matches(password, encodedPassword);

        if (Boolean.FALSE.equals(isCorrectPassword)) {
            throw new InvalidCredentialException("Invalid password");
        }


        return "Login successful";
    }

}
