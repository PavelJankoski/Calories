package com.toptal.caloriesbe.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.toptal.caloriesbe.base.BaseTimeAuditedEntity;
import com.toptal.caloriesbe.domain.enums.RoleType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
public class Role extends BaseTimeAuditedEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "role_type", length = 30, unique = true)
    @Enumerated(value = EnumType.STRING)
    private RoleType roleType;

    public Role(RoleType roleType) {
        this.roleType = roleType;
    }
}
