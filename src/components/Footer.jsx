import { Link } from 'react-router-dom';
import { AiOutlineMail, AiOutlineInstagram, AiOutlineFacebook } from "react-icons/ai";
import ButtonMailto from './BotãoEmail';
import { useContext, useState, useRef, useEffect } from 'react';

export default function Footer(){
    return(
        <div className="bg-[#36253F] flex flex-col items-center pt-3">
        
            <h1 className='text-white text-[20px] font-semibold mb-3'>Venha nos visitar!</h1>
            
            <p className='text-white text-[14px] mb-5'>Rio Acima, Jundiaí - São Paulo, 13215-841</p>
            
            <h2 className='text-white text-[20px] font-semibold mb-1 capitalize'>contatos</h2>
            
            <div className="flex flex-row gap-[4px] mb-3">
            
           <a href="mailto:ljpresenteunico@gmail.com"> <AiOutlineMail className='text-[46px] text-white'/></a>
          
                <AiOutlineInstagram className='text-[46px] text-white'/>
                <AiOutlineFacebook className='text-[46px] text-white'/>
            </div>
        </div>
    )
}