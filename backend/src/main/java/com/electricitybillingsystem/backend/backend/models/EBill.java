package com.electricitybillingsystem.backend.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "EBill")
public class EBill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long billId;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "account_no", nullable = false)
    private Consumer consumer;

    @Column(name = "crnt_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date crntDate;

    @Column(name = "last_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date lastDate;

    @Column(name = "total_unit", nullable = false)
    private Integer totalUnit;

    @Column(name = "crnt_unit", nullable = false)
    private Integer crntUnit;

    @Column(name = "month_bill", nullable = false)
    private BigDecimal monthBill;

    @Column(name = "total_bill", nullable = false)
    private BigDecimal totalBill;

}

