package com.sneakfit.backend.repository;

import com.sneakfit.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, String> {


    public Order findByProductProductIdAndUserIdAndSizeSizeId(String productId, String userId, String sizeId);

    public List<Order> findByUserId(String userId);
}
