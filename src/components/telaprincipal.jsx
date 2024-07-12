import Cabecalho from './cabecalho.jsx'
import './telaprincipal.css'
import camisa from '../assets/camisa.png'
import caneca from '../assets/caneca.png'
import almofada from '../assets/almofada.png'
import caderno from '../assets/caderno.png'
import azulejo from '../assets/azulejo.png'
import agenda from '../assets/agenda.png'
import chaveiro from '../assets/almochaveiro.png'
import whatsapp from '../assets/whatsapp.svg'
import Footer from './Footer.jsx';

import { Link } from 'react-router-dom'

export default function TelaPrincipal (){
    return (
        <>
            <Cabecalho />

            <input type="text" className='block mx-auto mb-[20px] mt-[20px]' />
                
            <div id="containner" className='w-0'>

                <div id="camisa">
                    
                    <Link to="/produto/camisa">
                        <img src={camisa} alt="" />
                    </Link>
                    <p className="nomeProduto ">Camisa</p>
                    <p className="Descricao">A partir de <span>39</span>,90</p>
                </div>

                <div id="Caneca">
                    <Link to="/produto/caneca">
                        <img src={caneca} alt="" />
                    </Link>
                    <p className='nomeProduto'>Caneca</p>
                    <p className="Descricao">A partir de <span>19</span>,90</p>
                </div>

                <div id="Almofada">
                    <Link to="/produto/almofada">
                        <img src={almofada} alt="" />
                    </Link>
                    <p className='nomeProduto' >Almofada</p>
                    <p className="Descricao">A partir de <span>19</span>,90</p>
                </div>

                <div id="Caderno">
                    <Link to="/produto/caderno">
                        <img src={caderno} alt="" />
                    </Link>
                    <p className='nomeProduto'>Caderno</p>
                    <p className="Descricao">A partir de <span>19</span>,90</p>
                </div>

                <div id="Azulejo">
                    <Link to="/produto/azulejo">
                        <img src={azulejo} alt="" />
                    </Link>
                    <p className='nomeProduto'>Azulejo</p>
                    <p className="Descricao">A partir de <span>19</span>,90</p>
                </div>

                <div id="Agenda">
                    <Link to="produto/agenda">
                        <img src={agenda} alt="" />
                    </Link>
                    <p className='nomeProduto'>Agenda</p>
                    <p className="Descricao">A partir de <span>14</span>,90</p>
                </div>

                <div id="Chaveiro">
                    <Link to="/produto/chaveiro">
                        <img src={chaveiro} alt="" />
                    </Link>
                    <p className='nomeProduto'>Chaveiro</p>
                    <p className="Descricao">A partir de <span>12</span>,90</p>
                </div>
            </div>
            
            <img src={whatsapp} alt="" id='whatsapp'/>
            <Footer />
        </>
    )
}

