package com.toptal.caloriesbe.web;

import com.toptal.caloriesbe.domain.dto.request.CreateEditFoodEntryDto;
import com.toptal.caloriesbe.domain.dto.response.*;
import com.toptal.caloriesbe.domain.model.FoodEntry;
import com.toptal.caloriesbe.domain.projection.GetCaloriesPerUserProjectionDto;
import com.toptal.caloriesbe.service.FoodEntryService;
import lombok.RequiredArgsConstructor;
import net.kaczmarzyk.spring.data.jpa.domain.GreaterThanOrEqual;
import net.kaczmarzyk.spring.data.jpa.domain.LessThan;
import net.kaczmarzyk.spring.data.jpa.domain.LikeIgnoreCase;
import net.kaczmarzyk.spring.data.jpa.web.annotation.And;
import net.kaczmarzyk.spring.data.jpa.web.annotation.Spec;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolationException;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping(value = "/api/food-entries", produces = MediaType.APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
@Validated
public class FoodEntryController {
    private final FoodEntryService foodEntryService;

    @GetMapping(value = "/{foodEntryId}")
    public ResponseEntity<FoodEntry> getFoodEntryById(@NotNull @Positive @PathVariable Long foodEntryId) {
        return ResponseEntity.ok(this.foodEntryService.findById(foodEntryId));
    }

    @GetMapping
    public ResponseEntity<PagingResponse<?>> findPagedFoodEntries(
            @RequestParam() Integer page,
            @RequestParam() Integer size,
            @And({
                    @Spec(path = "productName", params = "productName", spec = LikeIgnoreCase.class),
                    @Spec(path = "takenOn", params = "from", spec = GreaterThanOrEqual.class),
                    @Spec(path = "takenOn", params = "to", spec = LessThan.class),
            })
            Specification<FoodEntry> specification,
            Sort sort
    ) {
        return ResponseEntity.ok(this.foodEntryService.getFoodEntries(specification, PageRequest.of(page, size, sort)));
    }

    @PostMapping
    public ResponseEntity<GetFoodEntryDto> createFoodEntry(@RequestBody CreateEditFoodEntryDto dto) {
        return ResponseEntity.ok(this.foodEntryService.create(dto));
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<GetFoodEntryDto> updateFoodEntry(@NotNull @Positive @PathVariable Long id, @RequestBody CreateEditFoodEntryDto dto){
        return ResponseEntity.ok(this.foodEntryService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public HttpStatus deleteFoodEntry(@NotNull @Positive @PathVariable Long id) {
        this.foodEntryService.delete(id);
        return HttpStatus.OK;
    }

    @GetMapping(value = "/todays-threshold")
    public ResponseEntity<GetTodaysThresholdDto> getDidPassTodaysThreshold() {
        return ResponseEntity.ok(this.foodEntryService.getTodaysThreshold());
    }

    @GetMapping(value = "/daily-thresholds")
    public ResponseEntity<List<GetDailyThresholdDto>> getDailyThresholds() {
        return ResponseEntity.ok(this.foodEntryService.getDailyThresholds());
    }

    @GetMapping("/food-entries-period-report")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<GetFoodEntryInTimePeriodDto> getFoodEntriesCountReport() {
        return ResponseEntity.ok(this.foodEntryService.getReportForTimePeriod());
    }

    @GetMapping("/calories-per-user-report")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<GetCaloriesPerUserProjectionDto>> getCaloriesPeruser() {
        return ResponseEntity.ok(this.foodEntryService.getCaloriesPerUser());
    }

    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ResponseEntity<String> handleConstraintViolationException(ConstraintViolationException e) {
        return new ResponseEntity<>("Not valid due to validation error: " + e.getMessage(),
                HttpStatus.BAD_REQUEST);
    }
}
