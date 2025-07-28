"use client"

import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';

export default function ReviewComponent() {

    let Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
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


    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
    let [imagestaticPath, setImageStaticPath] = useState('')
    let [testimonialData, setTestimonialData] = useState([])

    let getTestimonials = () => {


        axios.get(`${apiBaseUrl}home/getTestimonials`)
            .then((res) => res.data)
            .then((finalRes) => {
                console.log("testimonial", finalRes.data)
                setTestimonialData(finalRes.data)
                setImageStaticPath(finalRes.staticPath)
            })

    }


    useEffect(() => {
        getTestimonials()
    }, [])



    return (
        <section className='pt-7 max-w-6xl mx-auto'>

            <h2 className='text-2xl font-bold mb-5 text-center px-4'>What Our Customers Say ?</h2>
            <Slider {...Settings}>

             
                    {testimonialData.map((items, index) => {
                       
                        return (

<div>
                            <div className='px-4 py-5 text-center'>
                                <p className='text-gray-600 lg:w-5xl md:w-5xl text-center w-xl lg:px-7 px-3 lg:text-[16px] text-[14px] mb-10'>
                                    {items.message}

                                </p>

                                <div className='flex flex-col items-center'>

                                    <img src={imagestaticPath + items.userImage}

                                        alt='Kathy Young'
                                        className='w-25 h-25 rounded-full object-cover mb-4'
                                    />
                                    <h4 className='font-semibold uppercase'>{items.name}</h4>
                                    <h5 className='text-gray-500 font-medium capitalize'>{items.designation}</h5>
                                    <div className='flex space-x-1 text-[#C09578] text-[20px]'>
                                       
                            <StarRating rating={items.rating} />
                                       
                                        
                                    </div>

                                </div>
                            </div>
                            </div>
                        )

                    })}


              






            </Slider>

        </section>
    )
}
const StarRating=({rating}) =>{
    const totalStars=5;
    return(
        <div className='flex gap-2'>

            {[...Array(totalStars)].map((_,index)=>(
                <FaStar key={index} color ={ index<rating ? "#f5c518" : "#ccc"} size={16}>

                </FaStar>
                
            ))}
        </div>
    )
}


