import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-1 px-[4%] justify-between'>
      <img src={assets.logo} alt="Logo" className='w-[max(8%,40px)]' />
      <button onClick={()=>setToken('')} className='bg-gray-600 px-5 py-1 sm:px-7 text-white rounded-2xl cursor-pointer'>Log out</button>
    </div>
  )
}

export default Navbar
