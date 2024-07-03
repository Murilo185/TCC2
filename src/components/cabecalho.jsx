
import logo from '../assets/logo.png';
import notificacao from '../assets/notificacao.svg';
import usuario from '../assets/usuario.svg'
import carrinho from '../assets/carrinho.svg'

export default function Cabecalho (){
    
    return (
    <div className='w-full flex justify-between bg-white'>

        <img src={logo} className='w-32'/>

        <div className='flex justify-end'>
            <img src={notificacao} className='w-[40px] h-auto'/>

            <a href="./login">
                <img src={usuario} className='w-[40px] h-auto' />
            </a>

            <img src={carrinho} className='w-[40px] h-auto '/>
        
        </div>

    </div>

    )
}

