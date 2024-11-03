package com.electricitybillingsystem.backend.backend.controllers;

import com.electricitybillingsystem.backend.backend.models.Consumer;
import com.electricitybillingsystem.backend.backend.services.ConsumerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ConsumerController {
    @Autowired
    private ConsumerService consumerService;

    @GetMapping("/consumers")
    public List<Consumer> getAllConsumers() {
        return consumerService.getAllConsumers();
    }

    @PostMapping("/consumers/add")
    public Consumer createConsumer(@RequestBody Consumer consumer) {
        return consumerService.createConsumer(consumer);
    }

    @PutMapping("consumers/update/{accountNo}")
    public Consumer updateConsumer(@PathVariable Long accountNo, @RequestBody Consumer consumer) {
        return consumerService.updateConsumer(accountNo, consumer);
    }


    @DeleteMapping("consumers/delete/{accountNo}")
    public void deleteConsumer(@PathVariable Long accountNo) {
        consumerService.deleteConsumer(accountNo);
    }

}
