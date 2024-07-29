package com.sneakfit.backend.model;

import com.sneakfit.backend.generator.OrderIdGenerator;
import com.sneakfit.backend.generator.TrackingNumberGenerator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.Date;

@Data
@Entity(name = "orders") // Changed table name to "orders"
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(generator = "order_id")
    @GenericGenerator(name = "order_id", strategy = "com.sneakfit.backend.generator.OrderIdGenerator")
    private String orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_product_id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "size_size_id")
    private ProductSize size;

    private int quantity;

    private BigDecimal totalPrice;

    private String trackingNumber;

    private Date orderDate;

    @PrePersist
    protected void onCreate() {
        orderDate = new Date();
        this.trackingNumber = TrackingNumberGenerator.generateTrackingNumber();
    }
}
