package com.electricitybillingsystem.backend.backend.repositories;

import com.electricitybillingsystem.backend.backend.models.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsumerRepository extends JpaRepository<Consumer, Long> {

}
