package com.toptal.caloriesbe.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(Long id) {
        super(String.format("User with id %s is not found", id));
    }

    public UserNotFoundException(String email) {
        super(String.format("User with email %s is not found", email));
    }
}