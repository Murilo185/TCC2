
import Cabecalho from "./cabecalho"
import Footer from "./Footer"
import estampa1 from '../assets/figma_icon.png'
import estampa2 from '../assets/estampa2.png'
import Dropdown from 'react-bootstrap/Dropdown';
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react';
{//import { CartContext } from "../contexts/cart";
}
export default function PersonalizarProduto() {

    {//const {addProductToCart}=useContext(CartContext)
    }
    const [preco, setPreco] = useState(0); // Estado para armazenar o preço
    const [click, setClick] = useState(false); // Estado para armazenar o preço

    const produtos = [
        { nome: 'Porcelana', preco: 10.0, imagem: "/src/assets/canecaPorcelana.png" },
        { nome: 'Plástico', preco: 8.0, imagem: "/src/assets/caneca_transparente.webp" },
        { nome: 'Mágica', preco: 15.0, imagem: "/src/assets/canecaMagica.png" },
        { nome: 'Colher', preco: 12.0, imagem: "/src/assets/canecaColher.webp" },
    ];

    const handleProdutoClick = (produtoPreco) => {
        setPreco(produtoPreco); // Atualiza o preço quando um card é clicado
    };

    const [quantidade, setQuantidade] = useState(1); // Estado para a quantidade

    const handleQuantidadeClick = (novaQuantidade) => {
        setQuantidade(novaQuantidade);
        setClick(false)
    };

    return (
        <>
            <Cabecalho />


            <h1 className="text-center">Vamos criar seu produto!</h1>
            <div className='h-[2px] bg-[purple] flex-grow-[1]'> </div>
            <br />

            <div className="bg-[#999999]">
                <p>estampa</p>
                <div className="flex">
                    <div>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                <p>
                                    Sua estampa

                                </p>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <img src={estampa1} alt="" />
                                <input type="file" name="" id="" />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className=" bg-white">

                        <div>
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    <p>
                                        Estampa pré-pronta
                                    </p>

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
                        className={`transition-all duration-[100ms] rounded-lg p-4 cursor-pointer ${preco == produto.preco ? "border-green-950 border-[10px]" : "border-black border-2"}`}
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
                <div className="grid grid-cols-3 gap-4 "> {/* Grid 3x2 */}
                    {[1, 10, 15, 20, 50].map((qtd) => (
                        <div
                            key={qtd}
                            className={`rounded-lg p-2 cursor-pointer border-2 h-[40px] ${quantidade === qtd ? 'border-green-950' : ''
                                }`}
                            onClick={() => handleQuantidadeClick(qtd)}
                        >
                            {qtd}
                        </div>
                    ))}
                    <div // Opção "Outras quantidades" na última posição
                        className={`border-2 rounded-lg p-2 cursor-pointer text-[10px] ${click === true ? 'border-green-950' : ""}`}
                        onClick={() => {
                            const outraQuantidade = prompt("Digite a quantidade desejada:");
                            if (outraQuantidade && !isNaN(outraQuantidade)) {
                                setQuantidade(parseInt(outraQuantidade, 10));
                                setClick(true)

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
            {//<button onClick={() => addProductToCart(produtos)}>Adicionar ao carrinho</button>}}
            }
            <div className="flex items-center justify-center">
                <button className="bg-[purple] rounded">
                    Adicionar ao carrinho
                </button>
            </div>

            <Footer />
        </>
    )
}