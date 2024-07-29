package com.sneakfit.backend.controller;

import com.sneakfit.backend.model.*;
import com.sneakfit.backend.repository.ProductSizeRepository;
import com.sneakfit.backend.service.FileUploadService;
import com.sneakfit.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/sneaker")

public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private FileUploadService fileUploadService;
    @Autowired
    private ProductSizeRepository productSizeRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/sneaker{id}")
    public Product getProduct( @PathVariable String id) {
        return productService.getProductById(id);
    }


    @GetMapping("/category")
    public ResponseEntity<List<Product>> getProductsByCategory(@RequestParam String categoryName) {
        return ResponseEntity.ok(productService.getProductByCategoryName(categoryName));
    }


    @GetMapping("/brand")
    public ResponseEntity<List<Product>> getProductsByBrand(@RequestParam String brandName) {
        return ResponseEntity.ok(productService.getProductByBrandName(brandName));
    }


    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        return ResponseEntity.ok(productService.searchProducts(keyword));
    }

    @PostMapping("/addProduct")
    public ResponseEntity<?> addProduct(
            @RequestParam("productName") String productName,
            @RequestParam("productDescription") String productDescription,
            @RequestParam("price") BigDecimal price,
            @RequestParam(value = "discountPrice", required = false) BigDecimal discountPrice,
            @RequestParam("productCategory") ProductCategory productCategory,
            @RequestParam("productSubCategory") ProductSubCategory productSubCategory,
            @RequestParam("productBrand") ProductBrand productBrand,
            @RequestParam("productSizes") Set<String> productSizes,
            @RequestParam("productColor") String productColor,
            @RequestParam(value = "productImage", required = false) MultipartFile productImage
    ) {

        try {

            Set<ProductSize> sizes = new HashSet<>();
            for (String sizeId : productSizes) {
                ProductSize productSize = new ProductSize();
                productSize.setSizeId(sizeId);
                sizes.add(productSize);
            }
                Product product = new Product();
                product.setProductName(productName);
                product.setProductDescription(productDescription);
                product.setPrice(price);
                product.setDiscountPrice(discountPrice);
                product.setProductCategory(productCategory);
                product.setProductBrand(productBrand);
                product.setProductSizes(sizes);
                product.setProductColor(productColor);
                product.setProductSubCategory(productSubCategory);

                Product saveProduct = productService.save(product, productImage);
                return ResponseEntity.ok(saveProduct);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save image: " + e.getMessage());
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
            }

    }





    @PutMapping("/update/product={id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable String id,
            @RequestParam(name = "productName", required = false) String productName,
            @RequestParam(name="productDescription", required = false) String productDescription,
            @RequestParam(name = "price", required = false) BigDecimal price,
            @RequestParam(value = "discountPrice", required = false) BigDecimal discountPrice,
            @RequestParam(name = "productCategory", required = false) ProductCategory productCategory,
            @RequestParam(name = "productSubCategory", required = false) ProductSubCategory productSubCategory,
            @RequestParam(name = "productBrand", required = false) ProductBrand productBrand,
            @RequestParam(name = "productSizes", required = false) Set<String> productSizes,
            @RequestParam(name = "productColor", required = false) String productColor,
            @RequestParam(value = "productImage", required = false) MultipartFile productImage) throws IOException {

        Product product = productService.getProductById(id);

        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        if (productName != null) {
            product.setProductName(productName);
        }

        if (productDescription != null) {
            product.setProductDescription(productDescription);
        }

        if (price != null) {
            product.setPrice(price);
        }

        if (discountPrice != null) {
            product.setDiscountPrice(discountPrice);
        }

        if (productCategory != null) {
            product.setProductCategory(productCategory);
        }

        if (productSubCategory != null) {
            product.setProductSubCategory(productSubCategory);
        }

        if (productBrand != null) {
            product.setProductBrand(productBrand);
        }

        if (productSizes != null && !productSizes.isEmpty()) {
            Set<ProductSize> sizes = new HashSet<>();
            for (String sizeId : productSizes) {
                ProductSize productSize = new ProductSize();
                productSize.setSizeId(sizeId);
                sizes.add(productSize);
            }
            product.setProductSizes(sizes);
        }

        if (productColor != null) {
            product.setProductColor(productColor);
        }

        if (productImage != null && !productImage.isEmpty()) {
            String image = fileUploadService.saveProductImage(productImage);
            product.setProductImage(image);
        }

        return ResponseEntity.ok(productService.update(product));
    }




    @DeleteMapping("/delete{id}")

    public ResponseEntity<Void>  deleteProduct(@PathVariable String id) {
        productService.deleteProductById(id);
        return ResponseEntity.noContent().build();


    }



}
