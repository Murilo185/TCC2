import  { useContext, useState, useRef } from 'react';
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
import { useEffect } from 'react';

export default function PersonalizarProduto() {

  const produtos = [
    { id: 1, nome: 'Poliester', preco: 39.90, imagem: "/Poliester.png", categoria: 'camisa' },

    { id: 2, nome: 'Caneca Porcelana', preco: 35.0, imagem: "/Caneca Porcelana.png", categoria: 'caneca', maxEstampas: 1, indColor: 0 },
    { id: 3, nome: 'Caneca Plástica', preco: 29.0, imagem: "/Caneca Plástica.png", categoria: 'caneca', maxEstampas: 1, indColor: 1 },
    { id: 4, nome: 'Caneca Mágica', preco: 40.0, imagem: "/Caneca Mágica.png", categoria: 'caneca', maxEstampas: 1, indColor: 2 },
    { id: 5, nome: 'Caneca de Colher', preco: 45.0, imagem: "/Caneca de Colher.png", categoria: 'caneca', maxEstampas: 1, indColor: 3 },

    { id: 6, nome: 'Almofada dois lados 28x20cm', preco: 19.90, imagem: "/almofada.png", categoria: 'almofada', maxEstampas: 2 },
    { id: 7, nome: 'Almofada dois lados 40x28cm', preco: 49.90, imagem: "/almofada.png", categoria: 'almofada', maxEstampas: 2 },

    { id: 8, nome: 'Almofada cubo 15x15cm', preco: 19.90, imagem: "/Almofada cubo 15x15cm.png", categoria: 'almofada', maxEstampas: 6 },
    { id: 9, nome: 'Almofada cubo 20x20cm', preco: 29.90, imagem: "/Almofada cubo 20x20cm.png", categoria: 'almofada', maxEstampas: 6 },

    { id: 10, nome: 'Caderno A4', preco: 19.90, imagem: "/Caderno A4.png", categoria: 'caderno', maxEstampas: 2 },

    { id: 11, nome: 'Azulejo 15x15cm', preco: 30, imagem: "/Azulejo 15x15cm.png", categoria: 'azulejo', maxEstampas: 1 },
    { id: 12, nome: 'Azulejo 10x10cm', preco: 50, imagem: "/Azulejo 10x10cm.png", categoria: 'azulejo', maxEstampas: 1 },

    { id: 13, nome: 'Agenda 17x9,4cm', preco: 14.90, imagem: "/Agenda 17x9,4cm.png", categoria: 'agenda', maxEstampas: 2 },

    { id: 14, nome: 'Almochaveiro 7x7cm', preco: 4, imagem: "/Almochaveiro 7x7cm.png", categoria: 'chaveiro', maxEstampas: 2 },

  ];
  const { product } = useParams();
  const { quantidade } = useContext(QuantidadeContext);
  const defaultProduct = produtos.find(p => p.categoria === product) || produtos[0];
  const [tipoProdutoSelecionado, setTipoProdutoSelecionado] = useState(defaultProduct.categoria);

  const defaultCor = (product === 'caneca') ? 'Branco' : null;

  const opcoesCoresCanecas = {
    'Caneca Porcelana': ['Branca'],
    'Caneca Plástica': ['Branca', 'Azul', 'Vermelha'],
    'Caneca Mágica': ['Vermelha', 'Preta'],
    'Caneca de Colher': ['Branca', 'Vermelha', 'Preta'],
  }
  const OpcoesCoresCamisa = ['Branca']
  
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
  const tamanhosDisponiveis = ['P', 'M', 'G', 'GG'];

  const [corSelecionada, setCorSelecionada] = useState(product == 'caneca' ? 'Branco' : 'Branco');
  const { addProductToCart } = useContext(CartContext);
  const [preco, setPreco] = useState(defaultProduct.preco);
  const [id, setId] = useState(defaultProduct.id);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);
  const inputFileRef = useRef(null);
  const [estampas, setEstampas] = useState([]);
  const [estampaSelecionada] = useState(null);
  const { showModal, handleCloseModal } = useContext(CartContext);
  const [setShowModal] = useState(false);
  const [showNotification] = useState(false);
  const [imagemPublicId, setImagemPublicId] = useState(null);

  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const handleProdutoClick = (produto) => {
    console.log('oioi')
    setPreco(produto.preco);
    setProdutoSelecionado(produto);
    setTipoProdutoSelecionado(produto.nome);
    setId(produto.id);
    if (opcoesCoresCanecas[produto.nome]) {
      setCorSelecionada(opcoesCoresCanecas[produto.nome][0]); // Define a cor padrão para canecas
    } else {
      setCorSelecionada(null); // Reseta a cor para outros produtos
    }
    if (OpcoesCoresCamisa[produto.nome]) {
      
      setCorSelecionada(OpcoesCoresCamisa[produto.nome][0]);
    } else {
      setCorSelecionada(null); // Reseta a cor para outros produtos
    }
  };

  useEffect(() => {
    handleProdutoClick({ id: 2, nome: 'Caneca Porcelana', preco: 35.0, imagem: "/Caneca Porcelana.png", categoria: 'caneca', maxEstampas: 1, indColor: 0 })
    setCorSelecionada('Branco')
  },[])

  
  const estampasPreProntas = [
    { nome: 'Estampa 1', imagem: '/src/assets/estampasProntas/caneca1.jpg' },
    { nome: 'Estampa 2', imagem: '/src/assets/estampasProntas/caneca2.jpg' },
    // ...
  ];
  
  // handleProdutoClick({ id: 3, nome: 'Caneca Plástica', preco: 29.0, imagem: "/Caneca Plástica.png", categoria: 'caneca', maxEstampas: 1, indColor: 1 })

  // Constante de upload de imagem personalizada
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'preset1');

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dwgjwhkui/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error(`Erro no upload: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setImagemSelecionada(data.secure_url);
        setImagemPublicId(data.public_id);

      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error);
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
      setImagemSelecionada(data.secure_url);
      setImagemPublicId(data.public_id);

    } catch (error) {
      console.error("Erro ao enviar a imagem pré-pronta:", error);
      alert("Ocorreu um erro ao selecionar a estampa pré-pronta. Por favor, tente novamente.");
    }
  };

  function handleSubmit() {
    const produtoSelecionado = produtos.find((produto) => produto.id === id);
    if (produtoSelecionado) {
      const productToAdd = {
        tipoProduto: produtoSelecionado.nome,
        quantidade,
        precoTotal: preco * quantidade,
        imagem: imagemSelecionada,
        imagemPublicId: imagemPublicId,
        id: generateUniqueId(),
        cor: corSelecionada,
        tamanho: tamanhoSelecionado,
        nome: produtoSelecionado.nome, // Adiciona o nome do produto
        
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

  {
    imagemSelecionada && (
      <Image
        cloudName="dwgjwhkui"
        publicId={imagemPublicId}
        width="300"
        crop="scale"
      >
        <Transformation quality="auto" fetchFormat="auto" />
      </Image>
    )
  }

  function generateUniqueId() {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.random().toString(36).substr(2, 5);
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

      {product === 'caneca' && <h1 className='text-center'>Vamos criar sua caneca!</h1>}
      {product === 'agenda' && <h1 className='text-center'>Vamos criar sua agenda!</h1>}
      {product === 'chaveiro' && <h1 className='text-center'>Vamos criar seu chaveiro!</h1>}
      {product === 'Almofada' && <h1 className='text-center'>Vamos criar sua almofada!</h1>}
      {product === 'camisa' && <h1 className='text-center'>Vamos criar sua camisa!</h1>}
      {product === 'caderno' && <h1 className='text-center'>Vamos criar seu caderno!</h1>}
      {product === 'azulejo' && <h1 className='text-center'>Vamos criar seu azulejo!</h1>}
      <div className='h-[2px] bg-[purple] flex-grow-[1]'></div>
      <br />

      <div className="bg-[#999999] w-full md:w-[50%] mx-auto rounded-[10px] mb-2">
        <div className="flex items-center justify-center">
          <div className='px-2 py-2'>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                <p>Sua estampa</p>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {!imagemSelecionada && !estampaSelecionada && (
                  <button
                    onClick={() => inputFileRef.current.click()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Enviar sua imagem aqui
                  </button>
                )}
                {imagemSelecionada && (
                  <button
                    onClick={() => inputFileRef.current.click()}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Enviar sua imagem aqui
                  </button>
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
          <div>
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
            <h2 className="text-lg font-semibold text-center">Sua estampa:</h2>
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


      <div className='flex flex-col items-center justify-start '>
        <div className="py-2 bg-[gray] w-[48%] flex flex-row flex-wrap items-center justify-center sm:px-1 md:px-2  rounded gap-2 ">
          {produtos
            .filter((produto) => produto.categoria === product)
            .map((produto) => (
              <div
                key={produto.id}
                className={`
            w-5/12
            flex flex-col items-center transition-all duration-[150ms] rounded-lg cursor-pointer relative 
            ${id === produto.id ? 'border-green-950 border-[4px]' : 'border-black border-2'}
          `}
                onClick={() => handleProdutoClick(produto)}
              >
                {/* Div de imagem */}
                <div className="bg-[#9998ac] rounded-t-md border-b border-gray-300">
                  <img src={produto.imagem} alt="" className="rounded-t-md" />
                </div>
                <div className="bg-white rounded-b-md p-2 text-center w-full">
                  {/* Nome do produto */}
                  <div className="text-center font-medium text-sm w-full h-[50px] flex items-center justify-center p-1 ">
                    {produto.nome}
                  </div>
                  <p className="text-center text-sm">R$ {produto.preco.toFixed(2)}</p>
                </div>
              </div>
            ))}
        </div>
      </div>




      {product === 'caneca' && (
        <div className="my-4 text-center">
          <h4>Selecione a cor da caneca:</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {opcoesCoresCanecas[tipoProdutoSelecionado]?.map((cor) => (
              <button
                key={cor}
                className={`py-1 px-3 border ${corSelecionada === cor ? 'bg-green-700 text-white' : 'bg-white text-black'}`}
                onClick={() => {
                  console.log(cor)
                  setCorSelecionada(cor)
                }}
              >
                {cor}
              </button>
            ))}
          </div>
        </div>
      )}

      {product === 'camisa' && (
        <div className="my-4 text-center">
          <h4>Selecione a cor da camisa</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {OpcoesCoresCamisa.map((cor) => (
              <>
              {corSelecionada == cor ? (
                <button
                  key={cor}
                  className={`py-1 px-3 border bg-green-700 text-white order-1`}
                  onClick={() => setCorSelecionada(cor)}
                >
                  {cor}
                </button>
              ):(
                <button
                  key={cor}
                  className={`py-1 px-3 borderbg-white text-black order-2`}
                  onClick={() => setCorSelecionada(cor)}
                >
                  {cor}
                </button>
                )}

              <button
                key={cor}
                className={`py-1 px-3 border ${corSelecionada === cor ? 'bg-green-700 text-white order-last' : 'bg-white text-black order-first'}`}
                onClick={() => setCorSelecionada(cor)}
              >
                {cor}
              </button>
              </>
            ))}
          </div>
        </div>
      )}


      {product === 'camisa' && (

        <div className="flex flex-col items-center mt-4 space-y-4">
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
        </div>
      )}




      <Quantidade />

      <p className="mt-4 text-center">
        <span className="bg-gray-200 font-bold rounded-md px-4 py-2">
          <span className="text-purple-600">Valor total</span>: R$ {(preco * quantidade).toFixed(2)}
        </span>
      </p>

      <div className="flex items-center justify-center" onClick={handleSubmit}>
        <button className="bg-[purple] rounded text-white p-2 mb-20">
          Adicionar ao carrinho
        </button>
      </div>

      <Footer />
    </>
  );
}
