package com.electricitybillingsystem.backend.backend.repositories;

import com.electricitybillingsystem.backend.backend.models.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BranchRepository extends JpaRepository<Branch, Integer> {
    Optional<Branch> findByBranchId(Integer id);

    Optional<Branch> findByBranchUsername(String username);

    @Procedure(name = "checkUsernameExists")
    boolean checkUsernameExists(@Param("username") String username);

    @Procedure(name = "updateBranchUsername")
    void updateBranchUsername(@Param("branch_id") Integer branchId, @Param("new_branch_name") String newBranchName, @Param("new_location") String newLocation);

    //branch count dashboard
    @Query(value = "SELECT COUNT(*) FROM branch", nativeQuery = true)
    long countBranch();

}
