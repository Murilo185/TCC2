import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [numeroTelefone, setNumeroTelefone] = useState("5511939460815"); // Número no contexto
  const addProductToCart = (product) => { // Removemos os parâmetros cor e tamanho
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.cor === product.cor && item.tamanho === product.tamanho
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item === existingItem
            ? { ...item, quantidade: item.quantidade + product.quantidade }
            : item
        );
      } else {
        return [...prevItems, product]; // Adiciona o objeto product completo
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addProductToCart, 
      removeFromCart,
      numeroTelefone, // Adicione o número ao contexto
    }}>
      {children}
    </CartContext.Provider>
  );
};
