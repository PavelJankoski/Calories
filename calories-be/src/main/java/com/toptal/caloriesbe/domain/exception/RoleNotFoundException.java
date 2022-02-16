package com.toptal.caloriesbe.domain.exception;

import com.toptal.caloriesbe.domain.enums.RoleType;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RoleNotFoundException extends RuntimeException {
    public RoleNotFoundException(RoleType type) {
        super(String.format("Role of type %s is not found", type.name()));
    }
}