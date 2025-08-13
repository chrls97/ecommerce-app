import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
      if (response.data.success == true) {
        setToken(response.data.token)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }


  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <div className='flex flex-col gap-2 border border-gray-300 rounded px-10 py-10 w-[400px] bg-white shadow-md'>
        <h1 className='font-semibold text-3xl'>Admin Panel</h1>
        <form onSubmit={submitHandler} className='flex flex-col gap-3'>
          <div>
            <p className='mb-1'>Emaill Address</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required />
          </div>

          <div>
            <p className='mb-1'>Password</p>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Password' required />
          </div>

          <button className='bg-black text-white w-full py-2 rounded cursor-pointer'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
