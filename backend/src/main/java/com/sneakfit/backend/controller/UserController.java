package com.sneakfit.backend.controller;


import com.sneakfit.backend.config.UserAuthenticationProvider;
import com.sneakfit.backend.dtos.UserCredentialsDto;
import com.sneakfit.backend.dtos.UserDto;
import com.sneakfit.backend.model.User;
import com.sneakfit.backend.service.FileUploadService;
import com.sneakfit.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;
    private final UserAuthenticationProvider userAuthenticationProvider;


    @RequestMapping("/user_list")
    public ResponseEntity<List<User>> getUserList() {
        return ResponseEntity.ok(userService.getAllUser());
    }

    @PostMapping("/register")
    public User register(@RequestBody User user,@RequestParam(value = "userImage", required = false) MultipartFile file) throws IOException {
        user.setFullName(user.getFirstName() + " " + user.getLastName());
        return userService.addUser(user, file);
    }


    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid UserCredentialsDto credentialsDto) {

        UserDto userDto = userService.login(credentialsDto);
//        userDto.setToken(userAuthenticationProvider.createToken(userDto.getEmail()));

        String token=userAuthenticationProvider.createToken(userDto.getEmail());
        userService.updateUserToken(userDto.getId(), token);

        return ResponseEntity.ok(userDto);

    }

    @GetMapping("/details")
    public ResponseEntity<UserDto> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto currentUserDto = (UserDto) authentication.getPrincipal();
        return ResponseEntity.ok(currentUserDto);
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable String id,
            @RequestParam(name = "firstName", required = false) String firstName,
            @RequestParam(name = "lastName", required = false) String lastName,
            @RequestParam(name = "fullName", required = false) String fullName,
            @RequestParam(name = "email", required = false) String email,
            @RequestParam(name = "phone", required = false) String phone,
            @RequestParam(name = "address", required = false) String address,
            @RequestParam(value = "userImage", required = false) MultipartFile userImage) throws IOException {
        // Get current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDto currentUserDto = (UserDto) authentication.getPrincipal();

        // Check if the user attempting to update is the same as the authenticated user
        if (!currentUserDto.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        // Retrieve user from database
        User userToUpdate = userService.findById(id);
        if (userToUpdate == null) {
            return ResponseEntity.notFound().build();
        }

        // Update user details if provided in request params
        if (firstName != null) {
            userToUpdate.setFirstName(firstName);
        }
        if (lastName != null) {
            userToUpdate.setLastName(lastName);
        }
        if (email != null) {
            userToUpdate.setEmail(email);
        }

        if(phone != null){
            userToUpdate.setPhone(phone);
        }

        if(address != null){
            userToUpdate.setAddress(address);
        }

        if (fullName != null) {
            // Concatenate first name and last name to update full name
            userToUpdate.setFullName(firstName + " " + lastName);
        }


        // Update the user in the database
        User updatedUser = userService.updateUser(userToUpdate,userImage);

        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/delete{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }



}
