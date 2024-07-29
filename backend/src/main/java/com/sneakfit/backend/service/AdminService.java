package com.sneakfit.backend.service;


import com.sneakfit.backend.model.Admin;
import com.sneakfit.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContextException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.relation.Role;
import java.nio.Buffer;
import java.nio.CharBuffer;
import java.util.List;


@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Transactional
    public Admin addAdmin(Admin admin) {

        if(admin.getRole()== null){
            admin.setRole(Admin.Role.ADMIN);
        }

        if(admin.getStatus() == null){
            admin.setStatus(Admin.Status.ACTIVE);
        }

        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminRepository.save(admin);
    }


    public Admin findByEmail(String email) {
        return adminRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin with email " + email + " not found"));
    }

    public Admin findById(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Admin id not found"));
    }

    public List<Admin> getAllAdmin(){
        return adminRepository.findAll();
    }

    public Admin updateAdmin(Admin admin) {
        return adminRepository.save(admin);
    }


    public Admin loginAdmin(Admin admin) {

        Admin admin1 = adminRepository.findByEmail(admin.getEmail())
                .orElseThrow(()->new RuntimeException("Admin with email " + admin.getEmail() + " not found"));

        if(passwordEncoder.matches(CharBuffer.wrap(admin.getPassword()), admin1.getPassword())){
            return admin1;
        }

        throw new ApplicationContextException("Wrong Password");

    }

    public void updateAdminToken(Long id, String token) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Admin Not found"));
        admin.setToken(token);
        adminRepository.save(admin);

    }



    public void setAdminRole(String email, Admin.Role role) {
        Admin existingAdmin = findByEmail(email);
        if (existingAdmin != null) {
            existingAdmin.setRole(role);
        }
        assert existingAdmin != null;
        adminRepository.save(existingAdmin);
    }

    public void setAdminStatus(String email,  Admin.Status status) {
        Admin existingAdmin = findByEmail(email);
        existingAdmin.setStatus(status);
        adminRepository.save(existingAdmin);
    }

    public void deleteAdmin(Long id) {

        if(adminRepository.existsById(id)){
            adminRepository.deleteById(id);
        }else {
            throw new RuntimeException("Admin with id " + id + " not found");
        }

    }

}
