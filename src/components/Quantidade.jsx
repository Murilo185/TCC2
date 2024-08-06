import React, { useContext, useState } from 'react';
import { QuantidadeContext } from "../contexts/quantidadeContext";

export default function Quantidade() {
  const { quantidade, setQuantidade } = useContext(QuantidadeContext);
  const [click, setClick] = useState(false);

  const handleQuantidadeClick = (novaQuantidade) => {
    setQuantidade(novaQuantidade);
    setClick(false);
  };

  return (
    <div className="mt-4 px-0">
      <h4 className="text-xl font-semibold text-center">Escolha a quantidade</h4> 
      <div className="flex justify-center space-x-2 transition-all duration-[1500ms]">
        {[1, 5, 10, 20, 50].map((qtd) => (
          <button
            key={qtd}
            className={`
              px-2 py-1 rounded-md border flex items-center justify-center
              ${quantidade === qtd ? 'bg-purple-500 text-white' : 'bg-white text-gray-800'} 
              hover:bg-purple-600
            `}
            onClick={() => handleQuantidadeClick(qtd)}
          >
            {qtd}
          </button>
        ))}

        <button
          className={`
            px-2 py-1 rounded-md border flex items-center justify-center
            ${click === true ? 'bg-purple-500 text-white' : 'bg-white text-gray-800'} 
            hover:bg-purple-600 hover:text-white
            text-2xl font-bold
          `}
          onClick={() => {
            const outraQuantidade = prompt("Digite a quantidade desejada (mínimo 20):");
            if (outraQuantidade && !isNaN(outraQuantidade) && parseInt(outraQuantidade, 10)) {
              setQuantidade(parseInt(outraQuantidade, 10));
              setClick(true);
            }
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
