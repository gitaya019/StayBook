import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css'
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import {createHashRouter, RouterProvider} from 'react-router-dom';


const router = createHashRouter([
  {
    path:'/',
    element: <HomePage />
  },
  {
    path:'/register',
    element: <RegisterPage/>
  },
  {
    path:'/login',
    element: <LoginPage/>
  },
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
