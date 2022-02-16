package com.toptal.caloriesbe.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class CreateEditFoodEntryDto implements Serializable {
    @NotNull(message = "productName must not be NULL!")
    private String productName;

    @NotNull(message = "calories must not be NULL!")
    private Integer calories;

    @NotNull(message = "takenOn must not be NULL!")
    private LocalDateTime takenOn;
}
