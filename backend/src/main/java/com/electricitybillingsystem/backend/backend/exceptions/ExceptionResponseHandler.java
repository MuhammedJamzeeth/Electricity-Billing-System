package com.electricitybillingsystem.backend.backend.exceptions;

import com.electricitybillingsystem.backend.backend.dto.ExceptionResponseDto;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
public class ExceptionResponseHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ExceptionResponseDto<String>> responseStatusExceptionHandler(final ResponseStatusException exception) {

        final var exceptionResponse = new ExceptionResponseDto<String>();
        exceptionResponse.setStatus(exception.getStatusCode().toString());
        exceptionResponse.setDescription(exception.getReason());
        return ResponseEntity.status(exception.getStatusCode()).body(exceptionResponse);
    }

}
