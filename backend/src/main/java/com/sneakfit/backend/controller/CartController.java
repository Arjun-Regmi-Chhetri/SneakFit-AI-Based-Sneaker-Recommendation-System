package com.sneakfit.backend.controller;

import com.sneakfit.backend.model.Cart;
import com.sneakfit.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {


    @Autowired
    private CartService cartService;

    @GetMapping("/user{userId}")
    public ResponseEntity<List<Cart>> getCartsByUser(@PathVariable String userId) {
        List<Cart> carts = cartService.getCartsByUser(userId);
        return ResponseEntity.ok(carts);
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addProductToCart(
            @RequestParam String productId,
            @RequestParam String userId,
            @RequestParam Integer quantity,
            @RequestParam String sizeId) {

        Cart savedCart = cartService.saveCart(productId, userId, quantity, sizeId);
        return ResponseEntity.ok(savedCart);
    }


    @DeleteMapping("/remove{id}")
    public ResponseEntity<Void> deleteCart(@PathVariable String id) {
        cartService.deleteCart(id);
        return ResponseEntity.noContent().build();
    }


//    @DeleteMapping("/remove")
//    public ResponseEntity<Cart> removeCart(@RequestParam String userId, @RequestParam String productId) {
//        Optional<Cart> cart = cartService.removeFromCart(userId, productId);
//
//        return cart.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.badRequest().build());
//    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

}
