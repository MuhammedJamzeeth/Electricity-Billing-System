package com.electricitybillingsystem.backend.backend.repositories;

import com.electricitybillingsystem.backend.backend.models.Branch;
import com.electricitybillingsystem.backend.backend.models.Consumer;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ConsumerRepository extends JpaRepository<Consumer, Long> {

    List<Consumer> findConsumerByBranch(Branch branch);


    //consumer count
    @Query(value = "SELECT COUNT(*) FROM consumer", nativeQuery = true)
    long countConsumer();



}
