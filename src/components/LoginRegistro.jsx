import React, { useState } from "react";
import "./LoginRegistro.css";
import { AiFillEyeInvisible } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";
import { AiTwotoneMail } from "react-icons/ai";
import {auth, getRedirectResult, provider, signInWithPopup, GoogleAuthProvider} from '../utils/firebase.js'

import axios from "axios";

//Constante da tela de login e registro//
const Login = () => {

  const [type, setType] = useState('text')

  // Função de esconder e mostrar senha
  function toggleType() {
    if(type == 'password'){
        setType('text')
      }else{
        setType('password')
      }
  }

  const [action, setAction] = useState("Login");

  function env() {
    axios
      .get("http://localhost:3000/login/")
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  async function signInPopup(){
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log(user)
        // Redirecionar ou atualizar a UI após o login bem-sucedido
      } catch (error) {
        console.log(error)
      }
    }
  


  //Retorno do login e registro//
  return (
    <div className="container">
      
      <div className="header">
        
        <div className="text">{action}</div>
        <div className="underline"></div>

      </div>
      
      <div className="inputs">

        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <IoMdPerson size={40} />
            <input type="text" placeholder="Nome" />
          </div>
        )}

        <div className="input">
          
          <AiTwotoneMail size={40} />
          <input type="email" placeholder="Email" />

        </div>
        
        <div className="input">
          
          <AiFillEyeInvisible size={40} />
          <input id="myInput" type={type} placeholder="Senha" />
          {/*Tentativa de esconder e mostrar senha <input type="checkbox" onclick="myFunction()"/> */}
          
          <div className={``} onClick={() => toggleType()}>
            trocar o tipo
          </div>

        </div>

      </div>

      {action === "Registro" ? (
        <div></div>
      ) : (
        <div className="esqueceu-senha">
          Esqueceu sua senha? <a href="#"> Clique aqui!</a>
        </div>
      )}

      {action === "Login" ? (
        <div></div>
      ) : (
        <div className="termo">

          <input type="checkbox" id="contrato" name="contrato" value="termo" />
          <label htmlFor="contrato">Aceito os termos de uso.</label>

        </div>
      )}

      <div className="submit-container" onClick={() => env()}>
        
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Login");
            env();
          }}
        >
          Login
        </div>

        <div
          className={action === "Registro" ? "submit gray" : "submit"}
          onClick={() => {
            setAction("Registro");
          }}
        >
          Registro
        </div>

      </div>

      {action === "Registro" ? (
        <div></div>
      ) : (
        <div className="cadastro">
          
          Não possui uma conta?{" "}
          <a
            href="#"
            onClick={() => {
              setAction("Registro");
            }}
          >
            Cadastre-se aqui.
          </a>

        
        </div>
      )}
      <button onClick={()=>{
        signInPopup()
      }}><p>login com o Google</p></button>
    </div>
  );
};

export default Login;
