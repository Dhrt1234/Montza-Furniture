"use client"

import React from 'react'
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

export default function BannerSlider({sliderData, sliderstaticPath}) {

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
  return (
    <section className="">
          <Slider {...Settings}>
{
            sliderData.map((items,index)=>{
              return(

  <div  className="min-w-[700px]">
    
              <img
             
                src={sliderstaticPath + items.sliderImage}
                className="w-[100%] bg-center object-center"
                alt=""
              />
              
            </div>
              )
            })
          }
          
 
          </Slider>
        </section>
  )
  
}
