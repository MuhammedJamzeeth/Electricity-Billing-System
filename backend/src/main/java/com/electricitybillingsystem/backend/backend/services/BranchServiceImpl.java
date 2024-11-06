package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.models.Branch;
import com.electricitybillingsystem.backend.backend.repositories.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BranchServiceImpl implements BranchService {

    @Autowired
    private BranchRepository branchRepository;

    @Override
    public List<Branch> getAllBranches() {
        return branchRepository.findAll();
    }

    @Override
    public Branch getBranchById(Integer branchId) {
        return branchRepository.findById(branchId).orElse(null);
    }

    @Override
    public Branch createBranch(Branch branch) {
        return branchRepository.save(branch);
    }

    @Override
    public Branch updateBranch(Integer branchId, Branch branchDetails) {
        Optional<Branch> optionalBranch = branchRepository.findById(branchId);
        if (optionalBranch.isPresent()) {
            Branch branch = optionalBranch.get();
            branch.setBranchName(branchDetails.getBranchName());
            branch.setLocation(branchDetails.getLocation());
            branch.setBranchEmail(branchDetails.getBranchEmail());
            branch.setContactNo(branchDetails.getContactNo());
            return branchRepository.save(branch);
        }
        return null;
    }

    @Override
    public void deleteBranch(Integer branchId) {
        branchRepository.deleteById(branchId);
    }
}
