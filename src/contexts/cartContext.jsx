// contexts/CartContext.jsx
// eslint-disable-next-line no-unused-vars
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addProductToCart = (product) => {
    
    setCartItems([...cartItems, product]);

  };

  return (
    <CartContext.Provider value={{ cartItems, addProductToCart, setCartItems }}> 
      {children}
    </CartContext.Provider>
)};
