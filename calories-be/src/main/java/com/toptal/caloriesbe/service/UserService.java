package com.toptal.caloriesbe.service;

import com.toptal.caloriesbe.domain.dto.request.ChangeDailyThresholdForUserDto;
import com.toptal.caloriesbe.domain.dto.request.InviteFriendDto;
import com.toptal.caloriesbe.domain.dto.request.LogInDto;
import com.toptal.caloriesbe.domain.dto.request.RegisterDto;
import com.toptal.caloriesbe.domain.dto.response.GetJwtDto;
import com.toptal.caloriesbe.domain.model.User;

public interface UserService {
    User findById(Long id);

    User findByEmail(String email);

    Integer getCaloriesThresholdForUser(Long userId);

    void changeCaloriesThresholdForUser(ChangeDailyThresholdForUserDto dto);

    GetJwtDto login(LogInDto logInDto, Boolean isInvite);

    void register(RegisterDto registerDto);

    String inviteFriend(InviteFriendDto dto);
}
