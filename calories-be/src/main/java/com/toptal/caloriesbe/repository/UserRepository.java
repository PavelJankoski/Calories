package com.toptal.caloriesbe.repository;

import com.toptal.caloriesbe.domain.model.User;
import com.toptal.caloriesbe.utils.QueryConstants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = QueryConstants.getCaloriesThresholdForUserQuery, nativeQuery = true)
    Integer findCaloriesThresholdForUser(Long userId);

    Optional<User> findByEmail(String email);
}
