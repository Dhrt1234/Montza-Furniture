import React from 'react'
import Link from 'next/link'
import { IoIosArrowForward } from "react-icons/io";
import FaqComponent from './FaqComponent';


export default function faq() {
  return (
    
    <section>
    {/* title of Page */}
    <h3 className="text-center text-[35px] font-bold text-[#333] mt-3 pt-3">Frequently Questions</h3>

    <div className="justify-center flex items-center mb-6">
        <Link href="/" className="hover:text-[#C09578] cursor-pointer text-[14px] text-[#555]">
            Home
        </Link>
        <span className="flex items-center text-[14px] text-[#C09578]">
            <IoIosArrowForward className="mx-1 text-[#C09578]" />
            Frequently Questions
        </span>

    </div>
    <div className="border-b border-[#ccc] w-full m-auto pb-4"> </div>
 
 
 
 {/* faq section */}
 
 <FaqComponent />
 </section>
 
  )
}
