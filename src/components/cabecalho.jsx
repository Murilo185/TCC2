import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { CiUser, CiShoppingCart } from 'react-icons/ci';
import { useContext, useState, useRef, useEffect } from 'react';
import { CartContext } from '../contexts/cartContext.jsx';
import { MdClose } from 'react-icons/md';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';


const WhatsAppIcon = ({ mensagem }) => {
  const numeroTelefone = "5511939460815";
  const mensagemCodificada = encodeURIComponent(mensagem);
  const linkWhatsApp = `https://wa.me/${numeroTelefone}?text=${mensagemCodificada}`;

  return (
    <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer">
      <FaWhatsapp className="w-10 h-10 text-green-500" />
    </a>
  );
};

const EmailIcon = ({ mensagem }) => {
  const mensagemCodificada = encodeURIComponent(mensagem);
  const linkEmail = `mailto:ljpresenteunico@gmail.com?body=${mensagemCodificada}`;

  return (
    <a href={linkEmail}>
      <FaEnvelope className="w-10 h-10 text-green-500" />
    </a>
  );
};

export default function Cabecalho() {
  const navigate = useNavigate();
  const { removeFromCart, cartItems, user, persUser } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);
  const iconsRef = useRef(null);
  const [showIcons, setShowIcons] = useState(false);
  const [mensagem, setMensagem] = useState("Olá, gostaria de fazer um pedido:\n\n");

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setShowCart(false);
    }
    if (iconsRef.current && !iconsRef.current.contains(event.target)) {
      setShowIcons(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartItems]);

  useEffect(() => {
    let novaMensagem = "Gostaria de fazer um pedido:\n";
    cartItems.forEach((item) => {
      novaMensagem += `* ${item.tipoProduto} (${item.cor ? `${item.cor}` : ''} ${item.tamanho ? `, ${item.tamanho}` : ''}) - ${item.quantidade}x R$${item.precoTotal.toFixed(2)}\n`;

      if (item.imagemPublicId) {
        const imageUrl = `https://res.cloudinary.com/dwgjwhkui/image/upload/${item.imagemPublicId}`;
        novaMensagem += `   Imagem da estampa: ${imageUrl}\n`;
      }
      novaMensagem += "\n";
    });
    novaMensagem += `\nTotal: R$${cartItems.reduce((total, item) => total + item.precoTotal, 0).toFixed(2)}`;
    setMensagem(novaMensagem);
  }, [cartItems]);

  const handleFinalizarPedido = () => {
    const novoPedido = {
      items: cartItems.map(item => ({
        id: item.id,
        quantidade: item.quantidade,
        precoTotal: item.precoTotal,
        // Adicione outros atributos se necessário
      })),
      userId: user.id, // Inclui o ID do usuário
      total: cartItems.reduce((total, item) => total + item.precoTotal, 0),
    };

    adicionarPedidoAoHistorico(novoPedido);
    const updatedHistorico = [...user.historico_pedido, ...cartItems];
    persUser(user.nome, user.email, user.senha, user.complemento, updatedHistorico);
    setShowIcons(true);

    axios.post('https://tcc2-backend2.onrender.com/order/register', novoPedido)
    .then(response => {
      adicionarPedidoAoHistorico(novoPedido);
      const updatedHistorico = [...user.historico_pedido, ...cartItems];
      persUser(user.nome, user.email, user.senha, user.complemento, updatedHistorico);
      setShowIcons(true);
      console.log(response.data)
    })
    .catch(error => {
      console.error('Erro ao finalizar o pedido:', error);
    });
  };
  const { adicionarPedidoAoHistorico } = useContext(CartContext);
  return (

    <div className="w-full flex flex-col justify-center items-center relative">
      <div className="w-full flex justify-between bg-white py-3 px-5">
        <Link to="/">
          <img src={logo} className="w-40" alt="Logo da loja" />
        </Link>

        <div className="flex h-full items-center justify-end">
          <Link to={user ? '/user' : '/sign-up'} onClick={(e) => { if (user) { e.preventDefault(); navigate('/user'); } }}>
            <CiUser className="w-[40px] h-auto text-[#733A8E]" />
          </Link>

          <div onClick={toggleCart} className="relative cursor-pointer">
            <CiShoppingCart className="w-[40px] h-auto text-[#733A8E]" />
            {showCart && (
              <div ref={cartRef} className="absolute top-full right-0 bg-white shadow-md rounded-md p-2 min-w-[300px] z-10">
                <h2 className="text-lg font-semibold mb-2">Carrinho de Compras</h2>
                {cartItems.length === 0 ? (
                  <p>Seu carrinho está vazio.</p>
                ) : (
                  <>
                    <ul className="divide-y divide-gray-200">
                      {cartItems.map((item, index) => (
                        <li className="py-2 flex items-center justify-between" key={index}>
                          <div className="flex items-center">
                            <Link to={`/item/${item.id}`} onClick={(e) => { e.preventDefault(); navigate(`/item/${item.id}`); }}>
                              <img
                                src={item.imagemSelecionada || item.imagem || `/${item.tipoProduto}.png`}
                                alt={item.tipoProduto}
                                className="w-10 h-10 mr-2"
                              />
                              <div>
                                <p className="font-medium">{item.tipoProduto}</p>
                                <p className="text-sm text-gray-500">
                                  {item.quantidade} x R$ {(item.precoTotal / item.quantidade).toFixed(2)} = R$ {item.precoTotal.toFixed(2)}
                                  {item.cor && <span className="ml-2 text-gray-700">Cor: {item.cor}</span>}
                                  {item.tamanho && <span className="ml-2 text-gray-700">Tamanho: {item.tamanho}</span>}
                                </p>
                              </div>
                            </Link>
                          </div>
                          <MdClose
                            className="cursor-pointer text-gray-500"
                            onClick={() => removeFromCart(item.id)}
                          />
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4">
                      <button
                        className="w-full bg-green-500 text-white py-2 rounded-md"
                        onClick={handleFinalizarPedido}
                      >
                        Finalizar Pedido
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showIcons && (
        <div ref={iconsRef} className="bg-white w-[150px] h-[150px] z-20 absolute top-[90px] right-[5px]">
          <div className="flex items-center justify-center h-full">
            <WhatsAppIcon mensagem={mensagem} />
            <EmailIcon mensagem={mensagem} />
          </div>
        </div>
      )}
    </div>
  );
}
