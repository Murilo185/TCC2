import { useContext } from 'react';
import { CartContext } from '../contexts/cartContext.jsx';
import Cabecalho from './cabecalho';
import { useNavigate } from 'react-router-dom';

const User = () => {
  const { user, setUser } = useContext(CartContext);
  const navigate = useNavigate();

  const limparHistorico = () => {
    const novoUser = { ...user, historico_pedido: [] };
    setUser(novoUser);
    localStorage.setItem('usuarioPU', JSON.stringify(novoUser)); // Salva no localStorage
  };

  const deslogar = () => {
    setUser(null); // Limpa o estado do usuário
    localStorage.removeItem('usuarioPU'); // Remove o usuário do localStorage
    navigate('/'); // Redireciona para a página inicial ou de login
};

  if (!user) {
    return <p className="p-4">Você não está logado.</p>;
  }

  return (
    <>
      <Cabecalho />
      <div className="p-4">
        <p className="text-xl font-bold mb-4">Nome do Usuário: {user.nome}</p>
        <h2 className="text-xl font-semibold mb-2">Histórico de Compras</h2>

        {user.historico_pedido && user.historico_pedido.length > 0 ? (
          <ul>
            {user.historico_pedido.map((pedido, index) => (
              <div key={index} className="bg-[#656565] my-4 p-4 rounded-lg text-white flex flex-col gap-4">
                <h1 className="text-left font-semibold">{pedido.item || pedido.tipoProduto}</h1>
                <div className="flex justify-center items-center gap-4">
                  <img
                    src={`${pedido.tipoProduto}.png`}
                    alt={pedido.item || pedido.nomeProduto}
                    className="w-32 h-32 object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/path/to/default-image.png';
                    }}
                  />
                  {pedido.imagemSelecionada || pedido.imagem ? (
                    <img
                      src={pedido.imagemSelecionada || pedido.imagem}
                      alt="Estampa"
                      className="w-32 h-32 object-cover"
                    />
                  ) : (
                    <p className="text-sm text-gray-400">Estampa não disponível</p>
                  )}
                </div>
                <ul className="flex flex-col gap-2">
                  <li className="flex justify-between">
                    <p className="font-medium">Quantidade:</p>
                    <p>{pedido.quantidade}</p>
                  </li>
                  <li className="flex justify-between">
                    <p className="font-medium">Preço Unitário:</p>
                    <p>R$ {pedido.preco}</p>
                  </li>
                  {pedido.cor && (
                    <li className="flex justify-between">
                      <p className="font-medium">Cor:</p>
                      <p>{pedido.cor}</p>
                    </li>
                  )}
                  {pedido.tamanho && (
                    <li className="flex justify-between">
                      <p className="font-medium">Tamanho:</p>
                      <p>{pedido.tamanho}</p>
                    </li>
                  )}
                  <li className="flex justify-between">
                    <p className="font-semibold">Preço Total:</p>
                    <p className="font-semibold">R$ {pedido.precoTotal}</p>
                  </li>
                </ul>
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Você ainda não fez nenhuma compra.</p>
        )}

        <div
          className="bg-red-500 text-white text-center py-3 rounded-[6px] uppercase cursor-pointer mt-4"
          onClick={limparHistorico}
        >
          Limpar Histórico
        </div>

        <div
          className="bg-blue-500 text-white text-center py-3 rounded-[6px] uppercase cursor-pointer mt-4"
          onClick={deslogar}
        >
          Sair
        </div>
      </div>
    </>
  );
};

export default User;
