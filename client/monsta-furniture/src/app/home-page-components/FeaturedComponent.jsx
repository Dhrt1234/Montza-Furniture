"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import ProductItems from '../product/ProductItems';

export default function FeaturedComponent() {
    let [type, settype] = useState(1)
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
    let [productstaticPath, setproductstaticPath] = useState('')
    let [productData, setproductData] = useState([])

    let getProductByType = (type) => {
        settype(type);
        console.log("fun type", type)
        axios.get(`${apiBaseUrl}home/getProductType/${type}`)
            .then((res) => res.data)
            .then((finalRes) => {
                console.log("data", finalRes.data)
                console.log("path", finalRes.staticPath)
                setproductData(finalRes.data)
                setproductstaticPath(finalRes.staticPath)
            })

    }


    useEffect(() => {
        getProductByType(1)
    }, [])


    return (
        <section className='max-w-6xl mx-auto pt-12  px-4'>
      
            <div className='flex items-center justify-center'>
                <div className='h-1 w-[20%] bg-gray-50'></div>
                <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-0 md:gap-0 gap-6'>
                    <button onClick={() => getProductByType(1)}
                        className='bg-white text-black border-2  border-gray-500 hover:text-[#C09578] text-2xl px-4 py-3'>
                        Featued
                    </button>

                    <button onClick={() => getProductByType(2)} className='bg-white text-black border-2 border-l-0 border-gray-500 hover:text-[#C09578] text-2xl px-4 py-3'>
                        New Arrivals
                    </button>
                    <button onClick={() => getProductByType(3)} className='bg-white text-black border-2 border-l-0 border-gray-500 hover:text-[#C09578] text-2xl px-4 py-3'>
                        Onsale
                    </button>
                </div>
                <div className='h-1 w-[20%] bg-gray-50'></div>
            </div>

            <div className='py-6 px-4'>

                <div>
                    <div className=' grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 py-6'>
                        {productData.map((items, index) => {
                            return (

                                <ProductItems items={items} productstaticPath={productstaticPath} key={index} />
                            )

                        })}

                    </div>
                </div>


            </div>


        </section>
    )
}

