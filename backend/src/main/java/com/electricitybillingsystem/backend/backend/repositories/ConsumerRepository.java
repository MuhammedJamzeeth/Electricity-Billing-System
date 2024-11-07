package com.electricitybillingsystem.backend.backend.repositories;

import com.electricitybillingsystem.backend.backend.models.Branch;
import com.electricitybillingsystem.backend.backend.models.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ConsumerRepository extends JpaRepository<Consumer, Long> {

    List<Consumer> findConsumerByBranch(Branch branch);
}
