package com.sneakfit.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileUploadService {

    @Value("${file.upload-dir.category}")
    private String categoryUploadDir;

    @Value("${file.upload-dir.brand}")
    private String brandUploadDir;

    @Value("${file.upload-dir.product}")
    private String productUploadDir;

    @Value("${file.upload-dir.user}")
    private String userUploadDir;

    @Value("${file.upload-dir.admin}")
    private String adminUploadDir;

    private static final String DEFAULT_IMAGE = "nofile.png";

    public String saveBrandImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return DEFAULT_IMAGE;
        }
        return saveImage(file, brandUploadDir);
    }

    public String saveCategoryImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return DEFAULT_IMAGE;
        }
        return saveImage(file, categoryUploadDir);
    }

    public String saveProductImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return DEFAULT_IMAGE;
        }
        return saveImage(file, productUploadDir);
    }

    public String saveUserImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return DEFAULT_IMAGE;
        }
        return saveImage(file, userUploadDir);
    }

    public String saveAdminImage(MultipartFile file) throws IOException {
        if(file == null || file.isEmpty()){
            return DEFAULT_IMAGE;
        }

        return saveImage(file, adminUploadDir);
    }

    private String saveImage(MultipartFile image, String uploadDir) throws IOException {
        // Ensure the upload directory exists
        String currentDir = System.getProperty("user.dir");
        String parentDir = new File(currentDir).getParent();
        File uploadDirFile = new File(parentDir + uploadDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs(); // Create parent directories if they don't exist
        }

        // Generate the file path
        String originalFilename = image.getOriginalFilename();
        if (originalFilename == null || originalFilename.isEmpty()) {
            throw new IOException("Invalid file name");
        }

        String filePath = uploadDirFile + File.separator + originalFilename;
        File file = new File(filePath);

        // Save the file to the specified directory
        try {
            image.transferTo(file);
            return originalFilename;
        } catch (IOException e) {
            throw new IOException("Failed to save file", e);
        }
    }

}
