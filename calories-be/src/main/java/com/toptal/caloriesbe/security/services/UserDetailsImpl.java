package com.toptal.caloriesbe.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.toptal.caloriesbe.domain.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserDetailsImpl implements UserDetails {

    private String email;

    private Long userId;

    private String name;

    @JsonIgnore
    private final String password;

    private final Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(String email,
                           String password,
                           Long userId,
                           String name,
                           Collection<? extends GrantedAuthority> authorities){
        this.email = email;
        this.userId = userId;
        this.password = password;
        this.name = name;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority(user.getRole().getRoleType().name()));

        return new UserDetailsImpl(user.getEmail(), user.getPassword(), user.getId(), user.getName(), authorityList);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    public Long getUserId() {
        return this.userId;
    }

    public String getName() {
        return this.name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
