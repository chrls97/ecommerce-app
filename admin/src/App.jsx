import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import Login from './pages/Login'

//TOASTIFY
import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css'


export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer autoClose={2000} />
      {/* if token is empty go to login page */}
      {token === ''? <Login setToken={setToken} /> :
        <>
          <Navbar setToken={setToken} />
          <hr className='border-none bg-gray-400 h-[0.5px]' />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[85%]  mx-[max(2vw,20px)] my-6 text-gray-600 text-base'>
              <Routes>
                <Route path='/' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/order' element={<Order token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  

  )
}

export default App
