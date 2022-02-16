package com.toptal.caloriesbe.service;

import com.toptal.caloriesbe.domain.enums.RoleType;
import com.toptal.caloriesbe.domain.model.Role;

public interface RoleService {
    Role findRoleByType(RoleType type);
}
