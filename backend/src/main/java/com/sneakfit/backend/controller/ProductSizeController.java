package com.sneakfit.backend.controller;


import com.sneakfit.backend.model.ProductSize;
import com.sneakfit.backend.service.ProductSizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sneakerSize")
public class ProductSizeController {

    @Autowired
    private ProductSizeService productSizeService;

    @GetMapping
    public List<ProductSize> getProductSize(){
        return productSizeService.getAllProductSize();
    }

    @PostMapping("/addSize")
    public ProductSize addSize(@RequestBody ProductSize productSize) {
        return  productSizeService.saveProductSize(productSize);
    }


    @DeleteMapping("/delete{id}")
    public ResponseEntity<Void> deleteSize(@PathVariable String id){
        productSizeService.deleteProductSizeById(id);

        return ResponseEntity.noContent().build();
    }

}
