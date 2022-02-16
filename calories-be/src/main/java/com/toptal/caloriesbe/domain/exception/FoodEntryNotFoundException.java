package com.toptal.caloriesbe.domain.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class FoodEntryNotFoundException extends RuntimeException {
    public FoodEntryNotFoundException(Long id) {
        super(String.format("FoodEntry with id %s is not found", id));
    }
}
