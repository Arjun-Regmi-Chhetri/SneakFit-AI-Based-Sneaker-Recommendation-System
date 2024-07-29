package com.sneakfit.backend.service;


import com.sneakfit.backend.model.ProductSize;
import com.sneakfit.backend.repository.ProductSizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductSizeService {

    @Autowired
    private ProductSizeRepository productSizeRepository;

    public List<ProductSize> getAllProductSize(){
        return productSizeRepository.findAll();
    }

    public ProductSize saveProductSize(ProductSize productSize) {
        return productSizeRepository.save(productSize);
    }

    public void deleteProductSizeById(String Id) {
        if(productSizeRepository.existsById(Id)) {
            productSizeRepository.deleteById(Id);
        }else {
            throw new RuntimeException("Product Size Not Found" + Id);
        }
    }

}
