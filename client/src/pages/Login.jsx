import React, { useState } from 'react'

const Login = () => {


  const [currentState, setCurrentState] = useState('Login');

  const chargeCurrentState = () =>{
    if(currentState === 'Sign up'){
      setCurrentState('Login')
    }else{
      setCurrentState('Sign up')
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={()=>onSubmitHandler(e)} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-4xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>      
      {currentState === 'Login' ? '' :<input type="text" className='w-full px-3 py-2 border border-gray-400' placeholder='Name' required /> }
      <input type="email" className='w-full px-3 py-2 border border-gray-400' placeholder='Email' required/>
      <input type="password" className='w-full px-3 py-2 border border-gray-400' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px] '>
        <p className='cursor-pointer hover:text-red-500 transition ease-in-out duration-200'>Forgot Password</p>
        {
          currentState === 'Login' 
          ? <p onClick={()=>chargeCurrentState()} className='cursor-pointer hover:text-blue-500 transition ease-in-out duration-200'>Create Account</p>
          : <p onClick={()=>chargeCurrentState()} className='cursor-pointer hover:text-blue-500 transition ease-in-out duration-200'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white w-full py-2 cursor-pointer'>{currentState}</button>
    </form>
  )
}

export default Login
