import { useState, useEffect } from 'react'
import axios from 'axios'
import Cabecalho from './cabecalho'

export default function SignIn() {

    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    function handleInputEmail(e) {
        setEmailValue(e.target.value)
    }
    
    function handleInputPassword(e) {
        setPasswordValue(e.target.value)
    }
    //rodolfoGay@gmail.com

    function signIn(){
        axios.get(`http://localhost:3000/login/${emailValue}`)
            .then(function (response) {
                setEmailValue('')
                setPasswordValue('')
                
                alert(`${response.data.name}`)
                console.log(response.data);
            })
            .catch(function (error) {
                alert('Erro interno no servidor')
                
                console.log(error);
            })
    }

    return(
        <>
        <Cabecalho />
        <div className="w-full px-[10%] h-screen bg-white flex flex-col items-center justify-start">
            <h1 className="mt-[50px] mb-[14px] w-full text-left text-[22px] font-bold text-[#733A8E]">Faça login com sua conta</h1>
            <p className="mb-[20px] w-full text-left text-[20px] text-[#808080]">é bom ter você de volta</p>

            <form
                className="w-full flex flex-col justify-center"
                onSubmit={(e) => {
                    e.preventDefault()
                    signIn()
                }}
            >
                <label className="capitalize  text-[18px] w-full font-bold mb-[4px] text-[#733a8E]">email</label>
                <input
                    className="text-[18px] text-[#000000] placeholder:text-[#E6E6E6] border border-[#E6E6E6] p-2 py-3 rounded-[10px] mb-[30px] focus:outline-none"
                    type="email"
                    placeholder="Coloque seu email"
                    value={emailValue}
                    onChange={(e) => handleInputEmail(e)}
                />
                
                <label className="capitalize  text-[18px] w-full font-bold mb-[4px] text-[#733a8E]">senha</label>
                <input
                    className="text-[18px] text-[#000000] placeholder:text-[#E6E6E6] border border-[#E6E6E6] p-2 py-3 rounded-[10px] mb-[30px] focus:outline-none"
                    type="password"
                    placeholder="Coloque sua senha"
                    value={passwordValue}
                    onChange={(e) => handleInputPassword(e)}
                />

                <input className="mt-[20px] capitalize w-full bg-[#E6E6E6] text-[#FFFFFF] text-[20px] py-3 rounded-[8px]" type="submit" value='login' />

                <div className="mt-[30px] flex justify-center items-center w-full">
                    <div className="flex-grow-[1] bg-[#3B7A58] h-[2px]"></div>
                    <p className="text-[18px] px-3 text-[#3B7A58] font-bold">Ou</p>
                    <div className="flex-grow-[1] bg-[#3B7A58] h-[2px]"></div>
                </div>

                <div
                    className="mt-[20px] w-full text-center bg-transparent border-[1px] border-[#E6E6E6] text-[#000000] text-[18px] py-3 rounded-[8px]" >
                    Faça login com google
                </div>

                <p className="mt-[40px] mb-[60px] text-center w-full text-[#733a8e]">Esqueceu sua senha? <span href="#" className="text-[#3B7A58]">Recupere sua senha</span>
                </p>
                <p className="mt-[40px] mb-[60px] text-center w-full text-[#733a8e]">Não tem uma conta ainda? <span href="#" className="text-[#3B7A58]">Cadastre-se</span>
                </p>

            </form>
        </div>
        </>
    )
}