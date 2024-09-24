import React, { useState, useContext } from 'react';

import { CartContext } from '../contexts/cartContext.jsx';

const User = () => {

  const { user, persUser } = useContext(CartContext);

  const purchaseHistory = [
    { id: 1, item: 'Produto 1', date: '2024-09-01' },
    { id: 2, item: 'Produto 2', date: '2024-09-10' },
    { id: 3, item: 'Produto 3', date: '2024-09-15' },
  ];

  return (
    <div className="p-4">
      <p className="text-xl font-bold mb-4">Nome do Usuário: {user.nome}</p>
      <h2 className="text-xl font-semibold mb-2">Histórico de Compras</h2>
      
      {JSON.stringify(user.historico_pedido)}

      <ul>
        
        {user.historico_pedido.map((pedido) => (
          <div className='bg-[#656565] my-2 flex flex-row items-center justify-center flex-wrap text-white'>
            <h1 className='text-center w-full'>{pedido.item}</h1>
            <img
              src="https://siliconvalleygazette.com/posts/what-is-the-404-not-found-error.png"
              alt=""
              className='w-[33.33%]'
            />
            <div className='flex-grow-[1] mx-2'>
              <div className='flex w-full justify-between items-center'>
                <p>quantidade:</p>
                <p>{pedido.quantidade}</p>
              </div>
              
              <div className='flex w-full justify-between items-center'>
                <p>cor:</p>
                <p>azul</p>
              </div>
              
              <div className='flex w-full justify-between items-center'>
                <p>tamanho:</p>
                <p>G</p>
              </div>

            </div>
            <p className='w-[50%] text-left pl-3'>preço total: </p>
            <p className='w-[50%] text-right pr-3'>R$ 800.00</p>
          </div>
        ))}

        {purchaseHistory.map((purchase) => (
          <li key={purchase.id} className="bg-gray-200 p-2 mb-2 rounded">
            <p>{purchase.item}</p>
            <p className="text-sm text-gray-600">{purchase.date}</p>
          </li>
        ))}

      </ul>
      <div
        className={`bg-[#3bb239] text-white text-center py-3 rounded-[6px] uppercase`}
        onClick={() => persUser()}
      >
        atualizar
      </div>
    </div>
  );
};

export default User;
