package com.sneakfit.backend.generator;

import jakarta.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;

public class BrandIdGenerator implements IdentifierGenerator {


    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {

        String query = "select max(brandId) from product_brand ";
        Query queryObject = session.createQuery(query);
        String brandId = (String) queryObject.getSingleResult();


        Integer id = (brandId != null) ? Integer.parseInt(brandId.substring(2)) + 1: 1;

        return "BO"+id;




    }
}
