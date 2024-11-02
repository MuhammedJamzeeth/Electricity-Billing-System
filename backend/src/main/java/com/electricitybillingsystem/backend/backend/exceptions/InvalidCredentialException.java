package com.electricitybillingsystem.backend.backend.exceptions;

import lombok.NonNull;
import org.springframework.http.HttpStatus;

import org.springframework.web.server.ResponseStatusException;

public class InvalidCredentialException extends ResponseStatusException {

    public InvalidCredentialException(@NonNull final String message) {
        super(HttpStatus.UNAUTHORIZED, message);
    }
}
