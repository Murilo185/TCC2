import Cabecalho from './cabecalho.jsx';
import './telaprincipal.css';
import camisa from '/Poliester.png';
import caneca from '/Caneca Porcelana.png';
import almofada from '/almofada.png';
import caderno from '/caderno.png';
import azulejo from '/azulejo.png';
import agenda from '/agenda.png';
import chaveiro from '/almochaveiro.png';
import whatsapp from '../assets/whatsapp.svg';
import Footer from './Footer.jsx';
import { PiWhatsappLogo } from "react-icons/pi";
import UncontrolledExample from './carrossell.jsx';
import { Link } from 'react-router-dom';


export default function TelaPrincipal() {

  return (
    <>
      <Cabecalho />

      <UncontrolledExample />

      <div className='flex flex-row items-center justify-center bg-[#e7e5ec]'>
        <h2 className='pr-[20px] c-[purple] text-purple-950'>Produtos</h2>
        <div className='h-[2px] bg-[purple] flex-grow-[1]'></div>
      </div>

      <div id="containner" className='w-0'>
        <div id="camisa">
          <Link to="/produto/camisa">
            <img src={camisa} alt="Camisa" />
          </Link>
          <p className="nomeProduto ">Camisa</p>
          <p className="Descricao">A partir de <span>39</span>,90</p>
        </div>

        <div id="Caneca">
          <Link to="/produto/caneca">
            <img src={caneca} alt="Caneca" />
          </Link>
          <p className='nomeProduto'>Caneca</p>
          <p className="Descricao">A partir de <span>19</span>,90</p>
        </div>

        <div id="Almofada">
          <Link to="/produto/almofada">
            <img src={almofada} alt="Almofada" />
          </Link>
          <p className='nomeProduto'>Almofada</p>
          <p className="Descricao">A partir de <span>19</span>,90</p>
        </div>

        <div id="Caderno">
          <Link to="/produto/caderno">
            <img src={caderno} alt="Caderno" />
          </Link>
          <p className='nomeProduto'>Caderno</p>
          <p className="Descricao">A partir de <span>19</span>,90</p>
        </div>

        <div id="Azulejo">
          <Link to="/produto/azulejo">
            <img src={azulejo} alt="Azulejo" />
          </Link>
          <p className='nomeProduto'>Azulejo</p>
          <p className="Descricao">A partir de <span>19</span>,90</p>
        </div>

        <div id="Agenda">
          <Link to="/produto/agenda">
            <img src={agenda} alt="Agenda" />
          </Link>
          <p className='nomeProduto'>Agenda</p>
          <p className="Descricao">A partir de <span>14</span>,90</p>
        </div>

        <div id="Chaveiro">
          <Link to="/produto/chaveiro">
            <img src={chaveiro} alt="Chaveiro" />
          </Link>
          <p className='nomeProduto'>Chaveiro</p>
          <p className="Descricao">A partir de <span>12</span>,90</p>
        </div>
      </div>

      <PiWhatsappLogo className='text-[46px] text-red' />
      <Footer />
    </>
  );
}
