import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const Order = () => {

  const { backendUrl, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const getOrderData = async() => {

    try{
      if(!token){
        return null;
      }
      

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
      if(response.data.success){
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
         console.log(allOrdersItem.reverse())
        setOrderData(allOrdersItem.reverse())
      }else{
        toast.error(response.data.message)
      }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(()=>{
    getOrderData()
  },[token])

  return (
    <div className='border-t border-gray-400 py-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>


      {/* ORDERS DATA */}
      <div>
        {
          orderData.map((order, index) => {
            return(
              <div key={index} className='py-4 border-b border-gray-400 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex item-start gap-6 text-sm'>
                  <img className='w-16 sm:w-20' src={order.image[0]} alt="" />
                  <div>
                    <p className='sm:text-base font-medium'>{order.name}</p>
                    <div className='flex item-center gap-3 mt-2 text-base text-gray-600'>
                      <p className='text-lg'>{currency}{order.price}</p>
                      <p>Quantity: {order.quantity}</p>
                      <p>Size: {order.size}</p>
                    </div>
                    <p>Date: <span className='text-gray-400'>{new Date(order.date).toDateString()}</span></p>
                    <p>Payment Method: <span className='text-gray-400'>{order.paymentMethod}</span></p>
                  </div>
                </div>

                
                  <div className='md:w-1/2 flex justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                      <p className='text-sm md:text-base'>{order.status}</p>
                    </div>

                    <button onClick={getOrderData} className='px-4 py-2 text-sm font-medium border border-gray-400 rounded cursor-pointer'>Track Order</button>
                  </div>
              </div>
            )
          })
        }
      </div>
    </div>
    
  )
}

export default Order
