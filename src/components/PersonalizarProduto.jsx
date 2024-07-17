import Cabecalho from "./cabecalho";
import Footer from "./Footer";
import estampa1 from '../assets/figma_icon.png';
import estampa2 from '../assets/estampa2.png';
import Dropdown from 'react-bootstrap/Dropdown';
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState, useRef } from 'react';
import { CartContext } from "../contexts/cartContext";
import { useParams } from 'react-router-dom';

export default function PersonalizarProduto() {
    
  const { addProductToCart, removeProductFromCart } = useContext(CartContext);
  const [preco, setPreco] = useState(0);
  const [click, setClick] = useState(false);
  const [quantidade, setQuantidade] = useState(1);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const inputFileRef = useRef(null);
  const { product } = useParams();

  // Lógica para determinar os produtos com base no parâmetro da rota (product)
  const produtos = product === 'camisa' ? [
    { nome: 'Algodão', preco: 39.90, imagem: "/src/assets/camisa.png" },
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

  function handleSubmit() {
    const produtoSelecionado = produtos.find((produto) => produto.preco === preco);
    if (produtoSelecionado) {
      addProductToCart({
        tipoProduto: produtoSelecionado.nome,
        quantidade,
        precoTotal: preco * quantidade,
        imagem: imagemSelecionada || produtoSelecionado.imagem,
        id: produtoSelecionado.nome 
      });

      removeProductFromCart(produtoSelecionado.nome); 
    } else {
      console.log("Nenhum produto selecionado.");
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

      <h1 className="text-center">Vamos criar seu {product}!</h1>
      <div className='h-[2px] bg-[purple] flex-grow-[1]'></div>
      <br />

      <div className="bg-[#999999]">
        <p>estampa</p>
        <div className="flex">
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <p>Sua estampa</p> 
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <img
                  src={imagemSelecionada || estampa1} 
                  alt=""
                  className="w-16 h-16 object-cover cursor-pointer"
                  onClick={() => inputFileRef.current.click()}
                />
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
                  <img src={estampa2} alt="" />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
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

      <div className="flex items-center justify-center" onClick={handleSubmit}>
        <button className="bg-[purple] rounded">
          Adicionar ao carrinho
        </button>
      </div>

      <Footer />
    </>
  );
}
