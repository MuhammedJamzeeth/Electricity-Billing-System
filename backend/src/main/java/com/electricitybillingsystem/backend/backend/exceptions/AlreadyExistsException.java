package com.electricitybillingsystem.backend.backend.exceptions;

import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class AlreadyExistsException extends ResponseStatusException {
    public AlreadyExistsException(@NonNull final String message) {
        super(HttpStatus.CONFLICT, message);
    }
}
