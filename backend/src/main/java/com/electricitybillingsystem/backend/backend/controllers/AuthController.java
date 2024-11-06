package com.electricitybillingsystem.backend.backend.controllers;


import com.electricitybillingsystem.backend.backend.dto.AdminLoginRequestDto;
import com.electricitybillingsystem.backend.backend.services.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    private final AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<String> admin(@Valid @RequestBody AdminLoginRequestDto loginRequest) {
        var response = adminService.login(loginRequest.getUsername(), loginRequest.getPassword());
        return ResponseEntity.ok(response);
    }

}
