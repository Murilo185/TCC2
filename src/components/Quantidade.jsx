import React, { useContext, useState, useRef } from 'react';

export default function Quantidade() {
    const [quantidade, setQuantidade] = useState(1);
    const handleQuantidadeClick = (novaQuantidade) => {
        setQuantidade(novaQuantidade);
        setClick(false);
    };
    const [click, setClick] = useState(false);
    return (
        <div className="mt-4">
            <p className="text-center">Quantidade:</p>
            <div className="grid grid-cols-3 gap-4 items-center transition-all duration-[1500ms]">
                {[1, 10, 15, 20, 50].map((qtd) => (
                    <button
                        key={qtd}
                        className={`
          px-4 py-3 rounded-md border flex items-center justify-center
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
        px-6 py-3 rounded-md border 
        ${click === true ? 'bg-purple-500 text-white' : 'bg-white text-gray-800'} 
        hover:bg-purple-600 hover:text-white
        text-2xl font-bold
      `}
                    onClick={() => {
                        const outraQuantidade = prompt("Digite a quantidade desejada:");
                        if (outraQuantidade && !isNaN(outraQuantidade)) {
                            setQuantidade(parseInt(outraQuantidade, 10));
                            setClick(true);
                        }
                    }}
                >
                    +
                </button>
            </div>
        </div>
    )
}