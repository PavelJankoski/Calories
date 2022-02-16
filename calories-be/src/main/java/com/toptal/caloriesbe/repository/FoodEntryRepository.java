package com.toptal.caloriesbe.repository;

import com.toptal.caloriesbe.domain.model.FoodEntry;
import com.toptal.caloriesbe.domain.projection.GetCaloriesPerUserProjectionDto;
import com.toptal.caloriesbe.domain.projection.GetDailyThresholdsProjectionDto;
import com.toptal.caloriesbe.utils.QueryConstants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface FoodEntryRepository extends JpaRepository<FoodEntry, Long>, JpaSpecificationExecutor<FoodEntry> {
    @Query(value = QueryConstants.getTodaysCaloriesQuery, nativeQuery = true)
    Integer findTodaysCalories(Instant from, Instant to, Long userId);

    @Query(value = QueryConstants.getDailyThresholdsQuery, nativeQuery = true)
    List<GetDailyThresholdsProjectionDto> findDailyThresholds(Long userId, Integer threshold);

    @Query(value = QueryConstants.getFoodEntriesCountInTimePeriodQuery, nativeQuery = true)
    Integer findFoodEntriesCountInTimePeriodQuery(Instant from, Instant to);

    @Query(value = QueryConstants.getCaloriesByUser, nativeQuery = true)
    List<GetCaloriesPerUserProjectionDto> findCaloriesPerUser(Instant from, Instant to);

    List<FoodEntry> findAllByUserId(Long userId);
}
