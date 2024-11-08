package com.electricitybillingsystem.backend.backend.repositories;

import com.electricitybillingsystem.backend.backend.models.PaymentConsumerView;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentConsumerViewRepository extends JpaRepository<PaymentConsumerView, Long> {
    @Query(value = "CALL GetPaymentsByConsumer(:searchTerm)", nativeQuery = true)
    List<PaymentConsumerView> findPaymentsByConsumerUsingStoredProcedure(@Param("searchTerm") String searchTerm);
}


