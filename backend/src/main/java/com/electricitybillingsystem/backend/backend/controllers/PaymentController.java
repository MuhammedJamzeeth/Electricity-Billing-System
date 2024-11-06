package com.electricitybillingsystem.backend.backend.controllers;

import com.electricitybillingsystem.backend.backend.dto.PaymentDTO;
import com.electricitybillingsystem.backend.backend.models.Payment;
import com.electricitybillingsystem.backend.backend.models.PaymentConsumerView;
import com.electricitybillingsystem.backend.backend.services.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PaymentController {
    private final PaymentService paymentService;

    @GetMapping("/payments/all")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/payments")
    public List<PaymentConsumerView> getPaymentsFromView() { // using view
        return paymentService.getPaymentDetailsFromView();
    }

    @GetMapping("/payments/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }

    @PostMapping("/payments/add")
    public ResponseEntity<Payment> createPayment(@RequestBody PaymentDTO payment) {
        Payment createdPayment = paymentService.createPayment(payment);
        return new ResponseEntity<>(createdPayment, HttpStatus.CREATED);
    }
}
