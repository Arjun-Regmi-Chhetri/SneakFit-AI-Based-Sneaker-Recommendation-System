package com.sneakfit.backend.service;


import com.sneakfit.backend.model.Cart;
import com.sneakfit.backend.model.Product;
import com.sneakfit.backend.model.ProductSize;
import com.sneakfit.backend.model.User;
import com.sneakfit.backend.repository.CartRepository;
import com.sneakfit.backend.repository.ProductRepository;
import com.sneakfit.backend.repository.ProductSizeRepository;
import com.sneakfit.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    public Cart saveCart(String productId, String userId,Integer quantity, String sizeId) {

        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));
        ProductSize productSize = productSizeRepository.findById(sizeId).orElseThrow(()->new RuntimeException("Sizes not found"));
        Cart cartStatus = cartRepository.findByProductProductIdAndUserIdAndSizeSizeId(productId, userId, sizeId);
        Cart cart = null;
        BigDecimal totalPrice;
        if (ObjectUtils.isEmpty(cartStatus)) {
            cart = new Cart();
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(quantity);
            totalPrice = (product.getDiscountPrice() != null)
                    ? product.getDiscountPrice().multiply(BigDecimal.valueOf(quantity))
                    : product.getPrice().multiply(BigDecimal.valueOf(quantity));
            cart.setTotalPrice(totalPrice);
            cart.setSize(productSize);
        } else {
            cart = cartStatus;
            cart.setQuantity(cartStatus.getQuantity() + quantity);
            totalPrice = (product.getDiscountPrice() != null )
                    ? product.getDiscountPrice().multiply(BigDecimal.valueOf(cart.getQuantity()))
                    : product.getPrice().multiply(BigDecimal.valueOf(cart.getQuantity()));
            cart.setTotalPrice(totalPrice);
        }


       Cart saveCart = cartRepository.save(cart);

        return saveCart;

    }

    public List<Cart> getCartsByUser(String userId) {

        return cartRepository.findByUserId(userId);
    }


    public void deleteCart(String id) {
        if (cartRepository.existsById(id)) {
            cartRepository.deleteById(id);
        }else {
            throw new RuntimeException("Cart not found");
        }
    }


}