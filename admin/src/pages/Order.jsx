import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'

const Order = ({ token }) => {

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      if(response.data.success){
        setOrders(response.data.orders)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  const statusHandler = async (e, orderId) => {
    try{
      const response = await axios.post(backendUrl + '/api/order/update', {orderId, status:e.target.value}, {headers:{token}})
      if(response.data.success){
        
        await fetchAllOrders();
        toast.success(response.data.message)
        console.log(response.data);
        
      }else{
        toast.error(response.data.message)
      }
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token])

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order,index) => {
            return(
              <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 item-start border border-gray-400 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
                <img src={assets.parcel_icon} alt="Parcel" className='w-12'/>

                <div>
                  <div>
                    {
                      order.items.map((item,index)=>{
                        // Get the last item
                        if(index === order.items.length - 1){
                          return <p key={index} className='py-0.5'>{item.name} x {item.quantity} x {item.size}</p>
                        }else{
                          return <p key={index} className='py-0.5'>{item.name} x {item.quantity} x {item.size} ,</p>
                        }
                      })
                    }
                  </div>
                  <p className='mt-2 mb-2 font-bold'>{order.address.firstName} {order.address.lastName}</p>
                  <div>
                    <p>{order.address.street}</p>
                    <p>{order.address.city}  {order.address.province} {order.address.country} Zipcode:{order.address.zipcode} </p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                
                <div>
                  <p>Items: {order.items.length}</p>
                  <p className='mt-3 '>Method: {order.paymentMethod}</p>
                  <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p>{currency} {(order.amount).toFixed(2)}</p>

                <select onChange={(e)=>statusHandler(e, order._id)} value={order.status} className='h-8 px-2'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
                
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Order
