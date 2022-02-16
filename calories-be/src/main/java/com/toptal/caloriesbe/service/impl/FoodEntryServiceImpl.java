package com.toptal.caloriesbe.service.impl;

import com.toptal.caloriesbe.domain.dto.request.CreateEditFoodEntryDto;
import com.toptal.caloriesbe.domain.dto.response.*;
import com.toptal.caloriesbe.domain.enums.RoleType;
import com.toptal.caloriesbe.domain.exception.FoodEntryNotFoundException;
import com.toptal.caloriesbe.domain.mapper.DailyThresholdProjectionToDtoMapper;
import com.toptal.caloriesbe.domain.mapper.FoodEntryToGetFoodEntryDtoMapper;
import com.toptal.caloriesbe.domain.model.FoodEntry;
import com.toptal.caloriesbe.domain.model.User;
import com.toptal.caloriesbe.domain.projection.GetCaloriesPerUserProjectionDto;
import com.toptal.caloriesbe.repository.FoodEntryRepository;
import com.toptal.caloriesbe.service.FoodEntryService;
import com.toptal.caloriesbe.service.UserService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import static com.toptal.caloriesbe.utils.CommonFunctions.getUserIdFromAuthContext;

@Service
@RequiredArgsConstructor
public class FoodEntryServiceImpl implements FoodEntryService {
    private final FoodEntryRepository foodEntryRepository;
    private final FoodEntryToGetFoodEntryDtoMapper foodEntryDtoMapper;
    private final DailyThresholdProjectionToDtoMapper dailyThresholdProjectionToDtoMapper;
    private final UserService userService;

    @Override
    public FoodEntry findById(@NonNull Long foodEntryId) {
        return this.foodEntryRepository.findById(foodEntryId).orElseThrow(() -> new FoodEntryNotFoundException(foodEntryId));
    }

    @Override
    public GetFoodEntryDto create(CreateEditFoodEntryDto dto) {
        Long userId = getUserIdFromAuthContext();
        User user = this.userService.findById(userId);
        return this.foodEntryDtoMapper
                .toGetFoodEntryDto(this.foodEntryRepository
                        .save(new FoodEntry(dto.getProductName(), dto.getCalories(), dto.getTakenOn()
                                .atZone(ZoneId.systemDefault()).toInstant(), user)));
    }

    @Override
    public GetFoodEntryDto update(@NonNull Long foodEntryId, CreateEditFoodEntryDto dto) {
        FoodEntry entry = this.findById(foodEntryId);
        entry.setProductName(dto.getProductName());
        entry.setCalories(dto.getCalories());
        entry.setTakenOn(dto.getTakenOn().atZone(ZoneId.systemDefault()).toInstant());

        return this.foodEntryDtoMapper
                .toGetFoodEntryDto(this.foodEntryRepository.save(entry));
    }

    @Override
    public void delete(@NonNull Long foodEntryId) {
        this.foodEntryRepository.deleteById(foodEntryId);
    }


    private Specification<FoodEntry> takeFoodEntriesForUser(Specification<FoodEntry> specification) {
        Long userId = getUserIdFromAuthContext();
        List<GrantedAuthority> roles = SecurityContextHolder
                .getContext()
                .getAuthentication().getAuthorities()
                .stream()
                .filter(a -> a.getAuthority().equals(RoleType.ROLE_ADMIN.name()))
                .collect(Collectors.toList());
        if(roles.size() > 0) {
            return specification;
        }
        Specification<FoodEntry> spec1 = (root, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.and(criteriaBuilder.equal(root.get("user").get("id"), userId));

        return specification == null ? spec1 : specification.and(spec1);
    }

    @Override
    public PagingResponse<?> getFoodEntries(Specification<FoodEntry> specification, Pageable pageable) {
        specification = takeFoodEntriesForUser(specification);
        Page<FoodEntry> page = this.foodEntryRepository.findAll(specification, pageable);
        return new PagingResponse<>(page.getTotalElements(), (long) page.getNumber(),
                (long) page.getNumberOfElements(), pageable.getOffset(),
                (long) page.getTotalPages(),
                page.getContent()
                        .stream()
                        .map(this.foodEntryDtoMapper::toGetFoodEntryDto)
                        .collect(Collectors.toList()));
    }

    @Override
    public GetTodaysThresholdDto getTodaysThreshold() {
        Long userId = getUserIdFromAuthContext();
        Instant now = Instant.now();
        Integer usersThreshold = this.userService.getCaloriesThresholdForUser(userId);
        Boolean didPassThreshold = this.foodEntryRepository
                .findTodaysCalories(now
                        .minus(24, ChronoUnit.HOURS), now, userId) > usersThreshold;

        return new GetTodaysThresholdDto(didPassThreshold, usersThreshold);
    }

    @Override
    public List<GetDailyThresholdDto> getDailyThresholds() {
        Long userId = getUserIdFromAuthContext();
        return this.dailyThresholdProjectionToDtoMapper
                .toGetDailyThresholdDtoList(this.foodEntryRepository
                        .findDailyThresholds(userId, this.userService
                                .getCaloriesThresholdForUser(userId)));
    }

    @Override
    public GetFoodEntryInTimePeriodDto getReportForTimePeriod() {
        Instant now = Instant.now();
        Instant lastWeek = now.minus(7, ChronoUnit.DAYS);
        Instant weekBeforeLast = lastWeek.minus(7, ChronoUnit.DAYS);
        Integer foodEntriesForLastWeek = this.foodEntryRepository.findFoodEntriesCountInTimePeriodQuery(lastWeek, now);
        Integer foodEntriesForWeekBeforelast = this.foodEntryRepository.findFoodEntriesCountInTimePeriodQuery(weekBeforeLast, lastWeek);
        return new GetFoodEntryInTimePeriodDto(foodEntriesForLastWeek, foodEntriesForWeekBeforelast);
    }

    @Override
    public List<GetCaloriesPerUserProjectionDto> getCaloriesPerUser() {
        Instant now = Instant.now();
        Instant lastWeek = now.minus(7, ChronoUnit.DAYS);
        return this.foodEntryRepository.findCaloriesPerUser(lastWeek, now);
    }
}
