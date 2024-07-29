package com.sneakfit.backend.model;

import com.sneakfit.backend.generator.CategoryIdGenerator;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.web.multipart.MultipartFile;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity(name = "product_category")
public class ProductCategory {

    @Id
    @GeneratedValue(generator = "category")
    @GenericGenerator(name = "category", type = CategoryIdGenerator.class)
    private String categoryId;

    private String categoryName;
    private String categoryImage;
    private String categoryDescription;





}
