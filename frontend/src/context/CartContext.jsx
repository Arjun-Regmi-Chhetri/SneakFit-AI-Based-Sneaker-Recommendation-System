import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCartItem, removeItemfromCart, addToCart as addToCartService } from "../service/Service";
import { useAuth } from "./AuthContext"; // Assuming you have an AuthContext for authentication

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth(); // Assuming you have an AuthContext for authentication
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCart();
    }
  }, [isAuthenticated, user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await fetchCartItem(user.id); // Replace with your actual fetchCartItem function
      setCart(cartData);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      setLoading(true);
      await removeItemfromCart(cartId); // Replace with your actual removeItemfromCart function
      setCart(cart.filter((item) => item.cartId !== cartId));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, userId, quantity, sizeId) => {
    try {
      setLoading(true);
      const response = await addToCartService(productId, userId, quantity, sizeId); // Replace with your actual addToCart function
      fetchCart(); // Refresh cart after adding
      console.log("Product added to cart:", response);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // Other utility functions as needed

  return (
    <CartContext.Provider
      value={{ cart, loading, fetchCart, removeFromCart, addToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
