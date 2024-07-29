package com.sneakfit.backend.controller;

import com.sneakfit.backend.model.UserAction;
import com.sneakfit.backend.service.UserActionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user_action")
public class UserActionController {

    @Autowired
    private UserActionService userActionService;

//    @PostMapping
//    public UserAction logUserAction(@RequestBody UserAction userAction) {
//        return userActionService.save(userAction);
//    }


    @GetMapping
//    public List<UserAction> getUserActions(@PathVariable Long userId) {
    public String getUserActions() {
        return "Item";
    }

}
