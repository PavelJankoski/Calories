package com.toptal.caloriesbe.domain.model;

import com.toptal.caloriesbe.base.BaseTimeAuditedEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
public class User extends BaseTimeAuditedEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "calories_threshold")
    @ColumnDefault("2100")
    private Integer caloriesThreshold;

    @ManyToOne
    private Role role;

    public User(String name, String email, String password, Integer caloriesThreshold, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.caloriesThreshold = caloriesThreshold;
        this.role = role;
    }
}
