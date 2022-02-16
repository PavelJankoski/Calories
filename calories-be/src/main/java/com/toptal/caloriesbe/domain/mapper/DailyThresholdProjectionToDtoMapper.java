package com.toptal.caloriesbe.domain.mapper;

import com.toptal.caloriesbe.domain.dto.response.GetDailyThresholdDto;
import com.toptal.caloriesbe.domain.dto.response.GetFoodEntryDto;
import com.toptal.caloriesbe.domain.model.FoodEntry;
import com.toptal.caloriesbe.domain.projection.GetDailyThresholdsProjectionDto;
import net.kaczmarzyk.spring.data.jpa.domain.In;
import org.springframework.stereotype.Component;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DailyThresholdProjectionToDtoMapper {
    public GetDailyThresholdDto toGetDailyThresholdDto(GetDailyThresholdsProjectionDto projectionDto) {
        GetDailyThresholdDto getDailyThresholdDto = new GetDailyThresholdDto();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy");

        getDailyThresholdDto.setDateTakenOn(projectionDto.getDateTakenOn().format(formatter));
        getDailyThresholdDto.setDailyCalories(projectionDto.getDailyCalories());

        return getDailyThresholdDto;
    }

    public List<GetDailyThresholdDto> toGetDailyThresholdDtoList(List<GetDailyThresholdsProjectionDto> dailyThresholdsProjectionDtos) {
        return dailyThresholdsProjectionDtos.stream().map(this::toGetDailyThresholdDto).collect(Collectors.toList());
    }
}
