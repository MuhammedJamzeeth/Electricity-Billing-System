package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.dto.BranchAddRequestDto;
import com.electricitybillingsystem.backend.backend.dto.BranchResponseDto;
import com.electricitybillingsystem.backend.backend.dto.BranchUpdateDto;
import com.electricitybillingsystem.backend.backend.exceptions.AlreadyExistsException;
import com.electricitybillingsystem.backend.backend.exceptions.NotFoundException;
import com.electricitybillingsystem.backend.backend.models.Branch;
import com.electricitybillingsystem.backend.backend.repositories.BranchRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    private final BranchRepository branchRepository;
    private final PasswordEncoder passwordEncoder;

    public List<BranchResponseDto> getAllBranches() {
        List<Branch> branches = branchRepository.findAll();
        return branches.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private BranchResponseDto convertToDto(Branch branch) {
        BranchResponseDto dto = new BranchResponseDto();
        dto.setBranchName(branch.getBranchName());
        dto.setLocation(branch.getLocation());
        dto.setBranchUsername(branch.getBranchUsername());
        dto.setContactNo(branch.getContactNo());
        return dto;
    }

    @Override
    public BranchAddRequestDto getBranchById(Integer branchId) {

        var branch = branchRepository.findById(branchId).orElseThrow(
                () -> new NotFoundException("Branch Not Found")
        );
        BranchAddRequestDto branchAddRequestDto = new BranchAddRequestDto();
        branchAddRequestDto.setBranchName(branch.getBranchName());
        branchAddRequestDto.setContactNo(branch.getContactNo());
        branchAddRequestDto.setLocation(branch.getLocation());

        return branchAddRequestDto;
    }

    @Override
    public Branch createBranch(BranchAddRequestDto branchAddRequestDto) {

        var isUsernameExits = branchRepository.checkUsernameExists(branchAddRequestDto.getBranchName());

        if (Boolean.TRUE.equals(isUsernameExits)){
            throw new AlreadyExistsException("Branch name already exits");
        }

        Branch branch = new Branch();

        branch.setBranchName(branchAddRequestDto.getBranchName());
        branch.setPassword(passwordEncoder.encode(branchAddRequestDto.getPassword()));
        branch.setLocation(branchAddRequestDto.getLocation());
        branch.setContactNo(branchAddRequestDto.getContactNo());

        return branchRepository.save(branch);
    }

    @Transactional
    @Override
    public Branch updateBranch(Integer branchId, BranchUpdateDto branchDetails) {
        Optional<Branch> optionalBranch = branchRepository.findById(branchId);
        if (optionalBranch.isPresent()) {
            Branch branch = optionalBranch.get();
            branch.setBranchName(branchDetails.getBranchName());
            branch.setLocation(branchDetails.getLocation());
            branch.setContactNo(branchDetails.getContactNo());

            Branch branchRes = branchRepository.save(branch);

            branchRepository.updateBranchUsername(branchRes.getBranchId(), branchRes.getBranchName(), branchRes.getLocation());

            return branchRes;

        }
        return null;
    }

    @Override
    public void deleteBranch(Integer branchId) {
        branchRepository.deleteById(branchId);
    }

    //dashboard count
    @Override
    public long getBranchCount() {
        return branchRepository.countBranch();
    }
}
