package com.electricitybillingsystem.backend.backend.services;


import com.electricitybillingsystem.backend.backend.models.Branch;

import java.util.List;

public interface BranchService {
    List<Branch> getAllBranches();
    Branch getBranchById(Integer branchId);
    Branch createBranch(Branch branch);
    Branch updateBranch(Integer branchId, Branch branchDetails);
    void deleteBranch(Integer branchId);
}