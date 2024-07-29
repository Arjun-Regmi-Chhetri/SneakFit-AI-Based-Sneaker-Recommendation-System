package com.sneakfit.backend.generator;

import jakarta.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.util.List;

public class SubCategoryIdGenerator implements IdentifierGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {

        String query = "select subCategoryId from product_subcategory";
        Query queryObject = session.createQuery(query);
        List<String> subCategoryIds = queryObject.getResultList();

// Find the maximum existing ID and determine the next ID
        Integer maxIdNumber = 0;
        int defaultNumberOfDigits = 2; // Default to at least 2 digits

        for (String subCategoryId : subCategoryIds) {
            if (subCategoryId != null && subCategoryId.startsWith("SUB")) {
                String numberPart = subCategoryId.substring(3);
                try {
                    int idNumber = Integer.parseInt(numberPart);
                    if (idNumber > maxIdNumber) {
                        maxIdNumber = idNumber;
                    }
                } catch (NumberFormatException e) {
                    // Ignore invalid number formats
                }
            }
        }

// Increment the maximum ID number to get the next ID
        Integer newIdNumber = maxIdNumber + 1;
        int numberOfDigits = Math.max(defaultNumberOfDigits, Integer.toString(newIdNumber).length());

// Dynamically adjust the number of digits
        String format = "%0" + numberOfDigits + "d";

        String newSubCategoryId = "SUB" + String.format(format, newIdNumber);

        return newSubCategoryId;

    }





}
