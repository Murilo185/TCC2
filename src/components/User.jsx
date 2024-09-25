import React, { useContext } from 'react';
import { CartContext } from '../contexts/cartContext.jsx';
import Cabecalho from './cabecalho';

const User = () => {
  const { user, persUser, setUser } = useContext(CartContext);

  const limparHistorico = () => {
    const novoUser = { ...user, historico_pedido: [] }; // Limpa o histórico
    setUser(novoUser); // Atualiza o estado global do usuário
  };

  return (
    <>
      <Cabecalho />
      <div className="p-4">
        <p className="text-xl font-bold mb-4">Nome do Usuário: {user.nome}</p>

        <h2 className="text-xl font-semibold mb-2">Histórico de Compras</h2>

        {user.historico_pedido && user.historico_pedido.length > 0 ? (
          <ul>
            {user.historico_pedido.map((pedido, index) => (
              <div
                key={index}
                className="bg-[#656565] my-2 flex flex-col md:flex-row items-center justify-between text-white p-3 rounded"
              >
                <h1 className="text-center w-full font-semibold mb-2">
                  {pedido.item || pedido.tipoProduto}
                </h1>

                {/* Contêiner para imagens */}
                <div className="flex justify-center items-center w-full gap-4">
                  {/* Exibir a imagem da estampa, se o caminho estiver correto */}
                  {pedido.imagemSelecionada || pedido.imagem ? (
                    <img
                      src={pedido.imagemSelecionada || pedido.imagem}
                      alt="Estampa"
                      className="w-32 h-32 object-cover"
                      onError={(e) => {
                        e.target.onerror = null; // Previne loops infinitos de erro
                        e.target.src = '/path/to/default-image.png'; // Exibe uma imagem padrão caso ocorra erro
                      }}
                    />
                  ) : (
                    <p>Estampa não encontrada</p> // Mensagem caso a estampa não exista
                  )}

                  {/* Exibir a imagem do produto */}
                  <img
                    src={`${pedido.tipoProduto}.png`}
                    alt={pedido.item || pedido.nomeProduto}
                    className="w-32 h-32 object-cover"
                  />
                </div>

                <div className="flex-grow mx-2 mt-4 md:mt-0">
                  <div className="flex w-full justify-between items-center">
                    <p className="font-medium">Quantidade:</p>
                    <p>{pedido.quantidade}</p>
                  </div>

                  {pedido.cor && (
                    <div className="flex w-full justify-between items-center">
                      <p className="font-medium">Cor:</p>
                      <p>{pedido.cor}</p>
                    </div>
                  )}

                  {pedido.tamanho && (
                    <div className="flex w-full justify-between items-center">
                      <p className="font-medium">Tamanho:</p>
                      <p>{pedido.tamanho}</p>
                    </div>
                  )}
                </div>

                <div className="w-full flex justify-between items-center mt-3">
                  <p className="font-semibold">Preço Total:</p>
                  <p className="font-semibold">
                    R$ {pedido.precoTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Você ainda não fez nenhuma compra.</p>
        )}

        <div
          className="bg-[#3bb239] text-white text-center py-3 rounded-[6px] uppercase cursor-pointer mt-4"
          onClick={() => persUser()}
        >
          Atualizar
        </div>

        <div
          className="bg-red-500 text-white text-center py-3 rounded-[6px] uppercase cursor-pointer mt-4"
          onClick={limparHistorico}
        >
          Limpar Histórico
        </div>
      </div>
    </>
  );
};

export default User;
