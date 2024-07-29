// UploadImagem.js
import React, { useRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const UploadImagem = ({ imagemSelecionada, setImagemSelecionada, handleImageUpload }) => {
  const inputFileRef = useRef(null);

  return (
    <>
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
    </>
  );
};

export default UploadImagem;
