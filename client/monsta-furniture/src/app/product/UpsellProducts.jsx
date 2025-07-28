
"use client"

import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import Image from 'next/image';
import axios from 'axios';
import ProductItems from './ProductItems';

export default function UpsellProducts() {

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

         let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
      let [ProductstaticPath, setProductstaticPath] = useState('')
      let [productData, setproductData] = useState([])
    
      let getUpSellingProduct = () => {
       
       
        axios.get(`${apiBaseUrl}home/getUpsellProduct`)
          .then((res) => res.data)
          .then((finalRes) => {
           console.log("upsell product",finalRes.data)
            setproductData(finalRes.data)
            setProductstaticPath(finalRes.staticPath)
          })
    
      }
    
    
      useEffect(() => {
        getUpSellingProduct()
      }, [])

    return (
        <section>
            {/* Heading */}
            <div className=' flex items-center justify-center gap-3 px-10'>
                <h2 className='text-2xl font-bold '>Upsell Products</h2>
                <span className=' w-[70%] h-[1px] bg-[#ccc]'></span>

            </div>

            {/* best selling products slider */}
            <div className='max-w-6xl mx-auto py-6'>
                <Slider {...Settings}>
                      {productData.map((items, index) => {
                                                return (
                                          <ProductItems items={items} productstaticPath={ProductstaticPath} key={index} /> 
                    
                                                )
                                      
                                        })}
                


                </Slider>
            </div>

        </section>
    )
}
