"use client"

import React, { useEffect, useState } from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';




export default function GalleryImages({ imagepath, preview3 ,preview, setPreview }) {



    console.log("imagepath", imagepath);

    console.log("images", preview3)
    let Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1180,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
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



    /*   const slick_dots ={
            display:"none",
        }; */


    return (
        <div>


            {/* gallery Image slider */}
            <div className=' py-6'>
                <Slider {...Settings}>
                    {preview3.map((items, index) => {
                        return (
                            <div className='px-2'>
                                <div onClick={()=>setPreview(imagepath+items)} className='bg-white shadow: 0 0 15px 0 rgba(0,0,0,0.3); text-center'>

                                    <img src={imagepath + items}
                                        alt={items}
                                        className='w-40 h-40 object-cover'>

                                    </img>



                                </div>

                            </div>
                        )
                    })}



                </Slider>
            </div>

        </div>
    )

    function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#C09578" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#C09578" }}
      onClick={onClick}
    />
  );
}
}
