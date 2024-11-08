package com.electricitybillingsystem.backend.backend.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import com.electricitybillingsystem.backend.backend.models.Consumer;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
public class EBill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Use IDENTITY for auto-increment
    private Long billId; // Changed to Long for auto-increment

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name="account_no", nullable = false)
    private Consumer consumer;

    @JoinColumn(name="crnt_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private String crntDate;

    @JoinColumn(name="last_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date lastDate;

    @JoinColumn(name="total_unit", nullable = false)
    private Integer totalUnit;

    @JoinColumn(name="crnt_unit", nullable = false)
    private Integer crntUnit;

    @JoinColumn(name="month_bill", nullable = false)
    private BigDecimal monthBill;

    @JoinColumn(name="total_bill", nullable = false)
    private BigDecimal totalBill;
}
