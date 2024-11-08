package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.dto.LoginResponseDto;
import com.electricitybillingsystem.backend.backend.exceptions.InvalidCredentialException;
import com.electricitybillingsystem.backend.backend.exceptions.NotFoundException;
import com.electricitybillingsystem.backend.backend.models.Admin;
import com.electricitybillingsystem.backend.backend.repositories.AdminRepository;
import com.electricitybillingsystem.backend.backend.repositories.BranchRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminServiceImpl implements AdminService{

    private final AdminRepository adminRepository;
    private final BranchRepository branchRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginResponseDto login(String username, String password) {

        if (username.toLowerCase().matches("admin")){
            Admin admin = adminRepository.findByUsername(username)
                    .orElseThrow(() -> new InvalidCredentialException("Invalid username"));

            final var encodedPassword = admin.getPassword();
            final var isCorrectPassword = passwordEncoder.matches(password, encodedPassword);

            if (Boolean.FALSE.equals(isCorrectPassword)) {
                throw new InvalidCredentialException("Invalid password");
            }
            LoginResponseDto loginResponseDto = new LoginResponseDto();
            loginResponseDto.setUsername(admin.getUsername());
            loginResponseDto.setUserID(admin.getId());
            return loginResponseDto;
        } else {
            var branch = branchRepository.findByBranchUsername(username).orElseThrow(
                    () -> new NotFoundException("Username not found")
            );
            final var encodedPassword = branch.getPassword();
            final var isCorrectPassword = passwordEncoder.matches(password, encodedPassword);

            if (Boolean.FALSE.equals(isCorrectPassword)) {
                throw new InvalidCredentialException("Invalid password");
            }

            LoginResponseDto loginResponseDto = new LoginResponseDto();
            loginResponseDto.setUsername(branch.getBranchUsername());
            loginResponseDto.setUserID(branch.getBranchId());
            return loginResponseDto;

        }

    }

}
