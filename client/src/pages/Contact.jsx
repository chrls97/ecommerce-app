import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-4xl pt-8 border-t border-gray-400'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>


      <div className='my-10 flex flex-col justify-center  md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} alt="Contact Image" className='w-full md:max-w-[480px]' />
        <div className='flex flex-col justify-center item-start gap-6'>
          <p  className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Mambog 1 Bacoor <br /> Cavite Philippines</p>
          <p className='text-gray-500'>Tel: (233) 555-223 <br />Email: camon1107@gmail.com</p>
          <p  className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
          <p className='text-gray-500'>Learn more about our teams and job openings</p>
          <button className='border text-black py-3 px-2 text-sm hover:bg-black hover:text-white transition ease-in-out duration-300 cursor-pointer'>Explore Jobs</button>
        </div>

      </div>
    </div>
  )
}

export default Contact
