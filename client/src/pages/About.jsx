import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-4xl text-center border-t border-gray-400 pt-8'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col sm:flex-row gap-16'>
        <img src={assets.about_img} alt="About Us Image"  className='w-full sm:max-w-[250px] md:max-w-[350px] lg:max-w-[550px]'/>
        <div className='flex flex-col justify-center gap-6 md:w-3/4 text-gray-600'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize online shopping. The company started with a simple idea: to create a platform where customers could easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>Since its inception, Forever has worked tirelessly to curate a diverse selection of high-quality products, catering to every taste and preference. Their extensive collection spans categories like fashion, beauty, electronics, and home essentials, all sourced from trusted brands and suppliers.</p>

          <b className='text-gray-600'>Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We’re dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US?'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mt-20 gap-3'>
        <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-8 flex flex-col gap-5'>
          <b className='text-[20px]'>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, iste voluptate tempora dolore provident totam porro officiis omnis, quis deleniti maxime voluptas eius aspernatur modi. Vero odio fugit sit accusamus.</p>
        </div>

         <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-8 flex flex-col gap-5'>
          <b className='text-[20px]'>Convinience:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, iste voluptate tempora dolore provident totam porro officiis omnis, quis deleniti maxime voluptas eius aspernatur modi. Vero odio fugit sit accusamus.</p>
        </div>

         <div className='border border-gray-400 px-10 md:px-16 py-8 sm:py-8 flex flex-col gap-5'>
          <b className='text-[20px]'>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi, iste voluptate tempora dolore provident totam porro officiis omnis, quis deleniti maxime voluptas eius aspernatur modi. Vero odio fugit sit accusamus.</p>
        </div>
      </div>
    </div>
    
  )
}

export default About
