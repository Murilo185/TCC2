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
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'   }}>
            
                

                    <div className="imagem">
                        
                        {product == 'agenda' && (<img src={Img1} style={{ width: '350px' }} />) }
                        {product == 'chaveiro' && (<img src={Img2} style={{ width: '350px' }} />) }
                        {product == 'almofada' && (<img src={Img3} style={{ width: '350px' }} />) }
                        {product == 'azulejo' && (<img src={Img4} style={{ width: '350px' }} />) }
                        {product == 'caderno' && (<img src={Img5} style={{ width: '350px' }} />) }
                        {product == 'camisa' && (<img src={Img6} style={{ width: '350px' }} />) }
                        {product == 'caneca' && (<img src={Img7} style={{ width: '350px' }} />) }
                    </div>
                    <h1>{product}</h1>
                    <p style={{ textAlign: 'center' }}>
                        {product == 'camisa' && '39,90'}
                        {product == 'almofada' && '19,90'}
                        {product == 'azulejo' && '19,90'}
                        {product == 'chaveiro' && '12,90'}
                        {product == 'caneca' && '19,90'}
                        {product == 'caderno' && '19,90'}
                        {product == 'agenda' && '14,90'}
                    </p>

                    

                    <p>Personalize seu produto</p>

                    <p style={{ textAlign: 'center' }} id="descricao">
                        {product == 'camisa' && 'descricao1'}
                        {product == 'almofada' && 'descricao2'}
                        {product == 'azulejo' && 'descricao3'}
                        {product == 'chaveiro' && 'descricao4'}
                        {product == 'caneca' && 'descricao5'}
                        {product == 'caderno' && 'descricao6'}
                        {product == 'agenda' && 'descricao7'}
                    </p>

                    
              </div>
              <Footer />
        </>
    )
}