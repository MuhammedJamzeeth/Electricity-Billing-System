package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.dto.PaymentDTO;
import com.electricitybillingsystem.backend.backend.exceptions.InvalidCredentialException;
import com.electricitybillingsystem.backend.backend.models.Payment;
import com.electricitybillingsystem.backend.backend.repositories.ConsumerRepository;
import com.electricitybillingsystem.backend.backend.repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final ConsumerRepository consumerRepository;

    @Override
    public List<Payment> getPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPayment(Long id) {
        return paymentRepository.getReferenceById(id);
    }

    @Override
    public Payment createPayment(PaymentDTO payment) {

        var consumer = consumerRepository.findById(payment.getAccountNumber()).orElseThrow(() -> new InvalidCredentialException("Not found"));

        Payment newPayment = new Payment();
        newPayment.setPaymentDate(payment.getPaymentDate());
        newPayment.setAmount(payment.getAmount());
        newPayment.setReceiptNumber(String.valueOf(payment.getReceiptNumber()));
        newPayment.setConsumer(consumer);
        return paymentRepository.save(newPayment);
    }
}
