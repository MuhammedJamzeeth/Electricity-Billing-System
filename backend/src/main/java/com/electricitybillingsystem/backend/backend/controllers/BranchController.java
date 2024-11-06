package com.electricitybillingsystem.backend.backend.controllers;


import com.electricitybillingsystem.backend.backend.models.Branch;
import com.electricitybillingsystem.backend.backend.services.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/branches")
public class BranchController {

    @Autowired
    private BranchService branchService;

    @GetMapping
    public List<Branch> getAllBranches() {
        return branchService.getAllBranches();
    }

    @GetMapping("/{branchId}")
    public Branch getBranchById(@PathVariable Integer branchId) {
        return branchService.getBranchById(branchId);
    }

    @PostMapping("/add")
    public Branch createBranch(@RequestBody Branch branch) {
        return branchService.createBranch(branch);
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