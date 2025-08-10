import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Order = () => {

  const { products, currency } = useContext(ShopContext)


  return (
    <div className='border-t border-gray-400 py-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>


      {/* ORDERS DATA */}
      <div>
        {
          products.slice(0,3).map((product, index) => {
            return(
              <div key={index} className='py-4 border-b border-gray-400 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex item-start gap-6 text-sm'>
                  <img className='w-16 sm:w-20' src={product.image[0]} alt="" />
                  <div>
                    <p className='sm:text-base font-medium'>{product.name}</p>
                    <div className='flex item-center gap-3 mt-2 text-base text-gray-600'>
                      <p className='text-lg'>{currency}{product.price}</p>
                      <p>Quantity: 1</p>
                      <p>Size: M</p>
                    </div>
                    <p>Date: <span className='text-gray-400'>July 25, 2024</span></p>
                  </div>
                </div>

                
                  <div className='md:w-1/2 flex justify-between'>
                    <div className='flex items-center gap-2'>
                      <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                      <p className='text-sm md:text-base'>Ready to Ship</p>
                    </div>

                    <button className='px-4 py-2 text-sm font-medium border border-gray-400 rounded'>Tract Order</button>
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
