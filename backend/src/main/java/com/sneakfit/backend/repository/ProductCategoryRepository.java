package com.sneakfit.backend.repository;

import com.sneakfit.backend.model.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, String> {




}
