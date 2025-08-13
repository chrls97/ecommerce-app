import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[15%] min-h-screen border-r border-gray-400'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
        <NavLink to='/' className='flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2 rounded-l'>
          <img src={assets.add_icon} alt="Add" className='w-5 h-5' />
          <p className='hidden md:block'>Add Item</p>
        </NavLink>

        <NavLink to='/list' className='flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2 rounded-l'>
          <img src={assets.order_icon} alt="Add" className='w-5 h-5' />
          <p className='hidden md:block'>List</p>
        </NavLink>

        <NavLink to='/orders' className='flex items-center gap-3 border border-gray-400 border-r-0 px-3 py-2 rounded-l'>
          <img src={assets.add_icon} alt="Add" className='w-5 h-5' />
          <p className='hidden md:block'>Orders</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
