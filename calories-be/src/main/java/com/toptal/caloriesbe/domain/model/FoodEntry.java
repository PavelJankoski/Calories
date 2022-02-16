package com.toptal.caloriesbe.domain.model;

import com.toptal.caloriesbe.base.BaseTimeAuditedEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "food_entries")
@NoArgsConstructor
@Getter
@Setter
public class FoodEntry extends BaseTimeAuditedEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "calories")
    private Integer calories;

    @Column(name = "taken_on", nullable = false)
    private Instant takenOn;

    @ManyToOne
    private User user;

    public FoodEntry(String productName, Integer calories, Instant takenOn, User user) {
        this.productName = productName;
        this.calories = calories;
        this.takenOn = takenOn;
        this.user = user;
    }
}
