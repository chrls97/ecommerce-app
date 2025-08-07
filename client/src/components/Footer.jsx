import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'> 
        <div>
          <img src={assets.logo} alt="Logo" className='mb-5 w-32' />
          <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt eligendi corporis perspiciatis illo vel ipsa optio vero voluptate perferendis. Itaque reiciendis aliquid esse blanditiis excepturi eveniet quasi quas natus est.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>Get In Touch</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-251-885-000</li>
            <li>contact@forveryou.com</li>
            <li></li>
          </ul>
        </div>
      </div>
  

      <div>
        <hr />
        <p className='text-center py-4 text-gray-600 text-sm'>Copywright 2024@forver.com - All Rights Reserve</p>
      </div>
    </div>
  )
}

export default Footer
