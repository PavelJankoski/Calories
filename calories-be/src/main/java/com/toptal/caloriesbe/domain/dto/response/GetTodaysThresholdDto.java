package com.toptal.caloriesbe.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetTodaysThresholdDto implements Serializable {
    private Boolean didPass;

    private Integer thresholdForUser;
}
