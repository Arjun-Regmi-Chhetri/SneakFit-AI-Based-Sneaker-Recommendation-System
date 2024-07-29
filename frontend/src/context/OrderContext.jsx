import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchAllOrder,
  fetchOrderItem,
  removeItemFromOrder,
  addOrder,
} from "../service/Service";
import { useAuth } from "./AuthContext";


const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { isAuthenticated , user} = useAuth();


  const [order, setOrder] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const allOrder = await fetchAllOrder();
      setOrder(allOrder);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /*
        try{
            setLoading(true)
        }catch(error){
            throw error
        }finally{
            setLoading(false)
        }

    */

  const fetchOrderList = async () => {
    try {
      setLoading(true);
      const orderItem = await fetchOrderItem(user.id);
      setOrder(orderItem);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeOrder = async (orderId) => {
    try {
      setLoading(true);
      await removeItemFromOrder(orderId);
      setOrder(order.filter((item) => item.orderId !== orderId))
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const makeOrder = async (userId, productId, sizeId, quantity) => {
    try {
      setLoading(true);
      const order = await addOrder(userId, productId, sizeId, quantity)
      setOrder(order)
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if( isAuthenticated &&  user){
        fetchOrderList()
    }
  },[isAuthenticated, user])

  return (
    <OrderContext.Provider
      value={{ order, loading, fetchOrder, fetchOrderList, removeOrder, makeOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
