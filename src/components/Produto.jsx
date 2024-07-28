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
          <br />
          {product === 'camisa' && '39,90'}
          {product === 'almofada' && '19,90'}
          {product === 'azulejo' && '19,90'}
          {product === 'chaveiro' && '12,90'}
          {product === 'caneca' && '19,90'}
          {product === 'caderno' && '19,90'}
          {product === 'agenda' && '14,90'}
        </p>

        <Link to={`/PersonalizarProduto/${product}`}> {/* Corrigido aqui */}
          <div className='bg-[#3B7A58] text-white w-[80%] flex items-center justify-center py-4 font-bold text-[18px] rounded-[8px]'>
            Personalize seu produto
          </div>
        </Link>

        
      </div>
      <Footer />
    </>
  );
}
