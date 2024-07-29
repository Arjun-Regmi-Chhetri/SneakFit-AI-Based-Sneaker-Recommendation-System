package com.sneakfit.backend.service;

import com.sneakfit.backend.model.UserAction;
import com.sneakfit.backend.repository.UserActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class UserActionService {

    @Autowired

    private UserActionRepository userActionRepository;

    public UserAction save(UserAction userAction) {
        userAction.setTimestamp(new Timestamp(System.currentTimeMillis()));
        return userActionRepository.save(userAction);
    }

}
