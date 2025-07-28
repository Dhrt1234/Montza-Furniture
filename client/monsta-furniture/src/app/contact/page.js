import React from 'react'
import Link from 'next/link';
import { IoIosArrowForward } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FaPhoneAlt } from "react-icons/fa";
export default function Contact() {
  return (
    <section>
      {/* title of Page */}
      <h3 className="text-center text-[35px] font-bold text-[#333] mt-3 pt-3">Contact Us</h3>

      <div className="justify-center flex items-center mb-6">
        <Link href="/" className="hover:text-[#C09578] cursor-pointer text-[14px] text-[#555]">
          Home
        </Link>
        <span className="flex items-center text-[14px] text-[#C09578]">
          <IoIosArrowForward className="mx-1 text-[#C09578]" />
          Contact Us
        </span>

      </div>
      <div className="border-b border-[#ccc] w-full m-auto pb-4"> </div>
      <div className='my-9 max-w-5xl m-auto'>

        <iframe
          src='https://www.google.com/maps/dir//1st%20Floor,%20Plot%20no.%2021,%20Manav%20Ashram%20Colony,%20Vasundhara%20Colony,%20Gopal%20Pura%20Mode,%20Jaipur%20-%20Rajasthan%20-%20India%20(302018)'
          width="100%"
          height="450"
          className='sm:px-2'
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"


        >
        </iframe>
      </div>
      <section className='py-10 bg-white'>
        <div className='max-w-5xl mx-auto grid md:grid-cols-2 gap-10'>
          {/* left side cont info */}
          <div>



            <h2 className='text-[22px] font-bold mb-6'>Contact Us</h2>
            <div className='h-0.5 bg-gray-200 w-full'></div>
            <div className=' space-y-4 flex items-start gap-3 py-4'>
              <FaAddressCard className=' text-gray-700 mt-1' />
              <span>Address : Claritas est etiam processus dynamicus</span>
            </div>
            <div className='h-0.5 bg-gray-200 w-full'></div>
            <div className=' space-y-4 flex items-start ms- gap-3 py-4'>
              <FaPhoneAlt className=' text-gray-700 mt-1' />
              <span>9781234560</span>
            </div>
            <div className='h-0.5 bg-gray-200 w-full'></div>
            <div className=' space-y-4 flex items-start gap-3 py-4'>
              <HiOutlineMail className=' text-gray-700 mt-1' />
              <span>furniture@gmail.com</span>
            </div>


          </div>

          {/* right side -contact form */}
          <div>

            <h2 className='text-[22px] font-bold mb-6'>Tell us your question</h2>
            <form>
              <div>
                <label className='font-bold block my-2 text-[14px]'>Your Name (required)</label>
                <input type='text' required name='name' placeholder='Name*' className=' text-[14px] w-full border border-gray-200 p-3' />
              </div>
              <div>
                <label className='font-bold block my-2 text-[14px]'>Your Email (required)</label>
                <input required type='email' name='email' placeholder='Email*' className='text-[14px] w-full border border-gray-200 p-3' />
              </div>
              <div>
                <label className='font-bold block my-2 text-[14px]'>Your Mobile Number (required)</label>
                <input type='number'  required name='mobile_no' placeholder='Mobile Number*' className=' text-[14px] w-full border border-gray-200 p-3' />
              </div>
              <div>
                <label className='font-bold block my-2 text-[14px]'>Subject</label>
                <input type='text' name='subject' placeholder='Subject*' className=' text-[14px] w-full border border-gray-200 p-3' />
              </div>
              <div>
                <label className='font-bold block my-2 text-[14px]'>Your Message</label>
               <textarea name='message' placeholder='Message*' className=' text-[14px] p-3 w-full  border border-gray-200' rows={5}>

               </textarea>
              </div>

              <button type='submit' className='bg-gray-800 mt-4 text-white px-6 py-3 rounded hover:bg-[#C09578] '>Send</button>





            </form>



          </div>


        </div>

      </section>

    </section>

  )
}
