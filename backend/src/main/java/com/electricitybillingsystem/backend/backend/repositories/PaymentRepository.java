package com.electricitybillingsystem.backend.backend.repositories;

import com.electricitybillingsystem.backend.backend.models.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {


    //count for dashboard
    @Query(value = "SELECT COUNT(*) FROM payment", nativeQuery = true)
    long countPayment();

    //graph
    @Query(value = "SELECT EXTRACT(MONTH FROM payment_date) AS month, SUM(amount) AS total_payment " +
            "FROM payment GROUP BY EXTRACT(MONTH FROM payment_date)", nativeQuery = true)
    List<Object[]> getMonthlyPayments();


}
