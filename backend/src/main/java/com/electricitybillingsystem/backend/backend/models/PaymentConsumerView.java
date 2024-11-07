package com.electricitybillingsystem.backend.backend.models;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.sql.Date;

@Getter
@Setter
@Entity
@Table(name = "payment_consumer_view")
public class PaymentConsumerView {

    @Id
    @Column(name = "payment_id")
    private Integer paymentId;

    @Column(name = "account_number")
    private Long accountNumber;

    @Column(name = "receipt_number")
    private String receiptNumber;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "address")
    private String address;

    @Column(name = "payment_date")
    private Date paymentDate;

    @Column(name = "amount")
    private BigDecimal amount;
}

