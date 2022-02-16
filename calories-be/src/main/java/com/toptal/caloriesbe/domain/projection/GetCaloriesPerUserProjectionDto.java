package com.toptal.caloriesbe.domain.projection;

public interface GetCaloriesPerUserProjectionDto {
    Long getUserId();

    Integer getAvgCalories();
}
