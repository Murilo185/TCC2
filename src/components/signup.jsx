export default function SignUp() {
    return(
        <div className="w-full px-[10%] h-screen bg-white flex flex-col items-center justify-start">
            <h1 className="mt-[50px] mb-[14px] w-full text-left text-[22px] font-bold text-[#733A8E]">Crie sua conta</h1>
            <p className="mb-[20px] w-full text-left text-[20px] text-[#808080]">Vamos criar sua conta</p>

            <form className="w-full flex flex-col justify-center">
                <label className="capitalize  text-[18px] w-full font-bold mb-[4px] text-[#733a8E]">Nome completo</label>
                <input
                    className="text-[18px] text-[#E6E6E6] placeholder:text-[#E6E6E6] border border-[#E6E6E6] p-2 py-3 rounded-[10px] mb-[30px]"
                    type="email"
                    placeholder="Coloque seu nome completo"
                />
                
                <label className="capitalize  text-[18px] w-full font-bold mb-[4px] text-[#733a8E]">email</label>
                <input
                    className="text-[18px] text-[#E6E6E6] placeholder:text-[#E6E6E6] border border-[#E6E6E6] p-2 py-3 rounded-[10px] mb-[30px]"
                    type="email"
                    placeholder="Coloque seu endereço de email"
                />
                
                <label className="capitalize  text-[18px] w-full font-bold mb-[4px] text-[#733a8E]">senha</label>
                <input
                    className="text-[18px] text-[#E6E6E6] placeholder:text-[#E6E6E6] border border-[#E6E6E6] p-2 py-3 rounded-[10px] mb-[30px]"
                    type="password"
                    placeholder="Coloque sua senha"
                />

                <p className="mb-[20px] text-[14px] font-bold">Ao cadastrar-se você esta concordando com nossos <span className="text-[14px] text-[#3B7A58]">Termos, Privacidade, Politica</span> u uso de Cookies</p>

                <input className="mt-[20px] capitalize w-full bg-[#E6E6E6] text-[#FFFFFF] text-[20px] py-3 rounded-[8px]" type="submit" value='Crie sua conta' />

                <div className="mt-[30px] flex justify-center items-center w-full">
                    <div className="flex-grow-[1] bg-[#3B7A58] h-[2px]"></div>
                    <p className="text-[18px] px-3 text-[#3B7A58] font-bold">Ou</p>
                    <div className="flex-grow-[1] bg-[#3B7A58] h-[2px]"></div>
                </div>

                <div className="mt-[20px] w-full text-center bg-transparent border-[1px] border-[#E6E6E6] text-[#000000] text-[18px] py-3 rounded-[8px]" >
                    Faça login com google
                </div>

                <p className="mt-[40px] mb-[60px] text-center w-full text-[#733a8e]">Já tem uma conta <span href="#" className="text-[#3B7A58]">Entre</span>
                </p>

            </form>
        </div>
    )
}