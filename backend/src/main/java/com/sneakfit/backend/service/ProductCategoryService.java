package com.sneakfit.backend.service;

import com.sneakfit.backend.model.ProductBrand;
import com.sneakfit.backend.model.ProductCategory;
import com.sneakfit.backend.repository.ProductCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductCategoryService {


    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private FileUploadService fileUploadService;

    public List<ProductCategory> findAll() {
        return productCategoryRepository.findAll();
    }

    public ProductCategory save(ProductCategory productCategory, MultipartFile file) throws IOException {

        String filename = fileUploadService.saveCategoryImage(file);
        productCategory.setCategoryImage(filename);


        return productCategoryRepository.save(productCategory);
    }


    public ProductCategory findById(String id) {
        return productCategoryRepository.findById(id).orElse(null);
    }

    public ProductCategory update(ProductCategory productCategory) {
        return productCategoryRepository.save(productCategory);
    }

    public void deleteCategory(String id) {
        if(productCategoryRepository.existsById(id)) {
            productCategoryRepository.deleteById(id);
        }else {
            throw new RuntimeException("Category not found"+ id);
        }
    }


}
