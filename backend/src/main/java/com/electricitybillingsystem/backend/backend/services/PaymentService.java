package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.dto.PaymentDTO;
import com.electricitybillingsystem.backend.backend.models.Payment;
import com.electricitybillingsystem.backend.backend.models.PaymentConsumerView;

import java.util.List;

public interface PaymentService {
    List<Payment> getAllPayments();
    Payment getPaymentById(Long id);
    Payment createPayment(PaymentDTO payment);
    List<PaymentConsumerView> getPaymentDetailsFromView();
    List<PaymentConsumerView> findPaymentsByConsumer(String searchTerm);

    //count
    long getPaymentCount();
    //graph
    List<Object[]> getMonthlyPayments();
}
