package com.toptal.caloriesbe.web;

import com.toptal.caloriesbe.domain.dto.request.ChangeDailyThresholdForUserDto;
import com.toptal.caloriesbe.domain.dto.request.InviteFriendDto;
import com.toptal.caloriesbe.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api/users", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Validated
public class UserController {
    private final UserService userService;

    @PutMapping("/change-daily-threshold")
    public HttpStatus changeDailyThreshold(@RequestBody ChangeDailyThresholdForUserDto dto) {
        this.userService.changeCaloriesThresholdForUser(dto);
        return HttpStatus.OK;
    }

    @PostMapping(value = "/invite-friend")
    public ResponseEntity<String> inviteFriend(@RequestBody InviteFriendDto dto) {
        return ResponseEntity.ok(this.userService.inviteFriend(dto));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException e) {
        return new ResponseEntity<>("Not valid due to validation error: " + e.getMessage(),
                HttpStatus.BAD_REQUEST);
    }
}
