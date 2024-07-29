package com.sneakfit.backend.model;



import com.sneakfit.backend.generator.SizeIdGenerator;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.Set;


@Data

@Entity(name = "product_size")
public class ProductSize {

    @Id
    @GenericGenerator(name="size",type=SizeIdGenerator.class)
    @GeneratedValue(generator ="size")
    private String sizeId;

    private String sizeName;

}
