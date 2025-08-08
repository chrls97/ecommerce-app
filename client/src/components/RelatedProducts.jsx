import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react';
import ProductItem from './ProductItem';
import Title from './Title'

const RelatedProducts = ({category, subCategory}) => {

  const { products } = useContext(ShopContext); 
  const [related, setRelated] = useState([])

  useEffect(() => {
    if(products.length > 0){

      let productsCopy = products.slice();


      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
      

     
      setRelated(productsCopy.slice(0,5))
    }
  },[products])

  return (
    <div className='flex flex-col text-3xl my-25'>
      <Title text1='RELATED' text2='PRODUCTS'/>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5'>
        {
          related.map((product, index) => {
            return(
              <ProductItem key={index}  id={product._id} image={product.image} name={product.name} price={product.price} />
            )
          })
        }
      </div>
    </div>
  )
}

export default RelatedProducts
