import axios from 'axios'
import Cabecalho from './cabecalho'

import React, { useState, useContext } from 'react';

import { CartContext } from '../contexts/cartContext.jsx';

export default function SignIn() {

    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const { persUser } = useContext(CartContext);

    function handleInputEmail(e) {
        setEmailValue(e.target.value)
    }
    
    function handleInputPassword(e) {
        setPasswordValue(e.target.value)
    }

    function signIn(){
        axios.get(`https://tcc2-backend2.onrender.com/login/${emailValue}`)
            .then(function (response) {
                setEmailValue('')
                setPasswordValue('')
                
                alert(`${response.data.name}`)
                persUser(response.data.name, response.data.email, response.data.password)
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
            <p className="mb-[20px] w-full text-left text-[20px] text-[#808080]">É bom tê-lo de volta</p>

            <form
                className="w-full flex flex-col justify-center"
                onSubmit={(e) => {
                    e.preventDefault()
                    signIn()
                }}
            >
                <label className="capitalize  text-[18px] w-full font-bold mb-[4px] text-[#733a8E]">email</label>
                <input
                    className="text-[18px] text-[#000000] placeholder:text-[#808080] border border-[#E6E6E6] p-2 py-3 rounded-[10px] mb-[30px] focus:outline-none"
                    type="email"
                    placeholder="Coloque seu email"
                    value={emailValue}
                    onChange={(e) => handleInputEmail(e)}
                />
                
                <label className="capitalize  text-[18px] w-full font-bold mb-[4px] text-[#733a8E]">senha</label>
                <input
                    className="text-[18px] text-[#000000] placeholder:text-[#808080] border border-[#E6E6E6] p-2 py-3 rounded-[10px] mb-[30px] focus:outline-none"
                    type="password"
                    placeholder="Coloque sua senha"
                    value={passwordValue}
                    onChange={(e) => handleInputPassword(e)}
                />


                <input className="mt-[20px] capitalize w-full bg-[#E6E6E6] text-[#FFFFFF] text-[20px] py-3 rounded-[8px]" type="submit" value='login' />

                <p className="mt-[40px] mb-[60px] text-center w-full text-[#733a8e]">Esqueceu sua senha? <a href="#" className="text-[#3B7A58]">Recupere sua senha</a>
                </p>
                <p className="mt-[40px] mb-[60px] text-center w-full text-[#733a8e]">Não tem uma conta ainda? <a href="/sign-up" className="text-[#3B7A58]">Cadastre-se</a>
                </p>

            </form>
        </div>
        </>
    )
}