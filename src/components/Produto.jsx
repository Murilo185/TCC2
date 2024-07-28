import { useParams, Link } from "react-router-dom";
import Img1 from '../assets/agenda.png';
import Img2 from '../assets/almochaveiro.png';
import Img3 from '../assets/almofada.png';
import Img4 from '../assets/azulejo.png';
import Img5 from '../assets/caderno.png';
import Img6 from '../assets/camisa.png';
import Img7 from '../assets/caneca.png';
import Cabecalho from "./cabecalho";
import Footer from "./Footer";
import './Produto.css';

export default function Produto() {
  const { product } = useParams();

  return (
    <>
      <Cabecalho />
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <div className="flex item-center justify-center p-7 bg-[#f1f1f1] mt-7 w-[80%] rounded-[12px]">
          {product === 'agenda' && (<img src={Img1} className="w-[400px]" />)}
          {product === 'chaveiro' && (<img src={Img2} className="w-[400px]" />)}
          {product === 'almofada' && (<img src={Img3} className="w-[400px]" />)}
          {product === 'azulejo' && (<img src={Img4} className="w-[400px]" />)}
          {product === 'caderno' && (<img src={Img5} className="w-[400px]" />)}
          {product === 'camisa' && (<img src={Img6} className="w-[400px]" />)}
          {product === 'caneca' && (<img src={Img7} className="w-[400px]" />)}
        </div>

        <h1 className="text-[#733A8E] capitalize font-medium text-[32px] mt-3">{product}</h1>

        <p className="text-[#3B7A58] text-[32px] font-semibold text-center mb-4">
          <span className="text-[22px] font-medium">a partir de</span>
          <br />R$
          {product === 'camisa' && '39,90'}
          {product === 'almofada' && '19,90'}
          {product === 'azulejo' && '30,00'}
          {product === 'chaveiro' && '4,00'}
          {product === 'caneca' && '29,00'}
          {product === 'caderno' && '19,90'}
          {product === 'agenda' && '20'}
        </p>

        <Link to={`/PersonalizarProduto/${product}`}> {/* Corrigido aqui */}
          <div className='bg-[#3B7A58] text-white w-[80%] flex items-center justify-center py-4 font-bold text-[18px] rounded-[8px]'>
            Personalize seu produto
          </div>
        </Link>
        <section className="descricao-produto w-[80%] rounded-[12px] mt-5 p-4 bg-white shadow-md"> {/* Seção de descrição */}
          <h2 className="text-[#733A8E] text-2xl font-semibold mb-3">Detalhes</h2>

          <div className="mb-4"> {/* Subseção: Material */}
            <h3 className="text-lg font-medium text-gray-800">Material:</h3>
            <p>
              {product === 'camisa' && 'Tecido 100% poliéster, macio e confortável.'}
              {product === 'caneca' && 'Cerâmica de alta qualidade, resistente a micro-ondas e lava-louças.'}
              {product === 'almofada' && 'Tecido macio e enchimento de fibra siliconada antialérgica.'}
              {product === 'chaveiro' && 'Tecido macio e enchimento de fibra siliconada antialérgica.'}
              {product === 'agenda' && 'Capa dura, 50 folhas, 17x9,4 centimetros'}
              {/* ... adicione informações sobre o material de outros produtos ... */}
            </p>
          </div>

          <div className="mb-4"> {/* Subseção: Área de Customização */}
            <h3 className="text-lg font-medium text-gray-800">Área de Customização:</h3>
            <p>
              {product === 'camisa' && 'Frente da camisa tamanho A4'}
              {product === 'caneca' && 'Área externa da caneca.'}
              {product === 'almofada' && 'Frente da almofada.'}
              {product === 'chaveiro' && 'Frente e verso da almofada'}
              {product === 'agenda' && 'Capa e contra capa'}
              {/* ... adicione informações sobre a área de customização de outros produtos ... */}
            </p>
          </div>

          <div className="mb-4"> {/* Subseção: Opções de Configuração */}
  {product !== 'chaveiro' && (
    <>
      <h3 className="text-lg font-medium text-gray-800">Opções de Configuração:</h3>
      <ul className="list-disc list-inside">
        {product === 'camisa' && (
          <>
            <li>Tamanhos: P, M, G, GG</li>
            <li>Cores: Branco, Preto, Verde, Vermelho, Azul, Amarelo</li>
          </>
        )}
        {product === 'caneca' && (
          <>
            <li>Porcelana, plástico, mágica, colher</li><br />
            <li>Cores: Preto/vermelho(Mágica) Vermelho/Azul(Colher)</li>
          </>
        )}
        {product === 'agenda' && (
          <>
            <li>Tamanhos: 17x9,4cm</li>
          </>
        )}
        {/* ... adicione opções de configuração de outros produtos ... */}
      </ul>
    </>
  )}
</div>
        </section>



      </div>
      <Footer />
    </>
  );
}
