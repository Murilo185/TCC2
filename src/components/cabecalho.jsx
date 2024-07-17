import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { CiUser, CiShoppingCart } from 'react-icons/ci';
import { useContext, useState, useRef, useEffect } from 'react';
import { CartContext } from '../contexts/cartContext.jsx';
import { MdClose } from 'react-icons/md'; 

export default function Cabecalho() {
  const { removeFromCart } = useContext(CartContext);
  const { cartItems } = useContext(CartContext); 
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);

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
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='w-full flex flex-col justify-center items-center relative'>
      <div className='w-full flex justify-between bg-white py-3 px-5'>
        <Link to="/">
          <img src={logo} className='w-40' alt="Logo da loja" />
        </Link>
        
        <div className='flex h-full items-center justify-end'>
          <Link to="/login">
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
                  <ul className="divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <Link to={`/item/${item.id}`} key={index}> 
                        <li className="py-2 flex items-center justify-between">
                          <img src={item.imagem} alt={item.tipoProduto} className="w-10 h-10 mr-2" />
                          <div>
                            <p className="font-medium">{item.tipoProduto}</p>
                            <p className="text-sm text-gray-500">
                              {item.quantidade} x R$ {(item.precoTotal / item.quantidade).toFixed(2)} = R$ {item.precoTotal.toFixed(2)}
                              {item.cor && <p className="text-sm text-gray-500">Cor: {item.cor}</p>} 
                            </p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)}> 
                            <MdClose className="w-5 h-5 text-red-500 hover:text-red-700" />
                          </button>
                        </li>
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
