import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title'
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant')

  
  useEffect(() => {
    setFilterProducts(products)
  },[])

  // Getting value of category
  const toogleCategory = (e) => {
    // checks if value of event target is already exist in category array
    if(category.includes(e.target.value)){
      // if category is existing in category array remove it
      setCategory(prev => prev.filter( item => item !== e.target.value))
    }else{
      // if category is not on the array add it in category array
      setCategory (prev => [...prev, e.target.value])
    }
  }

  // Getting value of subcategory
  const toogleSubCategory = (e) => {
    // checks if value of event target is already exist in subCategory array
    if(subCategory.includes(e.target.value)){
      // if subcategory is existing in subcategory array remove it
      setSubCategory(prev => prev.filter( item => item !== e.target.value))
    }else{
      // if subcategory is not on the array add it in subcategory array
      setSubCategory (prev => [...prev, e.target.value])
    }
  }

  // used debouncing to it will not always rendering when filtering
  // Memoize the filter function by
  const applyFilter = useCallback(() => {
    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    switch (sortType){
      case 'low-high':
         productsCopy= productsCopy.sort((a,b) => (a.price - b.price));
        break;
      case 'high-low':
         productsCopy= productsCopy.sort((a,b) => (b.price - a.price));
        break;
    }

    setFilterProducts(productsCopy);
  }, [products, showSearch, search, category, subCategory, sortType]);

  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilter();
    }, 300); // 300ms delay

    return () => clearTimeout(timer); // Cleanup on unmount or dependency change
  }, [category, subCategory, sortType, showSearch, search, applyFilter]);
  


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-400'>
      {/* Filter Optios */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center  cursor-pointer gap2'>FILTERS
          <img className={`h-3 pl-2 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="Dropdown" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-3 ${showFilter ? ' ' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <div className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toogleCategory} /> Men
            </div>

            <div className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toogleCategory} /> Women
            </div>

            <div className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toogleCategory} /> Kids
            </div>
            
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-3 ${showFilter? ' ' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <div className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toogleSubCategory}/> Topwear
            </div>

            <div className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toogleSubCategory}/> Bottomwear
            </div>

            <div className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toogleSubCategory}/> Winterwear
            </div>
            
          </div>
        </div>

      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'}/>
          {/* Product Sorting */}
          <select className='border-2 border-gray-300 text-sm px-2' onChange={(e)=> setSortType(e.target.value)}>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6' >
          {
            filterProducts.map((product, index) => {
              return (
                <ProductItem key={index} id={product._id} image={product.image} name={product.name} price={product.price} />
              )
            })
          }
        </div>
      </div>

      
    </div>
  )
}

export default Collection
