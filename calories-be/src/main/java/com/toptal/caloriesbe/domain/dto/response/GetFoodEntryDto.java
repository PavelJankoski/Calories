package com.toptal.caloriesbe.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetFoodEntryDto implements Serializable {
    private Long id;

    private String productName;

    private Integer calories;

    private String takenOn;

    private String takenOnDate;

    private Long userId;
}
