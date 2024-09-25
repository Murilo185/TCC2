import axios from 'axios';
import Cabecalho from './cabecalho';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { CartContext } from '../contexts/cartContext.jsx';

export default function SignIn() {
    const navigate = useNavigate();
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const { persUser, setFirstLogin } = useContext(CartContext);

    const handleInputEmail = (e) => {
        setEmailValue(e.target.value);
    };
    
    const handleInputPassword = (e) => {
        setPasswordValue(e.target.value);
    };

    const signIn = (e) => {
        e.preventDefault();
    
        axios.get(`https://tcc2-backend2.onrender.com/login/${emailValue}`)
            .then((response) => {
                const { name, email, password, complemento, historico_pedido } = response.data;
    
                persUser(name, email, password, complemento, historico_pedido || []);
    
                // Verifica se a senha informada está correta
                if (passwordValue === password) {
                    persUser(name, email, password, complemento, historico_pedido || []);
                    
                    // Limpa os campos do formulário
                    setEmailValue('');
                    setPasswordValue('');
                    
                    // Define que não é o primeiro login
                    setFirstLogin(false);
                    navigate('/'); // Redireciona após o login
                } else {
                    alert('Senha incorreta. Tente novamente.');
                }
            })
            .catch((error) => {
                alert('Erro interno no servidor');
                console.log(error);
            });
    };

    return (
        <>
            <Cabecalho />
            <div className="w-full px-[10%] h-screen bg-white flex flex-col items-center justify-start">
                <h1 className="mt-[50px] mb-[14px] w-full text-left text-[22px] font-bold text-[#733A8E]">Faça login com sua conta</h1>
                <p className="mb-[20px] w-full text-left text-[20px] text-[#808080]">É bom tê-lo de volta</p>

                <form className="w-full flex flex-col justify-center" onSubmit={signIn}>
                    <label className="capitalize text-[18px] w-full font-bold mb-[4px] text-[#733a8E]">email</label>
                    <input
                        className="text-[18px] text-[#000000] placeholder:text-[#808080] border border-[#E6E6E6] p-2 py-3 rounded-[10px] mb-[30px] focus:outline-none"
                        type="email"
                        placeholder="Coloque seu email"
                        value={emailValue}
                        onChange={handleInputEmail}
                    />
                    
                    <label className="capitalize text-[18px] w-full font-bold mb-[4px] text-[#733a8E]">senha</label>
                    <input
                        className="text-[18px] text-[#000000] placeholder:text-[#808080] border border-[#E6E6E6] p-2 py-3 rounded-[10px] mb-[30px] focus:outline-none"
                        type="password"
                        placeholder="Coloque sua senha"
                        value={passwordValue}
                        onChange={handleInputPassword}
                    />

                    <input className="mt-[20px] capitalize w-full bg-[#E6E6E6] text-[#FFFFFF] text-[20px] py-3 rounded-[8px]" type="submit" value='login' />

                    <p className="mt-[40px] mb-[60px] text-center w-full text-[#733a8e]">Esqueceu sua senha? <a href="#" className="text-[#3B7A58]">Recupere sua senha</a></p>
                    <p className="mt-[40px] mb-[60px] text-center w-full text-[#733a8e]">Não tem uma conta ainda? <a href="/sign-up" className="text-[#3B7A58]">Cadastre-se</a></p>
                </form>
            </div>
        </>
    );
}
