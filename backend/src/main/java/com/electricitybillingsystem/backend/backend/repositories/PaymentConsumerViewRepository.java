package com.electricitybillingsystem.backend.backend.repositories;

import com.electricitybillingsystem.backend.backend.models.PaymentConsumerView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentConsumerViewRepository extends JpaRepository<PaymentConsumerView, Long> {
    List<PaymentConsumerView> findByAccountNumber(Long accountNo);
    List<PaymentConsumerView> findByFullName(String fullName);
}


