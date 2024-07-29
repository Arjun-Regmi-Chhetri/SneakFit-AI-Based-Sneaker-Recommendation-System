package com.sneakfit.backend.repository;

import com.sneakfit.backend.model.ProductBrand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductBrandRepository extends JpaRepository<ProductBrand, String> {


}
