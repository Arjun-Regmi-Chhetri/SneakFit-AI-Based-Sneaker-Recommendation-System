package com.sneakfit.backend.generator;

import jakarta.persistence.Query;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;

public class UserIdGenerator implements IdentifierGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
        String query = "select max(id) from User";
        Query queryObject = session.createQuery(query);
        String userId = (String)queryObject.getSingleResult();

        Integer id = (userId != null) ? Integer.valueOf(userId.substring(2)) + 1 : 1;

        return "UO" + id;
    }
}
