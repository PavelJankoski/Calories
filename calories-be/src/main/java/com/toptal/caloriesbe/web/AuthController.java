package com.toptal.caloriesbe.web;

import com.toptal.caloriesbe.domain.dto.request.LogInDto;
import com.toptal.caloriesbe.domain.dto.request.RegisterDto;
import com.toptal.caloriesbe.domain.dto.response.GetJwtDto;
import com.toptal.caloriesbe.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Validated
public class AuthController {

    private final UserService userService;

    @PostMapping(value = "/log-in")
    public ResponseEntity<GetJwtDto> login(@RequestBody LogInDto dto) {
        return ResponseEntity.ok(this.userService.login(dto, false));
    }

    @PostMapping(value = "/register")
    public HttpStatus register(@RequestBody RegisterDto dto) {
        this.userService.register(dto);
        return HttpStatus.OK;
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException e) {
        return new ResponseEntity<>("Not valid due to validation error: " + e.getMessage(),
                HttpStatus.BAD_REQUEST);
    }
}
