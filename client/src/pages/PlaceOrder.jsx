import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

  const { navigate } = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[48vh] border-t border-gray-400'>
      
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input type="text" placeholder='First Name' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Last Name' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
        </div>

        <input type="text" placeholder='Email Address' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
        <input type="text" placeholder='Street' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />

        <div className='flex gap-3'>
          <input type="text" placeholder='City' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Province' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
        </div>

         <div className='flex gap-3'>
          <input type="text" placeholder='Zipcode' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
          <input type="text" placeholder='Country' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
        </div>

         <input type="number" placeholder='Phone No.' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />

      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-120'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* PAYMENT METHOD SELECTION */}
          <div className='flex gap-2 flex-col sm:flex-row '>
            <div onClick={()=>setPaymentMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-400 '>
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${paymentMethod === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} alt="" className='h-5 mx-4' />
            </div>

            <div onClick={()=>setPaymentMethod('razor')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-400 '>
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${paymentMethod === 'razor' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="" className='h-5 mx-4' />
            </div>

            <div onClick={()=>setPaymentMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer border-gray-400 '>
              <p className={`min-w-3.5 h-3.5 border border-gray-400 rounded-full ${paymentMethod === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p>Cash on Delivery</p>
            </div>

          </div>

          {/* PLACE ORDER*/}
          <div className='w-full text-end mt-8'>
            <button onClick={()=>navigate('/orders')} className='bg-black text-white text-sm px-10 py-2 cursor-pointer'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder
