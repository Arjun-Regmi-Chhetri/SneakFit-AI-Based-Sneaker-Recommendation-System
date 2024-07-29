package com.sneakfit.backend.generator;

import jakarta.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;
import java.util.List;

public class OrderIdGenerator implements IdentifierGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {

        String query = "select orderId from orders";
        Query queryObject = session.createQuery(query);

        List<String> orderIds = queryObject.getResultList();

        Integer maxIdNumber = 0;

        for (String orderId : orderIds) {
            if (orderId != null && orderId.startsWith("OD")) {
                String numberPart = orderId.substring(2);
                try {
                    int number = Integer.parseInt(numberPart);
                    if (number > maxIdNumber) {
                        maxIdNumber = number;
                    }
                } catch (NumberFormatException e) {
                    e.printStackTrace();
                }
            }
        }

        Integer newIdNumber = maxIdNumber + 1;
        String id = "OD" + String.format("%04d", newIdNumber); // Format to ensure at least 4 digits

        return id;
    }
}
