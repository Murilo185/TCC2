import React, { useContext, useState, useRef } from 'react';
import { CartContext } from "../contexts/cartContext";
import { useParams } from 'react-router-dom';
import Quantidade from "./Quantidade";
import { QuantidadeContext } from "../contexts/quantidadeContext";
import Cabecalho from "./cabecalho";
import Footer from "./Footer";
import Dropdown from 'react-bootstrap/Dropdown';
import { Image, Transformation } from 'cloudinary-react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'; 


export default function PersonalizarProduto() {
  const { quantidade } = useContext(QuantidadeContext); // Consuma o contexto


  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const tamanhosDisponiveis = ['P', 'M', 'G', 'GG']; // Tamanhos de camisa disponíveis

  const coresDisponiveis = ['Branco', 'Preto', 'Verde', 'Vermelho', 'Azul', 'Amarelo']; 



  const [corSelecionada, setCorSelecionada] = useState(null); // Inicialmente nenhuma cor selecionada
  const { addProductToCart } = useContext(CartContext);
  const [preco, setPreco] = useState(0);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const inputFileRef = useRef(null);
  const { product } = useParams();
  const [estampaSelecionada, setEstampaSelecionada] = useState(null);
  const { showModal, handleCloseModal } = useContext(CartContext);

  // Lógica para determinar os produtos com base no parâmetro da rota (product)
  const produtos = product === 'camisa' ? [
    { nome: 'Poliester', preco: 39.90, imagem: "/camisa.png" }, 

    // ... outros tipos de camisas
  ] : product === 'caneca' ? [
    { nome: 'Porcelana', preco: 10.0, imagem: "/canecaPorcelana.png" },
    { nome: 'Plástico', preco: 8.0, imagem: "/caneca_transparente.webp" },
    { nome: 'Mágica', preco: 15.0, imagem: "/canecaMagica.png" },
    { nome: 'Colher', preco: 12.0, imagem: "/canecaColher.webp" },
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
  
  // Adicione este array no topo do seu componente PersonalizarProduto
  const estampasPreProntas = [
    { nome: 'Estampa 1', imagem: '/src/assets/estampasProntas/caneca1.jpg' },
    { nome: 'Estampa 2', imagem: '/src/assets/estampasProntas/caneca2.jpg' },
    // ...
  ];
  const [setShowModal] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const [imagemPublicId, setImagemPublicId] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset','preset1'); // Substitua pelo nome do seu Upload Preset

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dwgjwhkui/image/upload`, // Substitua pelo seu Cloud Name
          {
            method: 'POST',
            body: formData,
          }
        );
        if (!response.ok) { // Verifica se a resposta não foi bem-sucedida
          throw new Error(`Erro no upload: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setImagemSelecionada(data.secure_url);
        setImagemPublicId(data.public_id);
        
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
        // Lide com o erro de forma mais amigável para o usuário (ex: exibindo um alerta)
      }
    }
  };

  const handleEstampaPreProntaClick = async (estampa) => {
    try {
      // Envia a imagem pré-pronta para o Cloudinary
      const response = await fetch(estampa.imagem);
      if (!response.ok) {
        throw new Error(`Erro ao buscar imagem: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const file = new File([blob], 'estampa.jpg', { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'preset1');

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/dwgjwhkui/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error(`Erro no upload: ${uploadResponse.status} ${uploadResponse.statusText}`);
      }
      
      const data = await uploadResponse.json();
      setImagemSelecionada(data.secure_url); // Atualiza o estado com a URL da imagem
      setImagemPublicId(data.public_id); // Atualiza o estado com o public_id da imagem
      
    } catch (error) {
      console.error("Erro ao enviar a imagem pré-pronta:", error);
      alert("Ocorreu um erro ao selecionar a estampa pré-pronta. Por favor, tente novamente.");
    }
  };

  function handleSubmit() {
    const produtoSelecionado = produtos.find((produto) => produto.preco === preco);

    if (produtoSelecionado) {
      const productToAdd = {
        tipoProduto: produtoSelecionado.nome,
        quantidade,
        precoTotal: preco * quantidade,
        imagem: imagemSelecionada,
        imagemPublicId: imagemPublicId,
        id: generateUniqueId(),
        cor: corSelecionada,
        tamanho: tamanhoSelecionado
      };

      if (product === 'camisa') {
        if (corSelecionada && tamanhoSelecionado) {
          // ... (lógica para camisas)
        } else {
          console.log("Por favor, selecione uma cor e um tamanho para a camisa.");
          return; 
        }
      }
      addProductToCart(productToAdd);
      setShowModal(true);
    } else {
      console.log("Por favor, selecione um produto.");
    }
  }
  {showNotification && ( // Exibe a notificação se showNotification for true
    <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md">
      Item adicionado ao carrinho!
    </div>
  )}
  // ... (resto do seu código JSX) ...

  {imagemSelecionada && (
    <Image
      cloudName="dwgjwhkui" // Substitua pelo seu Cloud Name
      publicId={imagemPublicId}
      width="300"
      crop="scale"
    >
      <Transformation quality="auto" fetchFormat="auto" />
    </Image>
  )}







  function generateUniqueId() {
    const timestamp = Date.now().toString(36); // Converte para base 36 (letras e números)
    const randomNum = Math.random().toString(36).substr(2, 5); // Gera 5 caracteres aleatórios
    return `${timestamp}-${randomNum}`;
  }

  

  return (
    <>
      <Cabecalho />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Produto Adicionado!</Modal.Title>
        </Modal.Header>
        <Modal.Body>O item foi adicionado ao seu carrinho.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

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
                    onClick={() => handleEstampaPreProntaClick(estampa)} // Chama a função ao clicar
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


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2 justify-center">
        {produtos.map((produto) => (
          <div // Container principal do produto
            key={produto.nome}
            className={`
        transition-all duration-[150ms] rounded-lg cursor-pointer relative
        ${preco === produto.preco ? "border-green-950 border-[5px]" : "border-black border-2"}
      `}
            onClick={() => handleProdutoClick(produto.preco)}
          >
            <div className="bg-white rounded-t-md border-b border-gray-300"> {/* Adiciona border-b border-gray-300 */}
              <img src={produto.imagem} alt="" className="rounded-t-md" />
            </div>
            <div className="bg-white rounded-b-md p-2 text-center">
              <p className="text-center font-medium">{produto.nome}</p>
              <p className="text-center">R$ {produto.preco.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {product === 'camisa' && ( // Exibir apenas se for a página da camisa
        <>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-tamanho">
              {tamanhoSelecionado || "Selecione um tamanho"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {tamanhosDisponiveis.map((tamanho) => (
                <Dropdown.Item key={tamanho} onClick={() => setTamanhoSelecionado(tamanho)}>
                  {tamanho}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown> {/* Dropdown para cores */}
        <Dropdown.Toggle variant="success" id="dropdown-cor">
          {corSelecionada || "Selecione uma cor"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {coresDisponiveis.map((cor) => (
            <Dropdown.Item key={cor} onClick={() => setCorSelecionada(cor)}>
              {cor}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
        </>
      )}


      <Quantidade />

      <p className="mt-4 text-center">
        <span className="bg-gray-200 font-bold rounded-md px-4 py-2"> {/* Estilização */}
          <span className="text-purple-600" >Valor total</span>: R$ {(preco * quantidade).toFixed(2)}
        </span>
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
