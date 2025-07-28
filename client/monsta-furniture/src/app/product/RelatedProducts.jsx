
"use client"

import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Image from 'next/image';

export default function RelatedProducts() {

    let Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1180,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrow: true
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
    };

    return (
        <section>
            {/* Heading */}
            <div className=' flex items-center justify-center gap-3 px-10'>
                <h2 className='text-2xl font-bold '>Related Products</h2>
                <span className=' w-[70%] h-[1px] bg-[#ccc]'></span>

            </div>

            {/* best selling products slider */}
            <div className='max-w-6xl mx-auto py-6'>
                <Slider {...Settings}>
                    <div className='px-2'>
                        <div className='bg-white shadow: 0 0 15px 0 rgba(0,0,0,0.3); text-center'>

                            <img src='/images/1617829892944Evan Coffee Table__.jpg'
                                alt="Isaac Chest Of Drawer"
                                className='w-full h-40 object-cover'>

                            </img>
                            <p className='text-[12px] text-gray-500 mt-2'>Chest Of Drawers </p>
                            <h3 className='font-bold mt-4 text-[16px] hover:text-[#c09578] '>Isaac Chest Of Drawer</h3>
                            <div className='h-0.5 bg-gray-50 mt-3'></div>

                            <div className='mt-2'>
                                <span className='line-through text-gray-400 text-[14px] mr-2'>
                                    Rs. 32,000
                                </span>
                                <span className='text-[#c09578] font-bold text-[14px]'>
                                    Rs. 25,000
                                </span>


                            </div>
                            <div className='flex justify-center gap-3 mt-4 pb-3'>
                                <button className='bg-gray-200 hover:bg-[#c09578] px-2 py-2 text-black rounded text-sm'>
                                    <FaRegHeart />
                                </button>
                                <button className='bg-gray-200 hover:bg-[#c09578] px-5 py-2 text-gray-500 rounded text-[12px]'>

                                    Add To Cart
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className='px-2'>
                        <div className='bg-white shadow-2xl text-center'>

                            <img src='/images/1619988418966Leo TV Cabinets.jpg'
                                alt="Isaac Chest Of Drawer"
                                className='w-full h-40 object-cover'>

                            </img>
                            <p className='text-[12px] text-gray-500 mt-2'>Chest Of Drawers </p>
                            <h3 className='font-bold mt-4 text-[16px] hover:text-[#c09578] '>Isaac Chest Of Drawer</h3>
                            <div className='h-0.5 bg-gray-50 mt-3'></div>

                            <div className='mt-2'>
                                <span className='line-through text-gray-400 text-[14px] mr-2'>
                                    Rs. 32,000
                                </span>
                                <span className='text-[#c09578] font-bold text-[14px]'>
                                    Rs. 25,000
                                </span>


                            </div>
                            <div className='flex justify-center gap-3 mt-4 pb-3'>
                                <button className='bg-gray-200 hover:bg-[#c09578] px-2 py-2 text-black rounded text-sm'>
                                    <FaRegHeart />
                                </button>
                                <button className='bg-gray-200 hover:bg-[#c09578] px-5 py-2 text-gray-500 rounded text-[12px]'>

                                    Add To Cart
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className='px-2'>
                        <div className='bg-white shadow-2xl text-center'>

                            <img src='/images/1621171973378Isaac%20Chest%20of%20Drawer_.jpg'
                                alt="Isaac Chest Of Drawer"
                                className='w-full h-40 object-cover'>

                            </img>
                            <p className='text-[12px] text-gray-500 mt-2'>Chest Of Drawers </p>
                            <h3 className='font-bold mt-4 text-[16px] hover:text-[#c09578] '>Isaac Chest Of Drawer</h3>
                            <div className='h-0.5 bg-gray-50 mt-3'></div>

                            <div className='mt-2'>
                                <span className='line-through text-gray-400 text-[14px] mr-2'>
                                    Rs. 32,000
                                </span>
                                <span className='text-[#c09578] font-bold text-[14px]'>
                                    Rs. 25,000
                                </span>


                            </div>
                            <div className='flex justify-center gap-3 mt-4 pb-3'>
                                <button className='bg-gray-200 hover:bg-[#c09578] px-2 py-2 text-black rounded text-sm'>
                                    <FaRegHeart />
                                </button>
                                <button className='bg-gray-200 hover:bg-[#c09578] px-5 py-2 text-gray-500 rounded text-[12px]'>

                                    Add To Cart
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className='px-2'>
                        <div className='bg-white shadow-2xl text-center'>

                            <img src='/images/1621171973378Isaac%20Chest%20of%20Drawer_.jpg'
                                alt="Isaac Chest Of Drawer"
                                className='w-full h-40 object-cover'>

                            </img>
                            <p className='text-[12px] text-gray-500 mt-2'>Chest Of Drawers </p>
                            <h3 className='font-bold mt-4 text-[16px] hover:text-[#c09578] '>Isaac Chest Of Drawer</h3>
                            <div className='h-0.5 bg-gray-50 mt-3'></div>

                            <div className='mt-2'>
                                <span className='line-through text-gray-400 text-[14px] mr-2'>
                                    Rs. 32,000
                                </span>
                                <span className='text-[#c09578] font-bold text-[14px]'>
                                    Rs. 25,000
                                </span>


                            </div>
                            <div className='flex justify-center gap-3 mt-4 pb-3'>
                                <button className='bg-gray-200 hover:bg-[#c09578] px-2 py-2 text-black rounded text-sm'>
                                    <FaRegHeart />
                                </button>
                                <button className='bg-gray-200 hover:bg-[#c09578] px-5 py-2 text-gray-500 rounded text-[12px]'>

                                    Add To Cart
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className='px-2'>
                        <div className='bg-white shadow-2xl text-center'>

                            <img src='/images/1621171973378Isaac%20Chest%20of%20Drawer_.jpg'
                                alt="Isaac Chest Of Drawer"
                                className='w-full h-40 object-cover'>

                            </img>
                            <p className='text-[12px] text-gray-500 mt-2'>Chest Of Drawers </p>
                            <h3 className='font-bold mt-4 text-[16px] hover:text-[#c09578] '>Isaac Chest Of Drawer</h3>
                            <div className='h-0.5 bg-gray-50 mt-3'></div>

                            <div className='mt-2'>
                                <span className='line-through text-gray-400 text-[14px] mr-2'>
                                    Rs. 32,000
                                </span>
                                <span className='text-[#c09578] font-bold text-[14px]'>
                                    Rs. 25,000
                                </span>


                            </div>
                            <div className='flex justify-center gap-3 mt-4 pb-3'>
                                <button className='bg-gray-200 hover:bg-[#c09578] px-2 py-2 text-black rounded text-sm'>
                                    <FaRegHeart />
                                </button>
                                <button className='bg-gray-200 hover:bg-[#c09578] px-5 py-2 text-gray-500 rounded text-[12px]'>

                                    Add To Cart
                                </button>
                            </div>
                        </div>

                    </div>


                </Slider>
            </div>

        </section>
    )
}
