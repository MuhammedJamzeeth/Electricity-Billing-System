package com.electricitybillingsystem.backend.backend.repositories;

import com.electricitybillingsystem.backend.backend.models.Consumer;
import com.electricitybillingsystem.backend.backend.models.EBill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<EBill, Long> {
    EBill findByConsumer(Consumer consumer);
}
