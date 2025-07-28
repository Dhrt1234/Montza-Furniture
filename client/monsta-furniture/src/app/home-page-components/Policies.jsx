import React from 'react'
import { BiWorld } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { LuCircleCheckBig } from "react-icons/lu";

export default function Policies() {
    return (

        <section className='bg-gray-50 py-20 my-7'>
            <div className='w-full mx-auto px-7 sm:px-6 grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-10 text-center'>
                {/* Policy-1 */}
                <div className=' flex flex-col items-center'>
                    <div className=' group hover:border-[#c09578] relative w-16 h-16 rounded-full flex items-center justify-center border-2 border-gray-700 '>
                        <BiWorld className='absolute text-2xl group-hover:text-[#c09578] ' />
                    </div>
                    <h3 className='text-lg font-bold mt-4'>
                    Free Shipping   
                    </h3>
                    <p className='text-gray-500 text-[16px]'>Free shipping on all order</p>


                </div>


                  {/* Policy-2 */}
                  <div className=' flex flex-col items-center'>
                    <div className=' group hover:border-[#c09578] relative w-16 h-16 rounded-full flex items-center justify-center border-2 border-gray-700 '>
                        <LuCircleCheckBig className='absolute text-2xl group-hover:text-[#c09578] ' />
                    </div>
                    <h3 className='text-lg font-bold mt-4'>
                    Money Return   
                    </h3>
                    <p className='text-gray-500 text-[16px]'>Back guarantee under 7 days</p>


                </div>


                  {/* Policy-3 */}
                  <div className=' flex flex-col items-center'>
                    <div className=' group hover:border-[#c09578] relative w-16 h-16 rounded-full flex items-center justify-center border-2 border-gray-700 '>
                        <FaRegClock className='absolute text-2xl group-hover:text-[#c09578] ' />
                    </div>
                    <h3 className='text-lg font-bold mt-4'>
                    Online Support 
                    </h3>
                    <p className='text-gray-500 text-[16px]'>Support online 24 hours a day</p>


                </div>

            </div>



        </section>






    )
}
