package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.models.Consumer;

import java.util.List;

public interface ConsumerService {

    List<Consumer> getAllConsumers();
    Consumer createConsumer(Consumer consumer);

    Consumer updateConsumer(Long accountNo, Consumer consumer);
    void deleteConsumer(Long accountNo);
}
