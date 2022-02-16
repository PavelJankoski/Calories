package com.toptal.caloriesbe;

import com.toptal.caloriesbe.domain.enums.RoleType;
import com.toptal.caloriesbe.domain.model.FoodEntry;
import com.toptal.caloriesbe.domain.model.Role;
import com.toptal.caloriesbe.domain.model.User;
import com.toptal.caloriesbe.repository.FoodEntryRepository;
import com.toptal.caloriesbe.repository.RoleRepository;
import com.toptal.caloriesbe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInit implements ApplicationRunner {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final FoodEntryRepository foodEntryRepository;

    @Override
    public void run(ApplicationArguments args) {
        this.foodEntryRepository.deleteAll();
        this.userRepository.deleteAll();
        this.roleRepository.deleteAll();

        Role role1 = new Role(RoleType.ROLE_ADMIN);
        Role role2 = new Role(RoleType.ROLE_USER);
        this.roleRepository.saveAll(List.of(role1, role2));

        User user1 = new User("Toptal User", "user@toptal.com", "$2a$10$5s607O0sKCBvVzUcG2nmTOY.Eu7pvqOcR1Ghn/rd4UKvQE6kGrfXW", 2100, role2);
        User user2 = new User("Toptal Admin", "admin@toptal.com", "$2a$10$S05mVGmowVf10wYIcoImfuLu2Rg3RldNDK3Vc7ftahkOlOFKFmW4u", 2100, role1);
        User user3 = new User("Toptal User2", "user2@toptal.com", "$2a$10$5s607O0sKCBvVzUcG2nmTOY.Eu7pvqOcR1Ghn/rd4UKvQE6kGrfXW", 2100, role2);
        this.userRepository.saveAll(List.of(user1, user2, user3));

        FoodEntry foodEntry1 = new FoodEntry("Burger", 1300, Instant.now().minus(3, ChronoUnit.DAYS), user1);
        FoodEntry foodEntry2 = new FoodEntry("Pizza", 930, Instant.now().minus(2, ChronoUnit.DAYS), user2);
        FoodEntry foodEntry3 = new FoodEntry("Tuna", 450, Instant.now().minus(1, ChronoUnit.DAYS), user3);
        FoodEntry foodEntry4 = new FoodEntry("Banana", 125, Instant.now(), user1);
        FoodEntry foodEntry5 = new FoodEntry("Avocado", 200, Instant.now(), user2);
        FoodEntry foodEntry6 = new FoodEntry("Salad", 330, Instant.now(), user3);
        FoodEntry foodEntry7 = new FoodEntry("Apple", 170, Instant.now().minus(3, ChronoUnit.HOURS), user1);
        FoodEntry foodEntry8 = new FoodEntry("Eggs", 560, Instant.now().minus(5, ChronoUnit.HOURS), user2);
        FoodEntry foodEntry9 = new FoodEntry("Pasta", 2200, Instant.now().minus(7, ChronoUnit.HOURS), user1);
        FoodEntry foodEntry10 = new FoodEntry("Salmon", 645, Instant.now().minus(1, ChronoUnit.DAYS), user1);
        FoodEntry foodEntry11 = new FoodEntry("Fresh fruit", 500, Instant.now().minus(2, ChronoUnit.DAYS), user2);
        FoodEntry foodEntry12 = new FoodEntry("Fries", 1000, Instant.now().minus(3, ChronoUnit.DAYS), user2);
        this.foodEntryRepository.saveAll(List.of(foodEntry1, foodEntry2, foodEntry3,
                foodEntry4, foodEntry5, foodEntry6, foodEntry7, foodEntry8,
                foodEntry9, foodEntry10, foodEntry11, foodEntry12));
    }
}
