package com.sneakfit.backend.generator;

import jakarta.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;

public class CategoryIdGenerator implements IdentifierGenerator {


    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {

        String query = "select max(categoryId) from product_category ";

        Query queryObject = session.createQuery(query);

        String category = (String) queryObject.getSingleResult();


        Integer id = (category != null) ? Integer.parseInt(category.substring(2)) +1 : 1;

        return "XO"+id;

    }

}
