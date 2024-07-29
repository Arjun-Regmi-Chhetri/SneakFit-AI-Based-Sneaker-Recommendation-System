package com.sneakfit.backend.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String fullName;
    private String address;
    private String userImage;
    private String phone;
    private String token;

}
