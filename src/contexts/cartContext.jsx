import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addProductToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Função para remover item do carrinho
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId)); // Filtra o item a ser removido
  };

  return (
    <CartContext.Provider value={{ cartItems, addProductToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
