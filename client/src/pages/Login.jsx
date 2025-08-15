import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Login = () => {

  const { backendUrl, setToken, token, navigate } = useContext(ShopContext)
  const [currentState, setCurrentState] = useState('Login');

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const chargeCurrentState = () => {
    if (currentState === 'Sign up') {
      setCurrentState('Login')
      clearValue()
    } else {
      setCurrentState('Sign up')
      clearValue()
    }
  }

  const clearValue = () =>{
    setName('');
    setEmail('');
    setPassword('');
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        if (currentState === 'Login') {
          const response = await axios.post(backendUrl + "/api/user/login",{email, password})
          if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token)
          }else{
            toast.error(response.data.message)
          }

        }else{
          const response = await axios.post(backendUrl + "/api/user/register",{name, email, password})
          if(response.data.success){
            setCurrentState('Login')
            toast.success('Registration Success, Please login your account')
          }else{
            toast.error(response.data.message)
          }
        }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      //navigate to home page
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={submitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-4xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-400' placeholder='Name' required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-400' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-400' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px] '>
        <p className='cursor-pointer hover:text-red-500 transition ease-in-out duration-200'>Forgot Password</p>
        {
          currentState === 'Login'
            ? <p onClick={() => chargeCurrentState()} className='cursor-pointer hover:text-blue-500 transition ease-in-out duration-200'>Create Account</p>
            : <p onClick={() => chargeCurrentState()} className='cursor-pointer hover:text-blue-500 transition ease-in-out duration-200'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white w-full py-2 cursor-pointer'>{currentState}</button>
    </form>
  )
}

export default Login
