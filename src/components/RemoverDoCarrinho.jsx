// RemoverDoCarrinho.jsx
import React, { useContext } from 'react';
import { CartContext } from '../contexts/cartContext';

function RemoverDoCarrinho({ productId }) {
  const { removeProductFromCart } = useContext(CartContext);

  const handleRemoveClick = () => {
    removeProductFromCart(productId);
  };

  return (
    <button onClick={handleRemoveClick}>
      X {/* Ou qualquer ícone que você preferir */}
    </button>
  );
}

export default RemoverDoCarrinho;
