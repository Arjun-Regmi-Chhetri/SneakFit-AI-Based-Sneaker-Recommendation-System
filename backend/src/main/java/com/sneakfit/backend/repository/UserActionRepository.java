package com.sneakfit.backend.repository;

import com.sneakfit.backend.model.UserAction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserActionRepository extends JpaRepository<UserAction, String> {

    List<UserAction> findByUserId(String userId);

}
