package com.toptal.caloriesbe.repository;

import com.toptal.caloriesbe.domain.enums.RoleType;
import com.toptal.caloriesbe.domain.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleType(RoleType type);
}
