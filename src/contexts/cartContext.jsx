import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const [showNotification, setShowNotification] = useState(false);

  const addProductToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.id === product.id &&
          item.cor === product.cor &&
          item.tamanho === product.tamanho
      );

      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item === existingItem
            ? { ...item, quantidade: item.quantidade + product.quantidade }
            : item
        );
        setShowNotification(true); // Atualiza dentro do callback
        setTimeout(() => setShowNotification(false), 3000);
        return updatedItems;
      } else {
        setShowNotification(true); // Atualiza dentro do callback
        setTimeout(() => setShowNotification(false), 3000);
        return [...prevItems, product];
      }
    });
    setShowModal(true); // Mostra o modal
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };
  const handleCloseModal = () => setShowModal(false); // Função para fechar o modal

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addProductToCart, 
      removeFromCart, 
      showModal, // Adiciona o estado showModal ao contexto
      handleCloseModal // Adiciona a função handleCloseModal ao contexto
    }}>
      {children}
    </CartContext.Provider>
  );
};
