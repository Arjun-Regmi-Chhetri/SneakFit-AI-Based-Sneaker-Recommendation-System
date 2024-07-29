package com.sneakfit.backend.service;


import com.sneakfit.backend.model.Order;
import com.sneakfit.backend.model.Product;
import com.sneakfit.backend.model.ProductSize;
import com.sneakfit.backend.model.User;
import com.sneakfit.backend.repository.OrderRepository;
import com.sneakfit.backend.repository.ProductRepository;
import com.sneakfit.backend.repository.ProductSizeRepository;
import com.sneakfit.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.math.BigDecimal;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    public List<Order> getAllOrder(){
        return orderRepository.findAll();
    }

    public List<Order> getOrderByUser(String userId){
        return orderRepository.findByUserId(userId);
    }


    public Order saveOrder(String productId, String userId, String sizeId, Integer quantity){

        Product product = productRepository.findById(productId).orElseThrow(()-> new RuntimeException("Product Not Found"));

        User user = userRepository.findById(userId).orElseThrow(()-> new RuntimeException("User not found"));

        ProductSize size = productSizeRepository.findById(sizeId).orElseThrow(() -> new RuntimeException("Size not found"));

        Order orderStatus = orderRepository.findByProductProductIdAndUserIdAndSizeSizeId(productId, userId, sizeId);

        Order order = null;

        BigDecimal totalPrice;

        if (ObjectUtils.isEmpty(orderStatus)){
            order = new Order();
            order.setUser(user);
            order.setProduct(product);
            order.setSize(size);

            order.setQuantity(quantity);

            totalPrice = (product.getDiscountPrice() != null)
                          ? product.getDiscountPrice().multiply(BigDecimal.valueOf(quantity))
                          : product.getPrice().multiply(BigDecimal.valueOf(quantity));

            order.setTotalPrice(totalPrice);

        }else{
            order = orderStatus;

            order.setQuantity(orderStatus.getQuantity() + 1);

            totalPrice = (product.getDiscountPrice() != null)
                    ? product.getDiscountPrice().multiply(BigDecimal.valueOf(quantity))
                    : product.getPrice().multiply(BigDecimal.valueOf(quantity));

            order.setTotalPrice(totalPrice);
        }

        Order saveOrder = orderRepository.save(order);

        return saveOrder;

    }

    public void deleteOrder(String id){
        if(orderRepository.existsById(id)){
            orderRepository.deleteById(id);
        }else{
            throw new RuntimeException("Order Not Found");
        }
    }


}
