
import Cabecalho from "./cabecalho"
import Footer from "./Footer"
import estampa1 from '../assets/figma_icon.png'
import estampa2 from '../assets/estampa2.png'
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import { useParams } from "react-router-dom"

export default function PersonalizarProduto(){
  const {product}=useParams()

  const [tipoCaneca, setTipoCaneca] = useState('porcelana'); // Estado inicial
  const [preco, setPreco] = useState(10.0); // Preço inicial para porcelana

  const handleTipoCanecaChange = (event) => {
    const novoTipo = event.target.value;
    setTipoCaneca(novoTipo);

    // Lógica para atualizar o preço com base no novo tipo
    switch (novoTipo) {
      case 'porcelana':
        setPreco(10.0);
        break;
      case 'plástico':
        setPreco(8.0);
        break;
      case 'coração':
        setPreco(12.0);
        break;
      case 'colher':
        setPreco(11.0);
        break;
      default:
        setPreco(10.0);
    }
  };

    return(
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

    <div className="bg-white flex flex-col space-y-2 p-4">
  {product === 'caneca' && (
    <>
      <div className="bg-white flex flex-col space-y-2 p-4">
      {/* ... (seus inputs radio) ... */}

      <div>
        <input
          type="radio"
          name="tipoCaneca"
          id="1"
          value="porcelana"
          checked={tipoCaneca === 'porcelana'}
          onChange={handleTipoCanecaChange}
        />
        <label htmlFor="1" className="ml-2">porcelana</label>
      </div>

      <div>
        <input
          type="radio"
          name="tipoCaneca"
          id="2"
          value="plástico"
          checked={tipoCaneca === 'plástico'}
          onChange={handleTipoCanecaChange}
        />
        <label htmlFor="2" className="ml-2">plastico</label>
      </div>


      {/* ... (outros inputs radio com onChange={handleTipoCanecaChange}) ... */}

      <p className="mt-4">Preço: R$ {preco.toFixed(2)}</p>
    </div>
    </>
  )}
  if 
</div>

    <Footer />
    </>
    )
}