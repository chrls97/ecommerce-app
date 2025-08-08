import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
  const [visible, setVisible] = useState(false)
  //check location path
  const location = useLocation();

  useEffect(()=> {
    if(location.pathname.includes('collection')){
      setVisible(true)
    }else{
      setVisible(false)
    }
  },[location])

  //if showSearch and visible is true show the search component
  return showSearch && visible ?(
    <div className='border-t  border-gray-400 bg-gray-50 text-center py-5'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 rounded-full w-3/4 sm:w-1/2'>
        <input className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' value={search} onChange={(e)=>setSearch(e.target.value)} />
        <img className='w-4' src={assets.search_icon} alt="Search" />
      </div>

      <img className='inline w-3 cursor-pointer ml-5' src={assets.cross_icon} alt="Close" onClick={()=>setShowSearch(false)} />
    </div>
  ) : null
}

export default SearchBar
