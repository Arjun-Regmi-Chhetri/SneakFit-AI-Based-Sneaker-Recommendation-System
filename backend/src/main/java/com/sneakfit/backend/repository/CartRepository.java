package com.sneakfit.backend.repository;

import com.sneakfit.backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, String> {

//    Optional<Cart> findByUserId(String userId);

    public Cart findByProductProductIdAndUserIdAndSizeSizeId(String productId, String userId, String sizeId);

    public List<Cart> findByUserId(String userId);


}
