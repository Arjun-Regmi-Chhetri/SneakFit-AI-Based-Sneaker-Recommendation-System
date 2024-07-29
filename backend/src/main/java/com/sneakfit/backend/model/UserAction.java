package com.sneakfit.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;


@Data
@Entity
public class UserAction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;

    
    private String userId;
    private String productId;


    @Enumerated(EnumType.STRING)
    private InteractionType interactionType;

    private Timestamp timestamp;

    public enum InteractionType {
        PURCHASE, SEARCH, ADD_TO_CART
    }






}
