import React from 'react'

const NewsLetterBox = () => {
  const subscribeBtn = (e) => {
    e.preventDefault();
  }
  return (
    <div className='text-center'>
      <p className='text-xl font-medium text-gray-700'>Subscribe now and get 20% discount</p>
      <p className='text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, nisi! Laborum </p>

      <form onSubmit={subscribeBtn} className='w-full sm:w-1/2 flex item-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-0' type="email" placeholder='Enter you email' required/>
        <button type='submit' className='bg-black text-white px-10 py-4 cursor-pointer'>SUBSCRIBE</button>
      </form>

    </div>
  )
}

export default NewsLetterBox
