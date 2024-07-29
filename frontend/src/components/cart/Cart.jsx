// Cart.js
import React, { useEffect } from 'react';
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';

const Cart = () => {
  const { cart, loading, fetchCart, removeFromCart } = useCart();


  const handleRemove = async (cartId) => {
    await removeFromCart(cartId);
    // Optionally, you can trigger a refetch of the cart here if needed
  };

  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="cart-page mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="flex flex-wrap flex-col md:flex-row gap-8 w-full justify-between">
          <div className="p-5 md:w-1/2 rounded-md">
            {cart.map((item) => (
              <CartItem
                key={item.cartId}
                item={item}
                onRemove={() => handleRemove(item.cartId)}
              />
            ))}
          </div>

          <div className="bg-gray-200 py-8 px-5 rounded-md w-1/4 h-80">
            <div className="mb-9">
              <div className="text-center bg-green-500 p-3 text-white font-bold rounded-md">
                <h2>Checkout</h2>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-600 my-3">Order Summary</h2>
              <div className="border-gray-400 border-b-2 px-3">
                <div className="flex justify-between my-2">
                  <h2 className="font-bold text-gray-500">Subtotal</h2>
                  <p className="font-bold text-gray-500">${total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between my-2">
                  <h2 className="font-bold text-gray-500">Shipping:</h2>
                  <p className="font-semibold text-sky-500">Free</p>
                </div>
              </div>
              <div className="flex justify-between px-3 my-2">
                <h2 className="text-gray-500 font-bold">Estimated Total:</h2>
                <p className="text-gray-600 font-bold">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
