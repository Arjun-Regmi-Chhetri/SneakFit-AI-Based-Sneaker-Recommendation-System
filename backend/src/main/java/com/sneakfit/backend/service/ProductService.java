package com.sneakfit.backend.service;

import com.sneakfit.backend.model.Product;
import com.sneakfit.backend.model.ProductSize;
import com.sneakfit.backend.repository.ProductRepository;
import com.sneakfit.backend.repository.ProductSizeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private FileUploadService fileUploadService;

    @Autowired
    private ProductSizeRepository productSizeRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(String id) {
        return productRepository.findById(id).orElse(null);
    }

    @Transactional
    public Product save(Product product, MultipartFile file) throws IOException {
        String image = fileUploadService.saveProductImage(file);
        product.setProductImage(image);

        // Ensure all ProductSize entities are managed
        Set<ProductSize> managedProductSizes = new HashSet<>();
        for (ProductSize size : product.getProductSizes()) {
            if (size.getSizeId() == null) {
                // New size, save and manage it
                productSizeRepository.save(size);
            } else {
                // Existing size, reattach to the persistence context
                ProductSize managedSize = productSizeRepository.findById(size.getSizeId())
                        .orElseThrow(() -> new RuntimeException("Size not found"));
                managedProductSizes.add(managedSize);
            }
        }
        product.setProductSizes(managedProductSizes);

        return productRepository.save(product);
    }


    public List<Product> getProductByCategoryName(String categoryName) {
        return productRepository.findByProductCategory_CategoryName(categoryName);
    }

    public List<Product>  getProductByBrandName(String brandName) {
        return productRepository.findByProductBrand_BrandName(brandName);
    }


    public List<Product> searchProducts(String searchQuery) {
        // Split the search query by spaces to handle multiple keywords
        // Split the search query by spaces to handle multiple keywords
        String[] keywords = searchQuery.split("\\s+");

        // Use the repository method to search by each keyword and combine results
        List<Product> products = null;
        for (String keyword : keywords) {
            if (products == null) {
                products = productRepository.findByProductNameContainingIgnoreCase(keyword);
            } else {
                products.addAll(productRepository.findByProductNameContainingIgnoreCase(keyword));
            }
        }

        // Remove duplicate products (if any)
        if (products != null) {
            products = products.stream().distinct().collect(Collectors.toList());
        }

        // If no products found, fetch products related to first two letters of search query
        if (products == null || products.isEmpty()) {
            String relatedSearchQuery = searchQuery.substring(0, Math.min(searchQuery.length(), 2));
            products = productRepository.findByProductNameStartingWithIgnoreCase(relatedSearchQuery);
        }
        return products;
    }


    @Transactional
    public Product update(Product product) {
        Set<ProductSize> managedProductSizes = new HashSet<>();

        for (ProductSize size : product.getProductSizes()) {
            if (size.getSizeId() == null) {
                // Save new sizes and add them to the managed set
                ProductSize newSize = productSizeRepository.save(size);
                managedProductSizes.add(newSize);
            } else {
                // Retrieve existing sizes and add them to the managed set
                ProductSize managedSize = productSizeRepository.findById(size.getSizeId())
                        .orElseThrow(() -> new RuntimeException("Size not found"));
                managedProductSizes.add(managedSize);
            }
        }

        product.setProductSizes(managedProductSizes);
        return productRepository.save(product);
    }


    public void deleteProductById(String id) {
        if(productRepository.existsById(id)) {
            productRepository.deleteById(id);
        }else{
            throw new RuntimeException("Product not found"+ id);
        }
    }



}
