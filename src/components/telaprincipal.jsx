import Cabecalho from './cabecalho.jsx';
import './telaprincipal.css';
import camisa from '/Poliester.png';
import caneca from '/Caneca Porcelana.png';
import almofada from '/almofada.png';
import caderno from '/Caderno A4.png';
import azulejo from '/Azulejo 15x15cm.png';
import agenda from '/Agenda 17x9,4cm.png';
import chaveiro from '/Almochaveiro 7x7cm.png';
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

      <div id="containner" className='flex flex-wrap justify-center items-center gap-1'>
        <div id="camisa" className='w-40 flex flex-col items-center p-4 rounded-md shadow-md'>
          <Link to="/produto/camisa">
            <img src={camisa} alt="Camisa" />
          </Link>
          <p className="nomeProduto ">Camisa</p>
          <p className="Descricao">A partir de <span>39</span>,90</p>
        </div>

        <div id="Caneca" className='w-40 flex flex-col items-center p-4 rounded-md shadow-md'>
          <Link to="/produto/caneca">
            <img src={caneca} alt="Caneca" />
          </Link>
          <p className='nomeProduto'>Caneca</p>
          <p className="Descricao">A partir de <span>19</span>,90</p>
        </div>

        <div id="Almofada" className='w-40 flex flex-col items-center p-4 rounded-md shadow-md'>
          <Link to="/produto/almofada">
            <img src={almofada} alt="Almofada" />
          </Link>
          <p className='nomeProduto'>Almofada</p>
          <p className="Descricao">A partir de <span>19</span>,90</p>
        </div>

        <div id="Caderno" className='w-40 flex flex-col items-center p-4 rounded-md shadow-md'>
          <Link to="/produto/caderno">
            <img src={caderno} alt="Caderno" />
          </Link>
          <p className='nomeProduto'>Caderno</p>
          <p className="Descricao">A partir de <span>19</span>,90</p>
        </div>

        <div id="Azulejo" className='w-40 flex flex-col items-center p-4 rounded-md shadow-md'>
          <Link to="/produto/azulejo">
            <img src={azulejo} alt="Azulejo" />
          </Link>
          <p className='nomeProduto'>Azulejo</p>
          <p className="Descricao">A partir de <span>19</span>,90</p>
        </div>

        <div id="Agenda" className='w-40 flex flex-col items-center p-4 rounded-md shadow-md'>
          <Link to="/produto/agenda">
            <img src={agenda} alt="Agenda" />
          </Link>
          <p className='nomeProduto'>Agenda</p>
          <p className="Descricao">A partir de <span>14</span>,90</p>
        </div>

        <div id="Chaveiro" className='w-40 flex flex-col items-center p-4 rounded-md shadow-md'>
          <Link to="/produto/chaveiro">
            <img src={chaveiro} alt="Chaveiro" />
          </Link>
          <p className='nomeProduto'>Chaveiro</p>
          <p className="Descricao">A partir de <span>12</span>,90</p>
        </div>
      </div>

      <Footer />
    </>
  );
}
