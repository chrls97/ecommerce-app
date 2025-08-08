import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {

  // all products data
  const {products, currency} = useContext(ShopContext);
  // get the pass parameter value
  const {productId} = useParams();
  const [productData, setProductData] = useState(false);
  const [productImg, setProductImg] = useState('');
  const [size, setSize] = useState('');

  // get the product with corresponding product id
  const getProduct = async() => {
    products.map((product) => {
      if(product._id === productId){
        setProductData(product);
        setProductImg(product.image[0]);
        return null;
      }
    })
  }

  // load the getProduct function
  useEffect(() => {
    getProduct();
  },[products])

  console.log(size)


  return productData ? (
    <div className='border-t border-gray-400 pt-10 transition-opacity ease-in duration-500 opacity-100'>

      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((image, index) => {
                return(
                  <img onClick={()=>setProductImg(image) } key={index} src={image} alt="Image" className=' sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                )
              })
            }
          </div>

          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={productImg} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>  
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="start" className='w-3'/>
            <img src={assets.star_icon} alt="start" className='w-3'/>
            <img src={assets.star_icon} alt="start" className='w-3'/>
            <img src={assets.star_icon} alt="start" className='w-3'/>
            <img src={assets.star_dull_icon} alt="start" className='w-3'/>
            <p className='pl-1'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 '>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex flex-row gap-2'>
              {
                productData.sizes.map((item,index) => {
                  return(
                    <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 cursor-pointer outline-0 ${item === size ? 'border-orange-300':'border-gray-100'}`} key={index}>{item}</button>
                  )
                })
              }
            </div>
            
          </div>
          <button className='bg-black text-white px-9 py-3 text-sm active:bg-gray-700 cursor-pointer'>ADD TO CART</button>
          <hr className='mt-8' />
          <div className='flex flex-col gap-1 text-sm text-gray-500 mt-5 '>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exhange policy within 7days.</p>
          </div>
        </div>
      </div>  
      
      {/* Review Products */}
      <div className='mt-15'>
        <div className='flex '>
          <p className='border-t border-l py-2 px-4 text-sm font-semibold'>Description</p>
          <p className='border-t border-r border-l py-2 px-4 text-sm'>Reviews (122)</p>
        </div>
        <div className='border py-6 px-4 text-sm text-gray-500'>
            <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>

            <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
        </div>

      </div>

      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div> </div>
}

export default Product
