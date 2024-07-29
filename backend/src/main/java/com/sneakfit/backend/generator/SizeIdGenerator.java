package com.sneakfit.backend.generator;


import jakarta.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;


import java.io.Serializable;





public class SizeIdGenerator implements IdentifierGenerator {


    @Override

    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {

        String query = "select max(sizeId) from product_size";
        Query queryObject = session.createQuery(query);
        String lastSizeId = (String) queryObject.getSingleResult();

        int idNumber = (lastSizeId != null) ? Integer.parseInt(lastSizeId.substring(2)) + 1 : 1;

        return "SO" + idNumber;
    }





}
