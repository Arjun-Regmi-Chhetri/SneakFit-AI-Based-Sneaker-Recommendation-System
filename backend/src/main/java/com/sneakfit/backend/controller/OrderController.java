package com.sneakfit.backend.controller;


import com.sneakfit.backend.model.Order;
import com.sneakfit.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @RequestMapping("/list")
    public List<Order> getOrders() {
        return orderService.getAllOrder();
    }

    @RequestMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable String userId) {
        List<Order> orders= orderService.getOrderByUser(userId);
        return ResponseEntity.ok(orders);
    }


    @PostMapping("/addOrder")
    public ResponseEntity<Order> addOrder(
            @RequestParam String productId,
            @RequestParam String userId,
            @RequestParam String sizeId,
            @RequestParam Integer quantity
    ) {
        Order saveOrder = orderService.saveOrder(productId, userId, sizeId, quantity);
        return ResponseEntity.ok(saveOrder);
    }




    @DeleteMapping("/delete{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable String id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

}
