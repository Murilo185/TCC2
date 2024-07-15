import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/LoginRegistro.jsx';
import TelaPrincipal from './components/telaprincipal.jsx'
import Produto from './components/Produto.jsx';
import SignIn from './components/signin.jsx';
import SignUp from './components/signup.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <TelaPrincipal />
  },
  {
    path: "/login",
    element: <Login />
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    
  </React.StrictMode>,
)
import 'bootstrap/dist/css/bootstrap.min.css';