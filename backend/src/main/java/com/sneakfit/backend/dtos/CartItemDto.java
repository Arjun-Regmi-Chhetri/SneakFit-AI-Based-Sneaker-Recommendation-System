package com.sneakfit.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {

    private String id;
    private String productId;
    private String productName;
    private int quantity;
    private BigDecimal totalPrice;
    private Date addedDate;

}
