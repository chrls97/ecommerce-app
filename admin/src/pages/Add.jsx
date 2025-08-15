import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState('');
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear')
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    try {
      const formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)

        setName('')
        setDescription('')
        setPrice('')
        setCategory('Men')
        setSubCategory('Topwear')
        setBestseller(false)
        setSizes([])
      }
      else {
        toast.warning(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.warning(error.message)
    } finally{
      setIsSubmitting(false)
    }
  }

  return (
    
    <form onSubmit={submitHandler} className='flex flex-col w-full item-start gap-2 relative'>
     
      
      <div >
        <p className='mb-1'>Upload Image</p>

        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="Upload Image" className='w-20' />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>

          <label htmlFor="image2">
            <img src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="Upload Image" className='w-20' />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>

          <label htmlFor="image3">
            <img src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="Upload Image" className='w-20' />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>

          <label htmlFor="image4">
            <img src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="Upload Image" className='w-20' />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-1'>Product Name</p>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Product Name' required className='w-full max-w-[500px] px-3 py-2' />
      </div>

      <div className='w-full'>
        <p className='mb-1'>Product Description</p>
        <textarea type="text" onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Product Description' required className='w-full max-w-[500px] px-3 py-2' />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-1'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-1'>Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className='mb-1'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} type="number" placeholder='0.00' className='w-full sm:w-[175px] px-3 py-2' />
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <p>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => setSizes(prev => prev.includes('S') ? prev.filter(item => item !== 'S') : [...prev, 'S'])}>
            <p className={`${sizes.includes('S') ? 'bg-pink-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes('M') ? prev.filter(item => item !== 'M') : [...prev, 'M'])}>
            <p className={`${sizes.includes('M') ? 'bg-pink-200' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>M</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes('L') ? prev.filter(item => item !== 'L') : [...prev, 'L'])}>
            <p className={`${sizes.includes('L') ? 'bg-pink-200' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>L</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes('XL') ? prev.filter(item => item !== 'XL') : [...prev, 'XL'])}>
            <p className={`${sizes.includes('XL') ? 'bg-pink-200' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>XL</p>
          </div>

          <div onClick={() => setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev, 'XXL'])}>
            <p className={`${sizes.includes('XXL') ? 'bg-pink-200' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(!bestseller)} checked={bestseller} type="checkbox" id='bestseller' />
        <label htmlFor="bestseller" className='cursor-pointer'>Add to Best Seller</label>
      </div>

      <button type='submit' className='w-40 py-2 mt-2 bg-black text-white cursor-pointer' disabled={isSubmitting} >Add Product</button>
    </form>
  )
}

export default Add
