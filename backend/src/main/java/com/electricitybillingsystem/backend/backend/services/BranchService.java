package com.electricitybillingsystem.backend.backend.services;


import com.electricitybillingsystem.backend.backend.dto.BranchAddRequestDto;
import com.electricitybillingsystem.backend.backend.dto.BranchUpdateDto;
import com.electricitybillingsystem.backend.backend.models.Branch;

import java.util.List;

public interface BranchService {
    List<Branch> getAllBranches();
    BranchAddRequestDto getBranchById(Integer branchId);
    Branch createBranch(BranchAddRequestDto branchAddRequestDto);
    Branch updateBranch(Integer branchId, BranchUpdateDto branchDetails);
    void deleteBranch(Integer branchId);

    //branch count in dashboard
    long getBranchCount();
}