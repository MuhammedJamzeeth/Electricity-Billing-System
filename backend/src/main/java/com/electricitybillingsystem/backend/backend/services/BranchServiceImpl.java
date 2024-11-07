package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.dto.BranchAddRequestDto;
import com.electricitybillingsystem.backend.backend.models.Branch;
import com.electricitybillingsystem.backend.backend.repositories.BranchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    private final BranchRepository branchRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<Branch> getAllBranches() {
        return branchRepository.findAll();
    }

    @Override
    public Branch getBranchById(Integer branchId) {
        return branchRepository.findById(branchId).orElse(null);
    }

    @Override
    public Branch createBranch(BranchAddRequestDto branchAddRequestDto) {
        Branch branch = new Branch();
        branch.setBranchName(branchAddRequestDto.getBranchName());
        branch.setBranchUsername(branch.getBranchUsername());
        branch.setPassword(passwordEncoder.encode(branch.getPassword()));
        branch.setContactNo(branch.getContactNo());
        return branchRepository.save(branch);
    }

    @Override
    public Branch updateBranch(Integer branchId, Branch branchDetails) {
        Optional<Branch> optionalBranch = branchRepository.findById(branchId);
        if (optionalBranch.isPresent()) {
            Branch branch = optionalBranch.get();
            branch.setBranchName(branchDetails.getBranchName());
            branch.setLocation(branchDetails.getLocation());
            branch.setBranchUsername(branchDetails.getBranchUsername());
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
