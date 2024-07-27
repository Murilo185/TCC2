import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { CiUser, CiShoppingCart } from 'react-icons/ci';
import { useContext, useState, useRef, useEffect } from 'react';
import { CartContext } from '../contexts/cartContext.jsx';
import { MdClose } from 'react-icons/md';

export default function Cabecalho() {
  const navigate = useNavigate();
  const { removeFromCart, cartItems } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);
  const [mensagem, setMensagem] = useState("Olá, gostaria de fazer um pedido AAAAAAAA:\n\n"); // Estado para a mensagem

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setShowCart(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown',
 handleClickOutside);  

    };
  }, [cartItems]);

  useEffect(() => { // Efeito para atualizar a mensagem quando o carrinho muda
    let novaMensagem = "Gostaria de fazer um pedido:";
    cartItems.forEach((item) => {
      novaMensagem += `* ${item.tipoProduto} (${item.cor}, ${item.tamanho}) - ${item.quantidade}x R$${item.precoTotal.toFixed(2)}\n`;

      if (item.imagemPublicId) { 
        const imageUrl = `https://res.cloudinary.com/dwgjwhkui/image/upload/${item.imagemPublicId}`; // URL da imagem no Cloudinary
        novaMensagem += `   Imagem da estampa: ${imageUrl}\n`;
      }

      novaMensagem += "\n";
    });
    novaMensagem += `\nTotal: R$${cartItems.reduce((total, item) => total + item.precoTotal, 0).toFixed(2)}`;
    setMensagem(novaMensagem); 
  }, [cartItems]); // Depende do cartItems

  function handleFinalizarPedido() {
    let mensagem = "Olá, gostaria de fazer um pedido:\n\n";
    let imageUrl;

    cartItems.forEach((item) => {
      mensagem += `* ${item.tipoProduto} (${item.cor}, ${item.tamanho}) - ${item.quantidade}x R$${item.precoTotal.toFixed(2)}\n`;

      if (item.imagemPublicId) {
        imageUrl = `https://res.cloudinary.com/dwgjwhkui/image/upload/${item.imagemPublicId}`; // URL da imagem no Cloudinary
        mensagem += `   Imagem da estampa: ${imageUrl}\n`;
      }

      mensagem += "\n";
    });

    mensagem += `\nTotal: R$${cartItems.reduce((total, item) => total + item.precoTotal, 0).toFixed(2)}`;

    const numeroTelefone = "5511947492920"; // Substitua pelo número da empresa
    const mensagemCodificada = encodeURIComponent(mensagem);

    window.location.href = `https://wa.me/${numeroTelefone}?text=${mensagemCodificada}`;
  }

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
              <div
                ref={cartRef}
                className="absolute top-full right-0 bg-white shadow-md rounded-md p-2 min-w-[300px] z-10"
              >
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
                              <img src={item.imagem} alt={item.tipoProduto} className="w-10 h-10 mr-2" />
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
    </div>
  );
}
