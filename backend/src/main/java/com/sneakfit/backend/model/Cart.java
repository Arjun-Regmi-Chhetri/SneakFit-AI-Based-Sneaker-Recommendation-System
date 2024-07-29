package com.sneakfit.backend.model;


import com.sneakfit.backend.generator.CartIdGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.*;

@Entity(name = "cart")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    @GeneratedValue(generator = "cart")
    @GenericGenerator(name="cart", type = CartIdGenerator.class)
    private String cartId;


    @ManyToOne
    private User user;

    @ManyToOne
    private Product product;

    @ManyToOne
    private ProductSize size;


    private BigDecimal totalPrice;

    private int quantity;


    private Date createdDate;

    @PrePersist
    protected void onCreate() {
        createdDate = new Date();
    }

}
