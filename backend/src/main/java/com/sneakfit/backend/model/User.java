package com.sneakfit.backend.model;


import com.sneakfit.backend.generator.UserIdGenerator;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.Set;

@Data
@Entity
public class User {

    @Id
    @GeneratedValue(generator = "user")
    @GenericGenerator(name = "user", type = UserIdGenerator.class)
    private String  id;

    @Column(nullable = false)
    private String firstName;
    private String lastName;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    private String fullName;

    private String address;

    private String phone;

    private String userImage;

    private String token;


}
