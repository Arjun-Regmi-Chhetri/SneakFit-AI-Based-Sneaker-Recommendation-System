package com.sneakfit.backend.service;


import com.sneakfit.backend.dtos.UserCredentialsDto;
import com.sneakfit.backend.dtos.UserDto;
import com.sneakfit.backend.mappers.UserMapper;
import com.sneakfit.backend.model.User;
import com.sneakfit.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContextException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.List;
import java.util.Optional;


@Service
public class UserService  {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private FileUploadService fileUploadService;


    public User addUser(User user, MultipartFile file) throws IOException {
        String image = fileUploadService.saveUserImage(file);
        user.setUserImage(image);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    public void updateUserToken(String id, String token) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setToken(token);
        userRepository.save(user);
    }
    public User findById(String id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.orElse(null);
    }

    public User updateUser(User user, MultipartFile file) throws IOException {

        if (file != null && !file.isEmpty()) {
            String image = fileUploadService.saveUserImage(file);
            user.setUserImage(image);
        }


        return userRepository.save(user);

    }


   public UserDto login(UserCredentialsDto userCredentialsDto){
        User user = userRepository.findByEmail(userCredentialsDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(passwordEncoder.matches(CharBuffer.wrap(userCredentialsDto.getPassword()), user.getPassword())){
            return userMapper.toUserDto(user);
        }
        throw new ApplicationContextException("Wrong password");
   }


   public UserDto findByEmail(String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return userMapper.toUserDto(user);
   }


    public List<User> getAllUser() {
        User user  = new User();
        return userRepository.findAll();
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }





}
