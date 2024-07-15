import { Link } from 'react-router-dom';
import logo from '../../public/logosemtexto.png'
import { AiOutlineMail, AiOutlineInstagram, AiOutlineFacebook } from "react-icons/ai";

export default function Footer(){
    return(
        <div className="bg-[#36253F] flex flex-col items-center pt-3">
        
            <h1 className='text-white text-[20px] font-semibold mb-3'>Venha nos visitar!</h1>
            
            <p className='text-white text-[14px] mb-5'>Rio Acima, Jundiaí - State of São Paulo, 13215-841</p>
            
            <h2 className='text-white text-[20px] font-semibold mb-1 capitalize'>contatos</h2>
            
            <div className="flex flex-row gap-[4px] mb-3">
                <AiOutlineMail className='text-[46px] text-white'/>
                <AiOutlineInstagram className='text-[46px] text-white'/>
                <AiOutlineFacebook className='text-[46px] text-white'/>
            </div>  

            <p className='text-white text-[14px] font-semibold mb-1'>Está com duvidas?</p>

            <p className='text-white text-[14px] font-semibold mb-5'>clique <Link to='/' className='text-[#D171FF] text-[20px]'>aqui</Link> e tentaremos te ajudar!</p>
        </div>
    )
}