package com.electricitybillingsystem.backend.backend.services;

import com.electricitybillingsystem.backend.backend.exceptions.NotFoundException;
import com.electricitybillingsystem.backend.backend.models.Branch;
import com.electricitybillingsystem.backend.backend.models.Consumer;
import com.electricitybillingsystem.backend.backend.repositories.BranchRepository;
import com.electricitybillingsystem.backend.backend.repositories.ConsumerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConsumerServiceImpl implements ConsumerService {


    private final ConsumerRepository consumerRepository;
    private final BranchRepository branchRepository;

    @Override
    public List<Consumer> getAllConsumers() {
        return consumerRepository.findAll(Sort.by("id"));
    }

    @Override
    public List<Consumer> getConsumersByBranchId(int branchId) {
        var branch = branchRepository.findById(branchId).orElseThrow(
                () -> new NotFoundException("Branch not found")
        );

        return consumerRepository.findConsumerByBranch(branch);

    }

    @Override
    public Consumer createConsumer(Consumer consumer) {
        return consumerRepository.save(consumer);
    }

    @Override
    @Transactional
    public Consumer updateConsumer(Long accountNo, Consumer consumerDetails) {
        Optional<Consumer> optionalConsumer = consumerRepository.findById(accountNo);
        if (optionalConsumer.isPresent()) {
            Consumer consumer = optionalConsumer.get();
            consumer.setFirstName(consumerDetails.getFirstName());
            consumer.setLastName(consumerDetails.getLastName());
            consumer.setEmail(consumerDetails.getEmail());
            consumer.setMeterNo(consumerDetails.getMeterNo());
            consumer.setAddress(consumerDetails.getAddress());
            consumer.setPhase(consumerDetails.getPhase());
            consumer.setContact_number(consumerDetails.getContact_number());
            return consumerRepository.save(consumer);
        } else {
            throw new RuntimeException("Consumer not found with account number: " + accountNo);
        }
    }

    @Override
    public void deleteConsumer(Long accountNo) {
        consumerRepository.deleteById(accountNo);
    }

    @Override
    public Consumer searchConsumerByAccountNo(Long accountNo) {
        Optional<Consumer> consumer = consumerRepository.findById(accountNo);
        if (consumer.isPresent()) {
            return consumer.get();
        } else {
            throw new RuntimeException("Consumer not found with account number: " + accountNo);
        }
    }



    //consumer count dash
    @Override
    public long getConsumerCount() {
        return consumerRepository.countConsumer();
    }


}
