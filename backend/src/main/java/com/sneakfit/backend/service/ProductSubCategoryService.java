package com.sneakfit.backend.service;

import com.sneakfit.backend.model.ProductCategory;
import com.sneakfit.backend.model.ProductSubCategory;
import com.sneakfit.backend.repository.ProductSubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductSubCategoryService {

    @Autowired
    private ProductSubCategoryRepository productSubCategoryRepository;


    public List<ProductSubCategory> getAllSubCategory() {
        return productSubCategoryRepository.findAll();
    }


    public ProductSubCategory save(ProductSubCategory productSubCategory){
        return productSubCategoryRepository.save(productSubCategory);
    }

    public ProductSubCategory getSubCategoryById(String id) {
        return productSubCategoryRepository.findById(id).orElse(null);
    }

    public ProductSubCategory update(ProductSubCategory productSubCategory) {
        return productSubCategoryRepository.save(productSubCategory);
    }


    public void deleteById(String id){
        if(productSubCategoryRepository.existsById(id)){
            productSubCategoryRepository.deleteById(id);
        }else {
            throw new RuntimeException("No Sub Category Id found "+ id);
        }
    }



}
