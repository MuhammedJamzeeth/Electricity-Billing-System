package com.electricitybillingsystem.backend.backend.controllers;


import com.electricitybillingsystem.backend.backend.dto.BranchAddRequestDto;
import com.electricitybillingsystem.backend.backend.models.Branch;
import com.electricitybillingsystem.backend.backend.services.BranchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/branch")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class BranchController {

    private final BranchService branchService;

    @GetMapping
    public List<Branch> getAllBranches() {
        return branchService.getAllBranches();
    }

    @GetMapping("/{branchId}")
    public Branch getBranchById(@PathVariable Integer branchId) {
        return branchService.getBranchById(branchId);
    }

    @PostMapping("/add")
    public Branch createBranch(@Valid  @RequestBody BranchAddRequestDto branchAddRequestDto) {
        return branchService.createBranch(branchAddRequestDto);
    }

    @PutMapping("/update/{branchId}")
    public Branch updateBranch(@PathVariable Integer branchId, @RequestBody Branch branchDetails) {
        return branchService.updateBranch(branchId, branchDetails);
    }

    @DeleteMapping("/delete/{branchId}")
    public void deleteBranch(@PathVariable Integer branchId) {
        branchService.deleteBranch(branchId);
    }
}