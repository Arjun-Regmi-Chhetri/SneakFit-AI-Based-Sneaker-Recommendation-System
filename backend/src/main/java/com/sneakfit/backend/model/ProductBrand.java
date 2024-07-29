package com.sneakfit.backend.model;

import com.sneakfit.backend.generator.BrandIdGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;


@Data
@Entity(name = "product_brand")
public class ProductBrand {

    @Id
    @GeneratedValue(generator = "brand")
    @GenericGenerator(name = "brand", type = BrandIdGenerator.class)
    private String brandId;

    private String brandName;
    private String brandImage;
    private String brandDescription;

}
