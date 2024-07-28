import React, { useContext, useState, useRef, useEffect } from 'react';
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

  const produtos = [
    { id: 1, nome: 'Poliester', preco: 39.90, imagem: "/camisa.png", categoria: 'camisa' },

    { id: 3, nome: 'Caneca Porcelana', preco: 35.0, imagem: "/canecaPorcelana.png", categoria: 'caneca' },
    { id: 4, nome: 'Caneca Plástica', preco: 29.0, imagem: "/caneca_transparente.webp", categoria: 'caneca' },
    { id: 5, nome: 'Caneca Mágica', preco: 40.0, imagem: "/canecaMagica.png", categoria: 'caneca' },
    { id: 6, nome: 'Caneca de Colher', preco: 40.0, imagem: "/canecaColher.webp", categoria: 'caneca' },

    { id: 7, nome: 'Almofada dois lados 28x20cm', preco: 19.90, imagem: "/src/assets/almofada.png", categoria: 'almofada' },
    { id: 8, nome: 'Almofada dois lados 40x28', preco: 49.90, imagem: "/src/assets/almofada.png", categoria: 'almofada' },
    { id: 9, nome: 'Almofada cubo 15x15', preco: 19.90, imagem: "/src/assets/almofada.png", categoria: 'almofada' },
    { id: 10, nome: 'Almofada cubo 20x20', preco: 29.90, imagem: "/src/assets/almofada.png", categoria: 'almofada' },

    { id: 11, nome: 'Caderno capa dura', preco: 19.90, imagem: "/src/assets/caderno.png", categoria: 'caderno' },
    // ... outros tipos de cadernos
    { id: 12, nome: 'Azulejo 10x10', preco: 19.90, imagem: "/src/assets/azulejo.png", categoria: 'azulejo' },
    // ... outros tipos de azulejos
    { id: 13, nome: 'Agenda 2024', preco: 14.90, imagem: "/src/assets/agenda.png", categoria: 'agenda' },
    // ... outros tipos de agendas
    { id: 14, nome: 'Almochaveiro', preco: 4, imagem: "/src/assets/almochaveiro.png", categoria: 'chaveiro' },
    // ... outros tipos de chaveiros
  ];
  const { product } = useParams();
  const { quantidade } = useContext(QuantidadeContext); // Consuma o contexto
  const defaultProduct = produtos.find(p => p.categoria === product) || produtos[0];
  const [tipoProdutoSelecionado, setTipoProdutoSelecionado] = useState(defaultProduct.categoria);

  const defaultCor = (product === 'caneca') ? 'Branco' : null;

  const opcoesCoresCanecas = {
    'Caneca Porcelana': ['Branca'],
    'Caneca Plástica': ['Branca', 'Azul', 'Vermelha'],
    'Caneca Mágica': ['Vermelha', 'Preta'],
    'Caneca de Colher': ['Branca', 'Vermelha', 'Preta'], // Exemplo
    // Adicione outras canecas e suas cores, se necessário
  };
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const tamanhosDisponiveis = ['P', 'M', 'G', 'GG']; // Tamanhos de camisa disponíveis

  const coresDisponiveis = ['Branco', 'Preto', 'Verde', 'Vermelho', 'Azul', 'Amarelo'];


  const [corSelecionada, setCorSelecionada] = useState(defaultCor);
  const { addProductToCart } = useContext(CartContext);
  const [preco, setPreco] = useState(defaultProduct.preco);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const inputFileRef = useRef(null);

  const [estampaSelecionada] = useState(null);
  const { showModal, handleCloseModal } = useContext(CartContext);

  // Lógica para determinar os produtos com base no parâmetro da rota (product)



  const [produtoSelecionado, setProdutoSelecionado] = useState(defaultProduct);

  const handleProdutoClick = (produto) => {
    setPreco(produto.preco);
    setProdutoSelecionado(produto);
    setTipoProdutoSelecionado(produto.nome);
    if (opcoesCoresCanecas[produto.nome]) {
      setCorSelecionada(opcoesCoresCanecas[produto.nome][0]); // Define a cor padrão para canecas
    } else {
      setCorSelecionada(null); // Reseta a cor para outros produtos
    }
  };

  const renderOpcoesCores = () => {
    if (opcoesCoresCanecas[tipoProdutoSelecionado]) {
      return (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-cor">
            {corSelecionada || "Selecione uma cor"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {opcoesCoresCanecas[tipoProdutoSelecionado].map((cor) => (
              <Dropdown.Item key={cor} onClick={() => setCorSelecionada(cor)}>
                {cor}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      );
    }
    return null;
  };


  const estampasPreProntas = [
    { nome: 'Estampa 1', imagem: '/src/assets/estampasProntas/caneca1.jpg' },
    { nome: 'Estampa 2', imagem: '/src/assets/estampasProntas/caneca2.jpg' },
    // ...
  ];
  const [setShowModal] = useState(false);
  const [showNotification] = useState(false);

  const [imagemPublicId, setImagemPublicId] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'preset1'); // Substitua pelo nome do seu Upload Preset

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

      addProductToCart(productToAdd);
      setShowModal(true);
    } else {
      console.log("Por favor, selecione um produto.");
    }
  }
  {
    showNotification && ( // Exibe a notificação se showNotification for true
      <div className="fixed bottom-4 right-4 bg-green-500 text-white py-2 px-4 rounded-md">
        Item adicionado ao carrinho!
      </div>
    )
  }
  // ... (resto do seu código JSX) ...

  {
    imagemSelecionada && (
      <Image
        cloudName="dwgjwhkui" // Substitua pelo seu Cloud Name
        publicId={imagemPublicId}
        width="300"
        crop="scale"
      >
        <Transformation quality="auto" fetchFormat="auto" />
      </Image>
    )
  }







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
                {!imagemSelecionada && (
                  <button
                    onClick={() => inputFileRef.current.click()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Enviar sua imagem aqui
                  </button>
                )}
                {imagemSelecionada && (
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
          <div className=" bg-white ">
            <div>
              <Dropdown >
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                  <p>Estampa pré-pronta</p>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {estampasPreProntas.map((estampa) => (
                    <Dropdown.Item
                      key={estampa.nome}
                      onClick={() => handleEstampaPreProntaClick(estampa)}
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
        {produtos
          .filter((produto) => produto.categoria === product)
          .map((produto) => (
            <div
              key={produto.id}
              className={`
            transition-all duration-[150ms] rounded-lg cursor-pointer relative
            ${preco === produto.preco ? "border-green-950 border-[5px]" : "border-black border-2"}
          `}
              onClick={() => handleProdutoClick(produto)}
            >
              <div className="bg-white rounded-t-md border-b border-gray-300">
                <img src={produto.imagem} alt="" className="rounded-t-md" />
              </div>
              <div className="bg-white rounded-b-md p-2 text-center">
                <p className="text-center font-medium">{produto.nome}</p>
                <p className="text-center">R$ {produto.preco.toFixed(2)}</p>
              </div>
            </div>
          ))}
      </div>
      {opcoesCoresCanecas[tipoProdutoSelecionado] && (
        <div className="mt-4">
          <h4 className="text-xl font-semibold mb-2 text-center">Escolha a cor</h4>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {corSelecionada || 'Selecione uma cor'}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {opcoesCoresCanecas[tipoProdutoSelecionado].map((cor) => (
                <Dropdown.Item key={cor} onClick={() => setCorSelecionada(cor)}>
                  {cor}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}

      {product === 'camisa' && (
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
        </>
      )}

      

      <Quantidade />

      <p className="mt-4 text-center">
        <span className="bg-gray-200 font-bold rounded-md px-4 py-2">
          <span className="text-purple-600">Valor total</span>: R$ {(preco * quantidade).toFixed(2)}
        </span>
      </p>

      <div className="flex items-center justify-center" onClick={handleSubmit}>
        <button className="bg-[purple] rounded text-white p-2">
          Adicionar ao carrinho
        </button>
      </div>

      <Footer />
    </>
  );
}
