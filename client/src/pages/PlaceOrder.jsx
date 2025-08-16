import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    province:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (e) =>{
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({...data,[name]:value}))
  }

  const onSubmitHandler = async(e) =>{
    e.preventDefault()
    try{

      let orderItems = [];

      for(const items in cartItems){
        for(const item in  cartItems[items]){
          if(cartItems[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      console.log(orderItems)


      let orderData = {
        address:formData,
        items:orderItems,
        amount:getCartAmount() + delivery_fee,

      }

      switch (paymentMethod){
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
          if(response.data.success){
              setCartItems({})
              navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
          break;

        default:
          break;
      }

    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }


  return (
    <form onSubmit={onSubmitHandler}  className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[48vh] border-t border-gray-400'>
      
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' required />
          <input onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' required/>
        </div>

        <input onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email Address' className='border border-gray-400 rounded py-1.5 px-3.5 w-full'required/>
        <input onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />

        <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
          <input onChange={onChangeHandler} name='province' value={formData.province} type="text" placeholder='Province' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
        </div>

         <div className='flex gap-3'>
          <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="text" placeholder='Zipcode' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
          <input onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' />
        </div>

         <input onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone No.' className='border border-gray-400 rounded py-1.5 px-3.5 w-full' required/>

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
            <button type='submit'  className='bg-black text-white text-sm px-10 py-2 cursor-pointer'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
