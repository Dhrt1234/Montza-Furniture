/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useState } from 'react'
import axios from 'axios';
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link';
import RelatedProducts from '../RelatedProducts';
import UpsellProducts from '../UpsellProducts';
import { IoIosArrowForward } from "react-icons/io";
import GalleryImages from '../GalleryImages';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { fetchCart } from '@/app/slice/cartSlice';

export default function ProductDetails() {
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
    let { slug } = useParams()
    let [singleProduct, setsingleProduct] = useState(null)
    let [preview, setPreview] = useState('')
    let [preview2, set2Preview] = useState('')
    let [preview3, set3Preview] = useState([])
    let [imagepath, setImagepath] = useState('')
    let [getSingleProduct, setgetSingleProduct] = useState({
        productId: "",
        productName: "",
        parentCategory: "",
        subCategory: "",
        subSubCategory: "",
        productMeterial: [],
        productColor: [],
        productType: "",
        productbestSelling: "",
        productTopRated: "",
        productUpsell: "",
        productActualPrice: "",
        productsalePrice: "",
        productStocks: "",
        productOrder: "",
        productDescription: ""
    })

    let token = useSelector((store) => store.login.token)
    let user = useSelector((store) => store.login.user)
    let [color, setColor] = useState('')
    let [productImage, setProductImage] = useState('')
    let disPatch = useDispatch();
     let [message ,setMessage]=useState('')

    useEffect(() => {

        setgetSingleProduct({
            productId: "",
            productName: "",
            parentCategory: "",
            subCategory: "",
            subSubCategory: "",
            productMeterial: [],
            productColor: [],
            productType: "",
            productbestSelling: "",
            productTopRated: "",
            productUpsell: "",
            productActualPrice: "",
            productsalePrice: "",
            productStocks: "",
            productOrder: ""

        });
        setPreview('');
        set2Preview('');
        set3Preview([]);
        setImagepath('');


        if (slug) {
            axios.get(`${apiBaseUrl}home/view/${slug}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log("single data", finalRes.data)

                    setgetSingleProduct({
                        productId: finalRes.data._id,
                        productName: finalRes.data.productName,
                        parentCategory: finalRes.data.parentCategory.categoryName,
                        subCategory: finalRes.data.subCategory._id,
                        subSubCategory: finalRes.data.subSubCategory.sub_subcatName,
                        productMeterial: finalRes.data.productMeterial,
                        productColor: finalRes.data.productColor,
                        productType: finalRes.data.productType,
                        productbestSelling: finalRes.data.productbestSelling,
                        productTopRated: finalRes.data.productTopRated,
                        productUpsell: finalRes.data.productUpsell,
                        productActualPrice: finalRes.data.productActualPrice,
                        productsalePrice: finalRes.data.productsalePrice,
                        productStocks: finalRes.data.productStocks,
                        productOrder: finalRes.data.productOrder,
                        productDescription: finalRes.data.productDescription
                    });
                    setProductImage(finalRes.data.productImage);
                    setPreview(finalRes.staticPath + finalRes.data.productImage);
                    set2Preview(finalRes.staticPath + finalRes.data.productBackimage);
                    set3Preview(finalRes.data.productGallery);
                    console.log("PN", finalRes.data.parentCategory.categoryName);
                    console.log("lemgth", preview3.length);
                    setImagepath(finalRes.staticPath);




                })


        }
    }, [])

    let addtoCart = () => {
      
        if (user) {
            if(color!=''){
            let obj = {
                id: getSingleProduct.productId,
                image: productImage,
                price: getSingleProduct.productsalePrice,
                qty: 1,
                title: getSingleProduct.productName,
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
                        setMessage(finalRes.msg);
                       // toast.success(finalRes.msg);
                        disPatch(fetchCart())
                    }
                    else {
                        setMessage(finalRes.msg);
                        //toast.error(finalRes.msg);
                    }
                })
            }
            else{
                alert('Please Select color');
            }


        } else {
            alert("Please login");
        }

       
    }
    /* useEffect(()=>{

        toast.info(message);
    },[message]) */

    return (
        <div>
  <ToastContainer />
            {

                getSingleProduct != null


                    ?
                    <div>
                      
                        {/* title of Page */}
                        < h2 className="text-center text-[35px] font-bold text-[#333] mt-3 pt-3">{getSingleProduct.productName}</h2>

                        <div className="justify-center flex items-center mb-6">
                            <Link href="/" className="hover:text-[#C09578] cursor-pointer text-[14px] text-[#555]">
                                Home
                            </Link>
                            <span className="flex items-center text-[14px] text-[#C09578]">
                                <IoIosArrowForward className="mx-1 text-[#C09578]" />
                                <Link href="/product" className="hover:text-[#C09578] cursor-pointer text-[14px] text-[#555]">
                                    {getSingleProduct.parentCategory}
                                </Link>

                            </span>
                            <span className="flex items-center text-[14px] text-[#C09578]">
                                <IoIosArrowForward className="mx-1 text-[#C09578]" />
                                {getSingleProduct.productName}
                            </span>

                        </div>
                        <div className="border-b border-[#ccc] w-full m-auto pb-4"> </div>
                        <div className="max-w-5xl mx-auto p-8 mt-20">
                            {/* Product Section */}
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                                {/* Product Image */}
                                <div>
                                    <img
                                        src={preview}

                                        className="rounded-lg w-full object-cover"
                                    />

                                    <GalleryImages imagepath={imagepath} preview3={preview3} preview={preview} setPreview={setPreview} />


                                </div>

                                {/* Product Details */}
                                <div className="grid grid-cols-1">
                                    <h1 className="text-3xl font-bold capitalize">  {getSingleProduct.productName}</h1>
                                    <p className="text-gray-600 text-2xl   font-semibold capitalize">
                                        {getSingleProduct.parentCategory}
                                    </p>
                                    <div>
                                        <span className='line-through text-gray-400 text-[18px] mr-2'>
                                            <span className='font-bold'>Rs :</span>{getSingleProduct.productActualPrice}
                                        </span>
                                        <span className='text-[#c09578] font-bold text-[18px]'>
                                            <span className='font-bold'>Rs :</span> {getSingleProduct.productsalePrice}
                                        </span>


                                    </div>
                                    <p className="text-gray-600 font-semibold text-[16px]">
                                        {getSingleProduct.productDescription}
                                    </p>

                                    <div className="border-b border-[#ccc] w-full m-auto"> </div>
                                    {/* Add to Cart Button */}
                                    <button onClick={addtoCart} className=" py-3 mt-6 bg-[#C09578] hover:bg-black text-white rounded-lg font-semibold">
                                        Add to Cart
                                    </button>

                                    {/* Extra Information */}
                                    <div className="mt-8">

                                        <ul className="text[12px] list-disc list-inside text-gray-700 space-y-2">
                                            <li className='text-[18px] font-bold text-gray-600'>Category: {getSingleProduct.subSubCategory}</li>
                                            <li className='text-[18px] font-bold text-gray-600'>Material:&nbsp;

                                                {getSingleProduct.productMeterial.map((material, index) => {
                                                    return (

                                                        <b key={index} className='capitalize'>{material.materialName} &nbsp;&nbsp;</b>
                                                    )
                                                })}
                                            </li>
                                            <li className='text-[18px] font-bold text-gray-600'>Colors: &nbsp; &nbsp;&nbsp;
                                                {getSingleProduct.productColor.map((colors, index) => {
                                                    return (

                                                        <span key={index}
                                                            onClick={(e) => setColor(colors._id)}
                                                            className='cursor-pointer capitalize p-2 mx-2 rounded-sm'
                                                            style={{
                                                                background: colors.colorName,
                                                                border: color === colors._id ? '3px solid gray' : '1px solid #ccc',
                                                                borderRadius: '4px',
                                                                fontWeight: color === colors._id ? 'bold' : 'normal'

                                                            }}>
                                                            {colors.colorName} &nbsp;&nbsp;
                                                        </span>
                                                    )
                                                })}


                                            </li>
                                            <li className='text-[18px] text-gray-600 font-bold capitalize'>Fast shipping worldwide</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Product Description Below */}
                            <div className="mt-16">
                                <h2 className="text-[18px] font-bold mb-4 text-[#C09578]">Description</h2>
                                <div className="border-b border-[#ccc] w-full m-auto"> </div>
                                <p className="text-gray-600 text-[16px] leading-relaxed pt-3">
                                    {getSingleProduct.productDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                    :
                    <div>Loading... </div>

            }

            <RelatedProducts />
            <UpsellProducts />

        </div>







    )
}
