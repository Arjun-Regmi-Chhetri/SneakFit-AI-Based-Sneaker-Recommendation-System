package com.sneakfit.backend.repository;

import com.sneakfit.backend.model.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductSizeRepository extends JpaRepository<ProductSize, String> {


    Optional<ProductSize> findById(String sizeId);


}
