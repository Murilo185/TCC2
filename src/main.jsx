
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import TelaPrincipal from './components/telaprincipal.jsx';
import Produto from './components/Produto.jsx';
import SignIn from './components/signin.jsx';
import SignUp from './components/signup.jsx';
import PersonalizarProduto from './components/PersonalizarProduto.jsx';
import { CartProvider } from './contexts/cartContext.jsx';
import Cabecalho from './components/cabecalho.jsx';
import DetalheItemCarrinho from './components/DetalheItemCarrinho.jsx';
import { QuantidadeProvider } from './contexts/quantidadeContext.jsx';
import User from './components/User.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <>
        <TelaPrincipal />
      </>
  },
 
  {
    path: "/sign-in",
    element: <SignIn />
  },
  {
    path: "/sign-up",
    element: <SignUp />
  },
  {
    path: "/produto/:product",
    element: <Produto />
  },
  {
    path: "/PersonalizarProduto/:product",
    element: <PersonalizarProduto />
  },
  {
    path: "/item/:itemId",
    element: <DetalheItemCarrinho />, // Rota para a página de detalhes do item
  },
  {
    path:"/User",
    element: <User />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <QuantidadeProvider>
    <React.StrictMode>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </React.StrictMode>
  </QuantidadeProvider>,
);