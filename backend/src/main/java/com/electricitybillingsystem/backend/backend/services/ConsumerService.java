package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.models.Consumer;

import java.util.List;

public interface ConsumerService {

    List<Consumer> getAllConsumers();

    List<Consumer> getConsumersByBranchId(int branchId);


    Consumer createConsumer(Consumer consumer);

    Consumer updateConsumer(Long accountNo, Consumer consumer);
    void deleteConsumer(Long accountNo);

    Consumer searchConsumerByAccountNo(Long accountNo);
}
