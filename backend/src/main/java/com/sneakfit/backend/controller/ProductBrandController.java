package com.sneakfit.backend.controller;


import com.sneakfit.backend.model.ProductBrand;
import com.sneakfit.backend.service.FileUploadService;
import com.sneakfit.backend.service.ProductBrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/sneakerBrand")
public class ProductBrandController {

    @Autowired
    private ProductBrandService productBrandService;

    @Autowired
    private FileUploadService fileUploadService;

    @GetMapping()
    public List<ProductBrand> getAllProductBrand() {
        return productBrandService.findAll();
    }

    @PostMapping("/addBrand")
    public ResponseEntity<?> create(
            @RequestParam("brandName") String name,
            @RequestParam("brandDescription") String description,
            @RequestParam(value = "brandImage", required = false) MultipartFile image
    ) {
        try {
            ProductBrand productBrand = new ProductBrand();
            productBrand.setBrandName(name);
            productBrand.setBrandDescription(description);


            ProductBrand savedBrand = productBrandService.saveProduct(productBrand, image);
            return ResponseEntity.ok(savedBrand);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save image: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<ProductBrand> update(
            @PathVariable String id,
            @RequestParam(name = "brandName", required = false) String brandName,
            @RequestParam(value = "brandImage", required = false) MultipartFile image,
            @RequestParam(name = "brandDescription", required = false) String brandDescription


    )throws IOException{

        ProductBrand productBrand = productBrandService.findById(id);
        productBrand.setBrandName(brandName);
        productBrand.setBrandDescription(brandDescription);
        if (image != null) {
            String file = fileUploadService.saveBrandImage(image);
            productBrand.setBrandImage(file);
        }

        return ResponseEntity.ok(productBrandService.update(productBrand));

    }

    @DeleteMapping("/delete{id}")

    public ResponseEntity<?> delete(@PathVariable String id) {
        productBrandService.deleteBrand(id);
        return ResponseEntity.noContent().build();
    }

}
