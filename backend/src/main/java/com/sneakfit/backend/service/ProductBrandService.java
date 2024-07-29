package com.sneakfit.backend.service;

import com.sneakfit.backend.model.ProductBrand;
import com.sneakfit.backend.repository.ProductBrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductBrandService {

    @Autowired
    private ProductBrandRepository productBrandRepository;

    @Autowired
    private FileUploadService fileUploadService;

    public List<ProductBrand> findAll() {
        return productBrandRepository.findAll();
    }

    public ProductBrand findById(String id) {
        return productBrandRepository.findById(id).orElse(null);
    }

    public ProductBrand update(ProductBrand productBrand) {
        return productBrandRepository.save(productBrand);
    }



    public ProductBrand saveProduct(ProductBrand productBrand, MultipartFile file) throws IOException {


        String brandImage = fileUploadService.saveBrandImage(file);
        productBrand.setBrandImage(brandImage);


        return productBrandRepository.save(productBrand);
    }


    public void deleteBrand(String brandId) {
        if(productBrandRepository.existsById(brandId)) {
            productBrandRepository.deleteById(brandId);
        }else {
            throw new RuntimeException("No brand found with id: " + brandId);
        }
    }

}
