import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  const [user, setUsersetUser] = useState({
    nome: localStorage.getItem('usuarioPU') ? JSON.parse(localStorage.getItem('usuarioPU')).nome : 'nome',
    email: localStorage.getItem('usuarioPU') ? JSON.parse(localStorage.getItem('usuarioPU')).email : 'email',
    senha: localStorage.getItem('usuarioPU') ? JSON.parse(localStorage.getItem('usuarioPU')).senha : 'senha',
    complemento: localStorage.getItem('usuarioPU') ? JSON.parse(localStorage.getItem('usuarioPU')).complemento : 'complemento',
    cep: localStorage.getItem('usuarioPU') ? JSON.parse(localStorage.getItem('usuarioPU')).cep : 'cep',
    historico_pedido: localStorage.getItem('usuarioPU') ? JSON.parse(localStorage.getItem('usuarioPU')).historico_pedido : 'historico_pedido',
    numero: localStorage.getItem('usuarioPU') ? JSON.parse(localStorage.getItem('usuarioPU')).numero : 'numero',
  })

  const [showNotification, setShowNotification] = useState(false);
  const [firstLogin, setFirstLogin] = useState(false);

  function persUser(nome, email, senha, complemento, historicoPedido) {
    localStorage.setItem('usuarioPU', JSON.stringify({
      nome: nome,
      email: email,
      senha: senha,
      complemento: complemento,
      historico_pedido: historicoPedido,
      cep: '02814-000',
      numero: 1,
    }))

    setUsersetUser({
      nome: nome,
      email: email,
      senha: senha,
      complemento: complemento,
      historico_pedido: historicoPedido,
      cep: '02814-000',
      numero: 1,
    })
  }

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
    <CartContext.Provider value={{ cartItems, addProductToCart, removeFromCart, showModal, handleCloseModal, showNotification, user, persUser, firstLogin, setFirstLogin }}> 
      {children}
    </CartContext.Provider>
  );
};
