import { useState, useContext } from 'react'
import axios from 'axios'
import Cabecalho from './cabecalho'

import { useNavigate } from 'react-router-dom';

import { CartContext } from '../contexts/cartContext.jsx';

export default function SignUp() {
    const navigate = useNavigate()

    const { persUser, setFirstLogin } = useContext(CartContext);

    const [nameValue, setNameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [cepValue, setCepValue] = useState('')
    const [complementoValue, setComplementoValue] = useState('')
    const [numeroValue, setNumeroValue] = useState('')

    function handleInputEmail(e) {
        setEmailValue(e.target.value)
    }
    
    function handleInputPassword(e) {
        setPasswordValue(e.target.value)
    }
    
    function handleInputName(e) {
        setNameValue(e.target.value)
    }
    
    function handleInputCEP(e) {
        setCepValue(e.target.value)
    }
    
    function handleInputComplemento(e) {
        setComplementoValue(e.target.value)
    }
    
    function handleInputNumero(e) {
        setNumeroValue(e.target.value)
    }

    function signUp(){
        axios.post(`https://tcc2-backend3.onrender.com/register`, {
            name: nameValue,
            email: emailValue,
            password: passwordValue,
            cep: cepValue,
            complemento: complementoValue,
            numero: numeroValue,
        })
            .then(function (response) {
                console.log(response.data);
                
                setNameValue('');
                setEmailValue('');
                setPasswordValue('');
                setCepValue('');
                setComplementoValue('');
                setNumeroValue('');
    
                setFirstLogin(false);
                persUser(response.data.name, response.data.email, response.data.password, complementoValue, []); // O histórico de pedidos pode começar vazio
                navigate('/');
            })
            .catch(function (error) {
                console.log(error);
                alert('Erro interno no servidor');
            });
    }

    return(
        <>
        <Cabecalho />
        <div className="w-full px-[10%] h-screen bg-white flex flex-col items-center justify-start">
            <h1 className="mt-[50px] mb-[14px] w-full text-left text-[22px] font-bold text-[#733A8E]">Crie sua conta</h1>
            <p className="mb-[20px] w-full text-left text-[20px] text-[#808080]">Vamos criar sua conta</p>

            <form
                className="w-full flex flex-col justify-center"
                onSubmit={(e) => {
                    e.preventDefault()
                    signUp()
                }}
            >
                <label className="capitalize  text-[18px] w-full font-bold mb-[4px] text-[#733a8E]">Nome completo</label>
                <input
                    className="text-[18px] text-[#000000] placeholder:text-[#808080] border border-[#E6E6E6] p-2 py-3 rounded-[10px] mb-[30px] focus:outline-none"
                    type="text"
                    placeholder="Coloque seu nome completo"
                    value={nameValue}
                    onChange={(e) => handleInputName(e)}
                />
                
                <label className="capitalize  text-[18px] w-full font-bold mb-[4px] text-[#733a8E]">email</label>
                <input
                    className="text-[18px] text-[#000000] placeholder:text-[#808080] border border-[#E6E6E6] p-2 py-3 rounded-[10px] mb-[30px] focus:outline-none"
                    type="email"
                    placeholder="Coloque seu endereço de email"
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
                
                <label className="uppercase text-[18px] w-full font-bold mb-[4px] text-[#733a8E]">cep</label>
                <input
                    className="text-[18px] text-[#000000] placeholder:text-[#808080] border border-[#E6E6E6] p-2 py-3 rounded-[10px] mb-[30px] focus:outline-none"
                    type="text"
                    placeholder="Coloque seu CEP"
                    value={cepValue}
                    onChange={(e) => handleInputCEP(e)}
                />
                
                <div className='w-full flex items-center justify-between flex-row relative gap-2 px-2 mb-4'>
                    <div className='flex w-[48%] items-center justify-start flex-col'>
                        <label className='uppercase font-bold text-[#733a8E]'>N°</label>
                        <input
                            className='w-full text-[16px] py-3 text-[#000000] border border-[#e6e6e6] rounded-[10px] px-1 focus:outline-none' 
                            type="text"
                            placeholder="Coloque sua N°"
                            value={numeroValue}
                            onChange={(e) => handleInputNumero(e)}
                        />
                    </div>
                    
                    <div className='flex w-[48%] items-center justify-start flex-col'>
                        <label className='capitalize font-bold text-[#733a8E]'>complemento</label>
                        <input
                            className='w-full text-[16px] py-3 text-[#000000] border border-[#e6e6e6] rounded-[10px] px-1 focus:outline-none' 
                            type="text"
                            placeholder="Coloque seu complemento"
                            value={complementoValue}
                            onChange={(e) => handleInputComplemento(e)}
                        />
                    </div>
                </div>

                <p className="mb-[20px] text-[14px] font-bold">Ao cadastrar-se você esta concordando com nossos <span className="text-[14px] text-[#3B7A58]">Termos, Privacidade, Politica</span> e uso de Cookies</p>

                <input className="mt-[20px] capitalize w-full bg-[#E6E6E6] text-[#FFFFFF] text-[20px] py-3 rounded-[8px]" type="submit" value='Crie sua conta' />

                

                <p className="mt-[40px] mb-[60px] text-center w-full text-[#733a8e]">Já tem uma conta? <span className="text-[#3B7A58]"><a href="./sign-in">Entre aqui!</a></span>
                </p>

            </form>
        </div>
        </>
    )
}