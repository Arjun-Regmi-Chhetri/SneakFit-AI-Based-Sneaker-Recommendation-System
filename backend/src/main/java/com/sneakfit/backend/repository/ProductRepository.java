package com.sneakfit.backend.repository;

import com.sneakfit.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, String> {



    List<Product> findByProductCategory_CategoryName(String categoryName);

    List<Product> findByProductBrand_BrandName(String brandName);



    List<Product> findByProductNameContainingIgnoreCase(String keyword);
    List<Product> findByProductNameStartingWithIgnoreCase(String prefix);
}
