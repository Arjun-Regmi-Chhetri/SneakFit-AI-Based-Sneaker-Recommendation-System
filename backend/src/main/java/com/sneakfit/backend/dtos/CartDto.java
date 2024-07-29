package com.sneakfit.backend.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartDto {

    private String id;
    private String userId;

    private List<CartItemDto> cartItemDtos;

    private Date createdDate;

}
