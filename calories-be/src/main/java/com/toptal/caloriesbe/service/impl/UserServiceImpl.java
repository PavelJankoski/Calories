package com.toptal.caloriesbe.service.impl;

import com.toptal.caloriesbe.domain.dto.request.ChangeDailyThresholdForUserDto;
import com.toptal.caloriesbe.domain.dto.request.InviteFriendDto;
import com.toptal.caloriesbe.domain.dto.request.LogInDto;
import com.toptal.caloriesbe.domain.dto.request.RegisterDto;
import com.toptal.caloriesbe.domain.dto.response.GetJwtDto;
import com.toptal.caloriesbe.domain.enums.RoleType;
import com.toptal.caloriesbe.domain.exception.UserNotFoundException;
import com.toptal.caloriesbe.domain.model.User;
import com.toptal.caloriesbe.repository.UserRepository;
import com.toptal.caloriesbe.security.jwt.JwtUtils;
import com.toptal.caloriesbe.security.services.UserDetailsImpl;
import com.toptal.caloriesbe.service.RoleService;
import com.toptal.caloriesbe.service.UserService;
import com.toptal.caloriesbe.utils.CommonFunctions;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;


    @Override
    public User findById(Long id) {
        return this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    @Override
    public User findByEmail(String email) {
        return this.userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
    }

    @Override
    public Integer getCaloriesThresholdForUser(Long userId) {
        return this.userRepository.findCaloriesThresholdForUser(userId);
    }

    @Override
    public void changeCaloriesThresholdForUser(ChangeDailyThresholdForUserDto dto) {
        Long userId = CommonFunctions.getUserIdFromAuthContext();
        User u = this.findById(userId);
        u.setCaloriesThreshold(dto.getCaloriesThreshold());
        this.userRepository.save(u);
    }

    @Override
    public GetJwtDto login(LogInDto logInDto, Boolean isInvite) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(logInDto.getEmail(), logInDto.getPassword()));

        if(!isInvite){
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        GetJwtDto jwtDto = new GetJwtDto();
        jwtDto.setAccessToken(jwt);
        jwtDto.setName(userDetails.getName());
        jwtDto.setEmail(userDetails.getUsername());
        jwtDto.setRole(roles.get(0));

        return jwtDto;
    }

    @Override
    public void register(RegisterDto registerDto) {
        User user = new User();

        user.setEmail(registerDto.getEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        user.setName(registerDto.getName());
        user.setRole(this.roleService.findRoleByType(RoleType.ROLE_USER));
        user.setCaloriesThreshold(2100);

        this.userRepository.save(user);
    }

    @Override
    public String inviteFriend(InviteFriendDto dto) {
        String password = CommonFunctions.alphaNumericString(12);
        this.register(new RegisterDto(dto.getName(), dto.getEmail(), password));
        return this.login(new LogInDto(dto.getEmail(), password), true).getAccessToken();
    }
}
