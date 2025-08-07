import React from 'react'
import { BsQuote, BsFillStarFill } from "react-icons/bs";

type TestimonialsProps = {
    name: string,
    testimonial: string
}

const Testimonials = ({name, testimonial}: TestimonialsProps) => {
  return (
    <div className='justify-items-center bg-white mt-8 p-[30px] rounded-md min-h-[325px]'>
        <div className='p-3 bg-gray-200 rounded-full'>
            <BsQuote size={25} strokeWidth={0.3} />
        </div>
        <div className='flex flex-row py-4'>
            <BsFillStarFill size={20} strokeWidth={0.3} color='#f2c45a' />
            <BsFillStarFill size={20} strokeWidth={0.3} color='#f2c45a' />
            <BsFillStarFill size={20} strokeWidth={0.3} color='#f2c45a' />
            <BsFillStarFill size={20} strokeWidth={0.3} color='#f2c45a' />
            <BsFillStarFill size={20} strokeWidth={0.3} color='#f2c45a' />
        </div>
        <p className='py-4 italic text-lg'>"{testimonial}"</p>
        <p className='pt-6 font-semibold text-base'>{name}</p>
    </div>
  )
}

export default Testimonials
