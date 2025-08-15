import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    const bestProduct = products.filter((product)=>(product.bestseller))

    setBestSeller(bestProduct.slice(0,5))


  },[products])

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'COLLECTIONS'} />
      </div>
      {/* Rendering Product Items Components */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
        {
          bestSeller.map((product, index) => {
            return(
              <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price}  />
            )
          })
        }
      </div>
    </div>
  )
}

export default BestSeller
