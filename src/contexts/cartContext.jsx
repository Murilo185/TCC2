import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addProductToCart = (product, cor = null, tamanho = null) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.cor === cor && item.tamanho === tamanho
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item === existingItem
            ? { ...item, quantidade: item.quantidade + product.quantidade }
            : item
        );
      } else {
        return [...prevItems, { ...product, cor, tamanho }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addProductToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
