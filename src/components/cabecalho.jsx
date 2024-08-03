import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { CiUser, CiShoppingCart } from 'react-icons/ci';
import { useContext, useState, useRef, useEffect } from 'react';
import { CartContext } from '../contexts/cartContext.jsx';
import { MdClose } from 'react-icons/md';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa'; // Importando ícones do React Icons

// Componentes de ícones
const WhatsAppIcon = ({ mensagem }) => {
  const numeroTelefone = "5511939460815"; // Substitua pelo número da empresa
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
      <FaEnvelope className="w-10 h-10 text-red-500" />
    </a>
  );
};

export default function Cabecalho() {
  const navigate = useNavigate();
  const { removeFromCart, cartItems } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);
  const iconsRef = useRef(null); // Ref para a caixa de ícones
  const [showIcons, setShowIcons] = useState(false); // Estado para controlar a visibilidade dos ícones
  const [mensagem, setMensagem] = useState("Olá, gostaria de fazer um pedido:\n\n"); // Estado para a mensagem

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
    let novaMensagem = "Gostaria de fazer um pedido:";
    cartItems.forEach((item) => {
      novaMensagem += `* ${item.tipoProduto} (${item.cor}, ${item.tamanho}) - ${item.quantidade}x R$${item.precoTotal.toFixed(2)}\n`;

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
    setShowIcons(true); // Mostrar ícones ao finalizar pedido
  };

  return (
    <div className='w-full flex flex-col justify-center items-center relative'>
      <div className='w-full flex justify-between bg-white py-3 px-5'>
        <Link to="/">
          <img src={logo} className='w-40' alt="Logo da loja" />
        </Link>

        <div className='flex h-full items-center justify-end'>
          <Link to="/sign-up">
            <CiUser className='w-[40px] h-auto text-[#733A8E]' />
          </Link>

          <div onClick={toggleCart} className="relative cursor-pointer">
            <CiShoppingCart className='w-[40px] h-auto text-[#733A8E]' />
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
                              <img src={item.imagemSelecionada || item.imagem} alt={item.tipoProduto} className="w-10 h-10 mr-2" />
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
                          <button onClick={() => removeFromCart(item.id)}>
                            <MdClose className="w-5 h-5 text-red-500 hover:text-red-700" />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button onClick={handleFinalizarPedido} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 w-full">
                      Finalizar Pedido
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showIcons && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div ref={iconsRef} className="bg-white p-4 rounded-md shadow-lg flex space-x-4">
            <WhatsAppIcon mensagem={mensagem} />
            <EmailIcon mensagem={mensagem} />
          </div>
        </div>
      )}
    </div>
  );
}
