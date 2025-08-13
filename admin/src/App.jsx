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

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])
  
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer autoClose={1000} />
      {token === ''? <Login setToken={setToken} /> :
        <>
          <Navbar />
          <hr className='border-none bg-gray-400 h-[0.5px]' />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[85%] mx-auto ml-[max(2vw,20px)] my-6 text-gray-600 text-base'>
              <Routes>
                <Route path='/' element={<Add />} />
                <Route path='/list' element={<List />} />
                <Route path='/order' element={<Order />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  

  )
}

export default App
