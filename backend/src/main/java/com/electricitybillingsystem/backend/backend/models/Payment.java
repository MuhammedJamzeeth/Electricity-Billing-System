package com.electricitybillingsystem.backend.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;

@Entity
@Getter
@RequiredArgsConstructor
@Setter
@Table(name = "Payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Integer paymentId;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "account_number", nullable = false)
    private Consumer consumer;

    @Column(name="receipt_number", nullable = false)
    private String receiptNumber;

    @Column(name="amount", nullable = false)
    private BigDecimal amount;

    @Column(name="payment_date", nullable = false)
    private Date paymentDate;


}
