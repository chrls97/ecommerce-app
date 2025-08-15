import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {

  // get the products from shopcontext
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(()=>{
    setLatestProducts(products.slice(0,10))
  },[products])

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className='w-3/4 m-auto text-sm sm:text-base lg:text-lg text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt hic reiciendis itaque consequuntur Lorem ipsum dolor sit, amet consectetur a </p>
      </div>
      {/* Rendering Product Items Components */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
        {
          latestProducts.map((product, index) => {
            return(
              <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price}  />
            )
          })
        }
      </div>
    </div>
  )
}

export default LatestCollection
