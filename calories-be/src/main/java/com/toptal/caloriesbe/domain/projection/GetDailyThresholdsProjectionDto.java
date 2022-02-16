package com.toptal.caloriesbe.domain.projection;

import java.time.LocalDate;

public interface GetDailyThresholdsProjectionDto {
    LocalDate getDateTakenOn();

    Integer getDailyCalories();
}
