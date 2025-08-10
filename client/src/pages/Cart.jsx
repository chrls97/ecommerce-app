import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';
import { NavLink } from 'react-router-dom'

const Cart = () => {

  const { products, currency, cartItems, updateCartQty, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  const tempData = [];

  useEffect(() => {
 

    for(const productId in cartItems){
      for(const productSize in cartItems[productId]){
        if(cartItems[productId][productSize] > 0){
          tempData.push({
            _id: productId,
            size: productSize,
            quantity: cartItems[productId][productSize]
          })
        }
      }
    }
    setCartData(tempData)
  },[cartItems])

  return (
    <div className='border-t border-gray-400 pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      

      {cartData.length === 0 ? 
        //cart empty
        <div className='flex flex-col w-full items-center justify-center mt-20'>
          <h1 className='text-3xl text-gray-600'>Your cart is empty :(</h1>
          <NavLink to='/collection'><button className=' py-1 px-2  cursor-pointer text-white bg-blue-500 rounded mt-5'>Click here to shop</button></NavLink>
          
        </div> :
        //cart not empty
        <div>
          {
            cartData.map((item,index) => {
              const productData = products.find((product) => product._id == item._id);
              return(
                <div key={index} className='py-5 border-b border-gray-400 text-gray-700 grid grid-cols-[2fr_0.5fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_2fr_0.5fr] items-center gap-4'>
                  <div className='flex items-start gap-6'>
                    <img src={productData.image[0]} alt="Image" className='w-16 sm:w-20' />
                    <div>
                      <p className='text-sm sm:text-lg'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p>{currency}{productData.price}</p>
                        <p className='px-2  border border-gray-200 bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <input onChange={(e)=> e.target.value == '' || e.target.value == '0' ? null : updateCartQty(item._id, item.size, Number(e.target.value))} 
                  type="number" placeholder='0' min={1} defaultValue={item.quantity} className='border rounded border-gray-400 max-w-15 px-2 py-1' />
                  <div className='flex flex-col'>
                    <p className='font-semibold'>Total</p>
                    <p>{(item.quantity*productData.price).toFixed(2)}</p>
                  </div>
                  
                  <img onClick={()=>updateCartQty(item._id,item.size,0)} src={assets.bin_icon} alt="Delete" className='w-5 cursor-pointer' />
                </div>
              )
            })
          }

          
          <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'> 
              <CartTotal />
              <div className='w-full text-end'>
                <button onClick={()=>navigate('/place-order')} className='bg-black text-white py-3 px-5 mt-5 text-sm cursor-pointer'>PROCEED TO CHECKOUT</button>
                
              </div>
            </div>
          </div>
          
        </div>
      
      }
    </div>
  )
}

export default Cart
