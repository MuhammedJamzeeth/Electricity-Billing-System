package com.electricitybillingsystem.backend.backend.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.sql.Date;

@Getter
@Setter
public class PaymentDTO {
    private Long accountNumber;
    private Integer receiptNumber;
    private BigDecimal amount;
    private Date paymentDate;
}

