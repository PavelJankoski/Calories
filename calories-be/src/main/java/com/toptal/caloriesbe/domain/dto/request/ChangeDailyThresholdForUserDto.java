package com.toptal.caloriesbe.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ChangeDailyThresholdForUserDto implements Serializable {

    @NotNull(message = "caloriesThreshold must not be NULL!")
    private Integer caloriesThreshold;
}
