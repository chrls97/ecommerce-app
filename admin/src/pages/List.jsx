import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {


  const [productList, setProductList] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
        setProductList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }


  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token } })
      if (response.data.success) {
        console.log(response)
        toast.success(response.data.message)
        await fetchProducts();
      } else {
        toast.error(response.data.message)
      }
      console.log(response)


    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [])

  return (
    <>
      <p className='mb-5'>All Product List</p>

      <div className='flex flex-col gap-2'>
        {/* LIST TABLE TITLE */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-200  text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/*PRODUCT LIST TABLE */}
        {
          productList.length === 0 ? <div className='flex items-center justify-center mt-2 text-red-400'> No Product Available </div>:
          productList.map((product, index) => {
            return (
              <div key={index} className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center border border-gray-400 px-2 py-2 text-sm'>
                <img src={product.image[0]} alt="Images" className='w-15' />
                <b>{product.name}</b>
                <b>{product.category}</b>
                <b>{currency}{product.price.toFixed(2)}</b>
                <p onClick={() => removeProduct(product._id)} className='text-right md:text-center cursor-pointer text-xl'>X</p>
              </div>
            )
          })
        
        }
      </div>
    </>
  )
}

export default List
