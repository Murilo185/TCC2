import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const getUserFromStorage = () => {
    try {
      const user = localStorage.getItem('usuarioPU');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Erro ao fazer parse do usuário:', error);
      return null;
    }
  };

  const getFirstLoginFromStorage = () => {
    try {
      const firstLogin = localStorage.getItem('firstLogin');
      return firstLogin === 'false' ? false : true; // Por padrão, considerar que é o primeiro login
    } catch (error) {
      console.error('Erro ao recuperar firstLogin:', error);
      return true;
    }
  };

  const storedUser = getUserFromStorage();

  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({
    nome: storedUser?.nome || 'nome',
    email: storedUser?.email || 'email',
    senha: storedUser?.senha || 'senha',
    complemento: storedUser?.complemento || 'complemento',
    cep: storedUser?.cep || 'cep',
    historico_pedido: storedUser?.historico_pedido || [],
    numero: storedUser?.numero || 'numero',
  });

  const [showNotification, setShowNotification] = useState(false);
  const [firstLogin, setFirstLogin] = useState(getFirstLoginFromStorage);

  const persUser = (nome, email, senha, complemento, historicoPedido) => {
    const usuario = {
      nome: nome || user.nome,
      email: email || user.email,
      senha: senha || user.senha,
      complemento: complemento || user.complemento,
      historico_pedido: historicoPedido || user.historico_pedido,
      cep: '02814-000',
      numero: 1,
    };

    try {
      localStorage.setItem('usuarioPU', JSON.stringify(usuario));
      setUser(usuario);
    } catch (error) {
      console.error('Erro ao salvar usuário no localStorage:', error);
    }
  };

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
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        return updatedItems;
      } else {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        return [...prevItems, product];
      }
    });
    setShowModal(true);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const handleCloseModal = () => setShowModal(false);

  // Função para controlar o firstLogin e salvar no localStorage
  const handleFirstLogin = (value) => {
    setFirstLogin(value);
    localStorage.setItem('firstLogin', value);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addProductToCart,
        removeFromCart,
        showModal,
        setShowModal,
        handleCloseModal,
        showNotification,
        user,
        setUser,
        persUser,
        firstLogin,
        setFirstLogin: handleFirstLogin, // Usar handleFirstLogin para persistir no localStorage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
