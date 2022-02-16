package com.toptal.caloriesbe.domain.mapper;

import com.toptal.caloriesbe.domain.dto.response.GetFoodEntryDto;
import com.toptal.caloriesbe.domain.model.FoodEntry;
import org.springframework.stereotype.Component;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class FoodEntryToGetFoodEntryDtoMapper {

    public GetFoodEntryDto toGetFoodEntryDto(FoodEntry foodEntry) {
        GetFoodEntryDto getFoodEntryDto = new GetFoodEntryDto();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy HH:mm")
                .withZone(ZoneId.systemDefault());

        getFoodEntryDto.setId(foodEntry.getId());
        getFoodEntryDto.setProductName(foodEntry.getProductName());
        getFoodEntryDto.setCalories(foodEntry.getCalories());
        getFoodEntryDto.setTakenOn(formatter.format(foodEntry.getTakenOn()));
        getFoodEntryDto.setTakenOnDate(foodEntry.getTakenOn().toString());
        getFoodEntryDto.setUserId(foodEntry.getUser().getId());

        return getFoodEntryDto;
    }

    public List<GetFoodEntryDto> toGetFoodEntryDtoList(List<FoodEntry> foodEntryList) {
        return foodEntryList.stream().map(this::toGetFoodEntryDto).collect(Collectors.toList());
    }
}
