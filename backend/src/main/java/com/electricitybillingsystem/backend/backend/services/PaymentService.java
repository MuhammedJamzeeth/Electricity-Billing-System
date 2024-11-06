package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.dto.PaymentDTO;
import com.electricitybillingsystem.backend.backend.models.Payment;

import java.util.List;

public interface PaymentService {
    List<Payment> getPayments();
    Payment getPayment(Long id);
    Payment createPayment(PaymentDTO payment);
}
