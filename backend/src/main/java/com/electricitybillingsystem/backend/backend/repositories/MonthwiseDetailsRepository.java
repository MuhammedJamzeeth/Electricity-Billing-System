package com.electricitybillingsystem.backend.backend.repositories;

import com.electricitybillingsystem.backend.backend.models.Consumer;
import com.electricitybillingsystem.backend.backend.models.MonthwiseDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonthwiseDetailsRepository extends JpaRepository<MonthwiseDetails, Long> {
    MonthwiseDetails findByAccountNo(Consumer consumer);

}
