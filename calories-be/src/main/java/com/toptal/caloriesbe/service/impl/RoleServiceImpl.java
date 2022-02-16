package com.toptal.caloriesbe.service.impl;

import com.toptal.caloriesbe.domain.enums.RoleType;
import com.toptal.caloriesbe.domain.exception.RoleNotFoundException;
import com.toptal.caloriesbe.domain.model.Role;
import com.toptal.caloriesbe.repository.RoleRepository;
import com.toptal.caloriesbe.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public Role findRoleByType(RoleType type) {
        return this.roleRepository.findByRoleType(type).orElseThrow(() -> new RoleNotFoundException(type));
    }

}
