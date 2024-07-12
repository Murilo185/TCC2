import { useParams } from "react-router-dom"

import Img1 from '../assets/agenda.png'
import Img2 from '../assets/almochaveiro.png'
import Img3 from '../assets/almofada.png'
import Img4 from '../assets/azulejo.png'
import Img5 from '../assets/caderno.png'
import Img6 from '../assets/camisa.png'
import Img7 from '../assets/caneca.png'
import Cabecalho from "./cabecalho"
import Footer from "./Footer"

export default function Produto(){
    const {product}=useParams()

    return(
        
        <>

            <Cabecalho />
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>

                    <div className="flex item-center justify-center p-7 bg-[#ffffff6e] mt-7 w-[80%] rounded-[12px]">
                        {product == 'agenda' && (<img src={Img1} className="w-[400px]" />) }
                        {product == 'chaveiro' && (<img src={Img2} className="w-[400px]" />) }
                        {product == 'almofada' && (<img src={Img3} className="w-[400px]" />) }
                        {product == 'azulejo' && (<img src={Img4} className="w-[400px]" />) }
                        {product == 'caderno' && (<img src={Img5} className="w-[400px]" />) }
                        {product == 'camisa' && (<img src={Img6} className="w-[400px]" />) }
                        {product == 'caneca' && (<img src={Img7} className="w-[400px]" />) }
                    </div>
                    
                    <h1 className="text-[#733A8E] capitalize font-medium text-[32px] mt-3">{product}</h1>
                    
                    <p className="text-[#3B7A58] text-[32px] font-semibold text-center mb-4">
                        <span className="text-[22px] font-medium">a partir de</span>
                        <br />
                        {product == 'camisa' && '39,90'}
                        {product == 'almofada' && '19,90'}
                        {product == 'azulejo' && '19,90'}
                        {product == 'chaveiro' && '12,90'}
                        {product == 'caneca' && '19,90'}
                        {product == 'caderno' && '19,90'}
                        {product == 'agenda' && '14,90'}
                    </p>

                    <div className='bg-[#3B7A58] text-white w-[80%] flex items-center justify-center py-4 font-bold text-[18px] rounded-[8px]'>
                        Personalize seu produto
                    </div>

                    <p className="capitalize text-[#733A8E] font-bold text-left w-[80%] text-[24px] mt-5 mb-2">
                        descrição
                    </p>
                    
                    <div className="w-[80%] bg-white rounded-[12px] px-8 py-5 mb-9">
                        <p className="text-black">Destaque-se com nossa camiseta personalizada! Feita sob medida para você, com tecido de qualidade e design exclusivo. Vista sua individualidade com estilo. Encomende agora e faça uma declaração de moda única!</p>

                        <p className="mt-5 text-[#733A8E] font-bold">Materiais</p>
                        <ul className="list-inside list-disc pl-0">
                            <li className="ml-1 capitalize">plástico</li>
                            <li className="ml-1 capitalize">porcelana</li>
                            <li className="ml-1 capitalize">Magica</li>
                        </ul>
                        
                        <p className="mt-5 text-[#733A8E] font-bold">Materiais</p>
                        <ul className="list-inside list-disc pl-0">
                            <li className="ml-1 capitalize">s2</li>
                            <li className="ml-1 capitalize">colher</li>
                            <li className="ml-1 capitalize">shrek</li>
                            <li className="ml-1 capitalize">sopa</li>
                        </ul>

                        {/* {product == 'camisa' && 'descricao1'}
                        {product == 'almofada' && 'descricao2'}
                        {product == 'azulejo' && 'descricao3'}
                        {product == 'chaveiro' && 'descricao4'}
                        {product == 'caneca' && 'descricao5'}
                        {product == 'caderno' && 'descricao6'}
                        {product == 'agenda' && 'descricao7'} */}

                    </div>
              </div>
              <Footer />
        </>
    )
}