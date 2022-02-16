package com.toptal.caloriesbe.service;

import com.toptal.caloriesbe.domain.dto.request.CreateEditFoodEntryDto;
import com.toptal.caloriesbe.domain.dto.response.*;
import com.toptal.caloriesbe.domain.model.FoodEntry;
import com.toptal.caloriesbe.domain.projection.GetCaloriesPerUserProjectionDto;
import com.toptal.caloriesbe.domain.projection.GetDailyThresholdsProjectionDto;
import lombok.NonNull;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface FoodEntryService {
    FoodEntry findById(@NonNull Long foodEntryId);

    GetFoodEntryDto create(CreateEditFoodEntryDto dto);

    GetFoodEntryDto update(@NonNull Long foodEntryId, CreateEditFoodEntryDto dto);

    void delete(@NonNull Long foodEntryId);

    PagingResponse<?> getFoodEntries(Specification<FoodEntry> specification, Pageable pageable);

    GetTodaysThresholdDto getTodaysThreshold();

    List<GetDailyThresholdDto> getDailyThresholds();

    GetFoodEntryInTimePeriodDto getReportForTimePeriod();

    List<GetCaloriesPerUserProjectionDto> getCaloriesPerUser();
}
