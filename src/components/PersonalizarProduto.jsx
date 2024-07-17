import Cabecalho from "./cabecalho";
import Footer from "./Footer";

import Dropdown from 'react-bootstrap/Dropdown';
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useRef } from 'react';
import { CartContext } from "../contexts/cartContext";
import { useParams } from 'react-router-dom';

export default function PersonalizarProduto() {
    
  const [corSelecionada, setCorSelecionada] = useState(null); // Inicialmente nenhuma cor selecionada
  const { addProductToCart } = useContext(CartContext);
  const [preco, setPreco] = useState(0);
  const [click, setClick] = useState(false);
  const [quantidade, setQuantidade] = useState(1);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const inputFileRef = useRef(null);
  const { product } = useParams();
  const [estampaSelecionada, setEstampaSelecionada] = useState(null);

  // Lógica para determinar os produtos com base no parâmetro da rota (product)
  const produtos = product === 'camisa' ? [
    { nome: 'Poliester', preco: 39.90, imagem: "/src/assets/camisa.png" },
    
    // ... outros tipos de camisas
  ] : product === 'caneca' ? [
    { nome: 'Porcelana', preco: 10.0, imagem: "/src/assets/canecaPorcelana.png" },
    { nome: 'Plástico', preco: 8.0, imagem: "/src/assets/caneca_transparente.webp" },
    { nome: 'Mágica', preco: 15.0, imagem: "/src/assets/canecaMagica.png" },
    { nome: 'Colher', preco: 12.0, imagem: "/src/assets/canecaColher.webp" },
  ] : product === 'almofada' ? [
    { nome: 'Almofada de algodão', preco: 19.90, imagem: "/src/assets/almofada.png" },
    // ... outros tipos de almofadas
  ] : product === 'caderno' ? [
    { nome: 'Caderno capa dura', preco: 19.90, imagem: "/src/assets/caderno.png" },
    // ... outros tipos de cadernos
  ] : product === 'azulejo' ? [
    { nome: 'Azulejo 10x10', preco: 19.90, imagem: "/src/assets/azulejo.png" },
    // ... outros tipos de azulejos
  ] : product === 'agenda' ? [
    { nome: 'Agenda 2024', preco: 14.90, imagem: "/src/assets/agenda.png" },
    // ... outros tipos de agendas
  ] : product === 'chaveiro' ? [
    { nome: 'Chaveiro Acrílico', preco: 12.90, imagem: "/src/assets/almochaveiro.png" },
    // ... outros tipos de chaveiros
  ] : [];

  const handleProdutoClick = (produtoPreco) => {
    setPreco(produtoPreco);
  };

  const handleQuantidadeClick = (novaQuantidade) => {
    setQuantidade(novaQuantidade);
    setClick(false);
  };

  // Adicione este array no topo do seu componente PersonalizarProduto
const estampasPreProntas = [
  { nome: 'Estampa 1', imagem: '/src/assets/estampasProntas/caneca1.jpg' },
  { nome: 'Estampa 2', imagem: '/src/assets/estampasProntas/caneca2.jpg' },
  // ...
];

function handleSubmit() {
  const produtoSelecionado = produtos.find((produto) => produto.preco === preco);
  if (produtoSelecionado && corSelecionada || imagemSelecionada) { // Verifica se há produto ou estampa
    addProductToCart({
      tipoProduto: produtoSelecionado ? produtoSelecionado.nome : 'Produto com Estampa',
      quantidade,
      precoTotal: preco * quantidade,
      imagem: imagemSelecionada || produtoSelecionado.imagem,
      id: produtoSelecionado ? produtoSelecionado.nome : Date.now() // ID único para estampas
    }, corSelecionada);
  } else {
    console.log("Nenhum produto ou estampa selecionado.");
  }
}

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagemSelecionada(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Cabecalho />
      

      <h1 className="text-center">Vamos criar sua {product}!</h1>
      <div className='h-[2px] bg-[purple] flex-grow-[1]'></div>
      <br />

      <div className="bg-[#999999]">
        <p>estampa</p>
        <div className="flex items-center justify-center">
          <div>
          <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    <p>Sua estampa</p>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    {!imagemSelecionada && ( // Exibir botão apenas se não houver imagem
      <button
        onClick={() => inputFileRef.current.click()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" // Estilização com Tailwind CSS
      >
        Enviar sua imagem aqui
      </button>
    )}
    {imagemSelecionada && ( // Exibir imagem se houver
      <img
        src={imagemSelecionada}
        alt=""
        className="w-16 h-16 object-cover cursor-pointer"
        onClick={() => inputFileRef.current.click()}
      />
    )}
    <input
      type="file"
      ref={inputFileRef}
      style={{ display: 'none' }}
      onChange={handleImageUpload}
    />
  </Dropdown.Menu>
</Dropdown>
          </div>
          <div className=" bg-white">
            <div>
            <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    <p>Estampa pré-pronta</p>
  </Dropdown.Toggle>
  <Dropdown.Menu>
    {estampasPreProntas.map((estampa) => (
      <Dropdown.Item
        key={estampa.nome}
        onClick={() => {
          setImagemSelecionada(estampa.imagem);
          setEstampaSelecionada(estampa); // Atualiza o estado da estampa selecionada
        }}
      >
        <img src={estampa.imagem} alt={estampa.nome} />
      </Dropdown.Item>
    ))}
  </Dropdown.Menu>
</Dropdown>
            </div>
            
          </div>
          
        </div>
        {estampaSelecionada || imagemSelecionada ? (
  <div className="mt-4">
    <h2 className="text-lg font-semibold text-center">Sua Arte:</h2>
    <div className="flex justify-center">
      <img
        src={estampaSelecionada?.imagem || imagemSelecionada}
        alt="Estampa Selecionada"
        className="w-48 h-48 object-cover pb-3"
      />
    </div>
  </div>
) : null}
      </div>
      

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
        {produtos.map((produto) => (
          <div
            key={produto.nome}
            className={`transition-all duration-[100ms] rounded-lg p-4 cursor-pointer ${preco === produto.preco ? "border-green-950 border-[10px]" : "border-black border-2"}`}
            onClick={() => handleProdutoClick(produto.preco)}
          >
            <img src={produto.imagem} alt="" />
            <p className="text-center">{produto.nome}</p>
            <p className="text-center">{produto.preco}</p>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <p className="text-center">Quantidade:</p>
        <div className="grid grid-cols-3 gap-4 ">
          {[1, 10, 15, 20, 50].map((qtd) => (
            <div
              key={qtd}
              className={`rounded-lg p-2 cursor-pointer border-2 h-[40px] ${quantidade === qtd ? 'border-green-950' : ''}`}
              onClick={() => handleQuantidadeClick(qtd)}
            >
              {qtd}
            </div>
          ))}
          <div 
            className={`border-2 rounded-lg p-2 cursor-pointer text-[10px] ${click === true ? 'border-green-950' : ""}`}
            onClick={() => {
              const outraQuantidade = prompt("Digite a quantidade desejada:");
              if (outraQuantidade && !isNaN(outraQuantidade)) {
                setQuantidade(parseInt(outraQuantidade, 10));
                setClick(true);
              }
            }}
          >
            Outras quantidades
          </div>
        </div>
      </div>

      <p className="mt-4 text-center">
        Preço total: R$ {(preco * quantidade).toFixed(2)}
      </p>
      {product === 'camisa' && ( // Exibir apenas se for a página da camisa
      <div className="mt-4">
        <p className="text-center">Cor:</p>
        <div className="flex justify-center space-x-4">
          {['Branco', 'Preto', 'Verde', 'Vermelho'].map((cor) => (
            <label key={cor} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="cor"
                value={cor}
                checked={corSelecionada === cor}
                onChange={() => setCorSelecionada(cor)}
              />
              <span>{cor}</span>
            </label>
          ))}
        </div>
      </div>
    )}
      
      <div className="flex items-center justify-center" onClick={handleSubmit}>
        <button className="bg-[purple] rounded">
          Adicionar ao carrinho
        </button>
      </div>

      <Footer />
    </>
  );
}
