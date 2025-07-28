import React from 'react'
import Image from 'next/image';

export default function NewCoolection() {
    return (
        <section>

            <div className='my-6 h-120 relative group'>
                <Image
                    src="/images/banner-2.jpg"
                    alt="New Trending Collection"
                    layout="fill"
                    objectFit="cover"
                    priority
                />


                <div className='absolute top-0 lg:left-50 md:left-10 left-5 group-hover:scale-105 transition-transform duration-300  w-full h-full flex items-center'>
                    <div>
                        <h1 className='lg:text-5xl md:text-4xl text-3xl font-bold text-black mb-4'>New Trending Collection</h1>
                        <p className='text-[16px] text-gray-700 mb-4'> We Believe That Good Design is Always in Season</p>

                        <button className='px-8 py-3 mt-10 font-bold text-[14px] border-2 border-[#c09578] bg-transparent text-[#c09578] hover:bg-[#c09578] hover:text-white'>
                            SHOPPING NOW
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}
