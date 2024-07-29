package com.sneakfit.backend.model;


import com.sneakfit.backend.generator.SubCategoryIdGenerator;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Data
@Entity( name = "product_subcategory")
public class ProductSubCategory {

    @Id
    @GeneratedValue(generator = "subcategory")
    @GenericGenerator(name = "subcategory", type = SubCategoryIdGenerator.class)
    private String subCategoryId;


    private String subCategoryName;
    private String subCategoryDescription;
}
