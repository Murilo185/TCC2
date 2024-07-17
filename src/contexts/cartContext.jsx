import { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addProductToCart = (item, corSelecionada) => {
    setCartItems([
      ...cartItems,
      {
        ...item,
        cor: corSelecionada, // Use corSelecionada aqui
      },
    ]);
  };

  // Função para remover item do carrinho
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addProductToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
