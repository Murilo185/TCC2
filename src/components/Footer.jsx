import { AiOutlineMail, AiOutlineInstagram, AiOutlineFacebook } from "react-icons/ai";

export default function Footer(){
    return(
        <div className="bg-purple-500 h-[100px] flex flex-col items-center">
        <p>Outros contatos</p>
        <div className="flex flex-row " >
            <AiOutlineMail className='text-[30px]'/>
            <AiOutlineInstagram className='text-[30px]'/>
            <AiOutlineFacebook className='text-[30px]'/>
        </div>  
        </div>
    )
}