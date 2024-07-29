package com.sneakfit.backend.controller;


import com.sneakfit.backend.model.ProductCategory;
import com.sneakfit.backend.model.ProductSubCategory;
import com.sneakfit.backend.service.ProductSubCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/sneakerSubCategory")
public class ProductSubCategoryController {


    @Autowired
    private ProductSubCategoryService productSubCategoryService;


    @GetMapping()
    public List<ProductSubCategory> getAllCategory(){
        return productSubCategoryService.getAllSubCategory();
    }

    @PostMapping("/addSubCategory")
    public ProductSubCategory addProduct(@RequestBody ProductSubCategory productSubCategory) {
        return  productSubCategoryService.save(productSubCategory);

    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductSubCategory> update(
            @PathVariable String id,
            @RequestBody ProductSubCategory productSubCategory) {

        ProductSubCategory existingSubCategory = productSubCategoryService.getSubCategoryById(id);
        if (existingSubCategory == null) {
            return ResponseEntity.notFound().build();
        }

        productSubCategory.setSubCategoryId(id);

        ProductSubCategory updatedSubCategory = productSubCategoryService.update(productSubCategory);

        return ResponseEntity.ok(updatedSubCategory);
    }


    @DeleteMapping("/delete{id}")
    public ResponseEntity<Void> delete(@PathVariable String id){
        productSubCategoryService.deleteById(id);

        return ResponseEntity.noContent().build();
    }

}
