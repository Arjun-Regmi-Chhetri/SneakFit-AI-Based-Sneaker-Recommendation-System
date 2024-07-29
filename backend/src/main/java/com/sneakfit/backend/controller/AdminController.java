package com.sneakfit.backend.controller;


import com.sneakfit.backend.config.AdminAuthenticationProvider;
import com.sneakfit.backend.model.Admin;
import com.sneakfit.backend.service.AdminService;
import com.sneakfit.backend.service.FileUploadService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private AdminAuthenticationProvider adminAuthenticationProvider;

    @RequestMapping("/admin_list")
    public ResponseEntity<List<Admin>> adminList() throws IOException {
        return ResponseEntity.ok(adminService.getAllAdmin());
    }

    @PostMapping("/login")
    public ResponseEntity<Admin> login(@RequestBody @Valid Admin admin){
        Admin adminObject = adminService.loginAdmin(admin);
        String token = adminAuthenticationProvider.createToken(adminObject.getEmail());
        adminService.updateAdminToken(adminObject.getId(), token);
        return ResponseEntity.ok(adminObject);
    }

    @PostMapping("/register")
    public Admin register (
            @RequestBody Admin admin,
            @RequestParam(value="image", required = false) MultipartFile image
    )throws IOException{
        String file = fileUploadService.saveAdminImage(image);
        admin.setImage(file);
        admin.setFullName(admin.getFirstName()+ ' '+ admin.getLastName());
       return adminService.addAdmin(admin);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Admin> updateAdmin(
            @PathVariable Long id,
            @RequestParam(name = "firstName", required = false) String firstName,
            @RequestParam(name = "lastName", required = false) String lastName,
            @RequestParam(name = "fullName", required = false) String fullName,
            @RequestParam(name = "email", required = false) String email,
            @RequestParam(name = "phone", required = false) String phone,
            @RequestParam(name = "address", required = false) String address,
            @RequestParam(name ="role", required = false) Admin.Role role,
            @RequestParam(name = "status", required = false) Admin.Status status,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException{

        Admin updateAdmin = adminService.findById(id);

        if(updateAdmin == null){
            return ResponseEntity.notFound().build();
        }


        if(firstName != null){
            updateAdmin.setFirstName(firstName);
        }

        if(lastName != null){
            updateAdmin.setLastName(lastName);
        }

        if(fullName != null){
            updateAdmin.setFullName(firstName + ' ' + lastName);
        }

        if(image != null){
            String file = fileUploadService.saveAdminImage(image);
            updateAdmin.setImage(file);
        }

        if(role != null){
            updateAdmin.setRole(role);
        }

        if(status != null){

            updateAdmin.setStatus(status);

        }

        if(address != null){
            updateAdmin.setAddress(address);
        }

        if(email != null){
            updateAdmin.setEmail(email);
        }

        if(phone != null){
            updateAdmin.setPhone(phone);
        }



        return ResponseEntity.ok(adminService.updateAdmin(updateAdmin));

    }

    @DeleteMapping("/delete{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable long id) throws IOException {

        adminService.deleteAdmin(id);

        return ResponseEntity.ok().build();

    }



}