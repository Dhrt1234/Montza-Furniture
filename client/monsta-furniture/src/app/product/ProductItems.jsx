"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../store/store';
import { ToastContainer, toast } from 'react-toastify';

import Link from 'next/link'
import { fetchCart } from '../slice/cartSlice';

export default function ProductItems({ items, productstaticPath }) {
console.log("items",items);
console.log("productstaticPath",productstaticPath);



    let token = useSelector((store) => store.login.token)

    let user = useSelector((store) => store.login.user)
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
    let [color, setColor] = useState(items.productColor[0]._id)

    let disPatch = useDispatch()

    let addToCart = () => {
        console.log("color", color);
        if (user) {
            let obj = {
                id: items._id,
                image: items.productImage,
                price: items.productsalePrice,
                qty: 1,
                title: items.productName,
                color
            }
            console.log("obj", obj);
            axios.post(`${apiBaseUrl}cart/add-to-cart`,
                obj,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log("finalRes", finalRes.status);

                    if (finalRes.status) {
                        disPatch(fetchCart())
                        toast.success(finalRes.msg);

                    }
                    else {
                        toast.error(finalRes.msg);
                    }
                })

        } else {
            toast.error("Please login");
        }
    }


    return (

        <div className='px-2 py-4'>
            <ToastContainer />
            <div className='bg-white shadow-2xl text-center'>
                <Link href={`/product/${items.slug}`}>

                  <img src={productstaticPath + items.productImage}
                        alt="Isaac Chest Of Drawer"
                        className='w-full h-40 object-cover mb-3 '>

                    </img>
                </Link>
                <ul className='flex gap-1 items-center justify-center'>
                    {items.productColor.map((colors, index) => {
                        return (

                            <li key={colors._id} onClick={(e) => setColor(colors._id)} className='cursor-pointer w-[10px] h-[10px] py-2 px-3 mx-2 rounded-xl'

                                style={{
                                    background: colors.colorName,
                                    border: color === colors._id ? '3px solid gray' : '1px solid #ccc',
                                    borderRadius: '4px',
                                    fontWeight: color === colors._id ? 'bold' : 'normal'
                                }}

                            >
                            </li>
                        )
                    })}
                </ul>
                <p className='text-[14px] font-semibold text-gray-500 mt-2'>{items.productName} </p>
                <h3 className='font-bold mt-4 text-[14px] hover:text-[#c09578] '>{items.subSubCategory.sub_subcatName}</h3>
                <div className='h-0.5 bg-gray-50 mt-3'></div>

                <div className='mt-2'>
                    <span className='line-through text-gray-400 text-[14px] mr-2'>
                        {items.productActualPrice}
                    </span>
                    <span className='text-[#c09578] font-bold text-[14px]'>
                        {items.productsalePrice}
                    </span>


                </div>
                <div className='flex justify-center gap-3 mt-4 pb-3'>
                    <button className='bg-gray-200 hover:bg-[#c09578] px-2 py-2 text-black rounded text-sm'>
                        <FaRegHeart />
                    </button>
                    <button onClick={addToCart} className='bg-gray-200 hover:bg-[#c09578] px-5 py-2 text-gray-500 rounded text-[12px]'>

                        Add To Cart
                    </button>
                </div>

            </div>

        </div>
    )
}
