package com.sneakfit.backend.model;

import com.sneakfit.backend.generator.ProductIdGenerator;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;


@Data
@Entity(name="product")
public class Product {

    @Id
    @GeneratedValue(generator = "product")
    @GenericGenerator(name = "product", type = ProductIdGenerator.class)
    private String productId;


    @ManyToOne
    @JoinColumn(name="productCategory")
    private ProductCategory productCategory;

    @ManyToOne
    @JoinColumn(name="product_subcategory")
    private ProductSubCategory productSubCategory;

    @ManyToOne
    @JoinColumn(name="productBrand")
    private ProductBrand productBrand;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "product_sizes",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "size_id")
    )
    private Set<ProductSize> productSizes = new HashSet<>();



    private String productColor;

    @Column(nullable = false)
    private String productName;



    @Column(columnDefinition = "TEXT")
    private String productDescription;

    @Column(nullable = false)
    private BigDecimal price;

    private BigDecimal discountPrice;


    private String productImage;








}
