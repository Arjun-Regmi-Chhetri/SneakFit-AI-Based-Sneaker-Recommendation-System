package com.sneakfit.backend.controller;

import com.sneakfit.backend.model.ProductCategory;
import com.sneakfit.backend.service.FileUploadService;
import com.sneakfit.backend.service.ProductCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/sneakerCategory")
//@CrossOrigin("http://localhost:5173")
public class ProductCategoryController {

    @Autowired
    private ProductCategoryService productCategoryService;

    @Autowired
    private FileUploadService fileUploadService;


    public ProductCategoryController(ProductCategoryService productCategoryService, FileUploadService fileUploadService) {
        this.productCategoryService = productCategoryService;
        this.fileUploadService = fileUploadService;
    }

    @GetMapping()

    public List<ProductCategory> getAllProductCategory() {
        return productCategoryService.findAll();
    }

    @PostMapping("/addCategory")
    public ResponseEntity<?> create(
            @RequestParam("categoryName") String name,
            @RequestParam("categoryDescription") String description,
           @RequestParam(value = "categoryImage", required = false) MultipartFile image
    ) {

        try {
            ProductCategory productCategory = new ProductCategory();
            productCategory.setCategoryName(name);
            productCategory.setCategoryDescription(description);

            return ResponseEntity.ok( productCategoryService.save(productCategory, image));
        }catch (IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save image: "+ e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occured: "+ e.getMessage());
        }



    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductCategory> update(
            @PathVariable String id,
            @RequestParam(name = "categoryName", required = false) String categoryName,
            @RequestParam(value = "categoryImage", required = false) MultipartFile image,
            @RequestParam(name = "categoryDescription", required = false) String categoryDescription


    )throws IOException{

        ProductCategory productCategory = productCategoryService.findById(id);
        productCategory.setCategoryName(categoryName);
        productCategory.setCategoryDescription(categoryDescription);
        if (image != null) {
            String file = fileUploadService.saveCategoryImage(image);
            productCategory.setCategoryImage(file);
        }

        return ResponseEntity.ok(productCategoryService.update(productCategory));

    }


    @DeleteMapping("/delete{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        productCategoryService.deleteCategory(id);

        return ResponseEntity.noContent().build();
    }

}
