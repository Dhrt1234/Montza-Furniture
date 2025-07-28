
"use client"
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { IoIosArrowForward } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchCart } from '../slice/cartSlice';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import DeleteCart from '../product/DeleteCart';

export default function Cart() {

  let cart = useSelector((store) => store.cart.cart)
  let imagePath = useSelector((store) => store.cart.imagePath)

  console.log("cart", cart);
  let disPatch = useDispatch();
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;

  let deleteCart = (cartId) => {
    alert(cartId)
    if (cartId.length >= 1) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`${apiBaseUrl}cart/delete-cart/${cartId}`)
            .then((res) => res.data)
            .then((finalRes) => {
              if (finalRes.status) {
                disPatch(fetchCart())

                Swal.fire({
                  title: "Deleted!",
                  text: "Your Record has been deleted.",
                  icon: "success"
                });

              }
              else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Record does not delete. ",
                });
              }

            })

        }
      });

    }

    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Select Records",
      });
    }
  }


  return (
    <section>
      {/* title of Page */}
      <h3 className="text-center text-[35px] font-bold text-[#333] mt-3 pt-3">Shopping Cart</h3>

      <div className="justify-center flex items-center mb-6">
        <Link href="/" className="hover:text-[#C09578] cursor-pointer text-[14px] text-[#555]">
          Home
        </Link>
        <span className="flex items-center text-[14px] text-[#C09578]">
          <IoIosArrowForward className="mx-1 text-[#C09578]" />
          Shopping Cart
        </span>

      </div>
      <div className="border-b border-[#ccc] w-full m-auto pb-4"> </div>
      {cart.length == 0 ? <div>
        <div className='flex justify-center py-5'>
          <img src="/images/my-Order.jpg" alt="" />
        </div>
        <p className='text-center  font-bold text-[14px] text-[#555]'>Your shopping cart is empty!</p>
      </div>
        :
        <div className='max-w-5xl mx-auto py-5'>

          <table className='w-full border-0.5 border-[#808080]'>
            <thead className='bg-gray-100'>

              <tr className='border-b-[#c09578] border-b-2 text-black text-[14px] font-normal capitalize px-10  text-center' >
                <th className='py-2'>
                  Delete
                </th>
                <th className='py-2'>
                  Image
                </th>
                <th className='py-2'>
                  Product
                </th>
                <th className='py-2'>
                  Price
                </th>
                <th className='py-2'>
                  Quantity
                </th>
                <th className='py-2'>
                  Total
                </th>
              </tr>
            </thead>
            <tbody className='border-0.5 border-[#808080]'>
              {cart.map((items, index) => {
                return (
                  <tr key={index} className='border-1  border-[#808080]'>
                    <td className='min-w-[100px] border-1 py-8  text-center text-[20px]'>
                        <DeleteCart cartId={items._id} />
                    </td>
                    <td className='max-w-[180px] max-h-[100px]  px-5 py-8 cursor-pointer border-1 '>
                      <img src={imagePath + items.image}
                        alt="coffee table"
                      />
                    </td>
                    <td className='min-w-[180px] py-8 text-center border-1 text-black'>
                      <span className='text-[16px] font-bold capitalize'> {items.title}</span><br />
                      <span className='text-[14px] font-bold'>Color:</span> &nbsp;
                      <span className='text-[14px] capitalize font-semibold text-[#C09578]'>{items.color.colorName}</span>
                    </td>
                    <td className='min-w-[150px] py-8 border-1 text-center text-black font-bold text-[14px]'>
                      Rs.  {items.price}
                    </td>
                    <td className='min-w-[150px] py-18  flex  gap-3 justify-center items-center text-black font-medium text-[14px]'>
                      <span className='text-black text-[12px]'>Quantity</span>
                      <input type="number" className='w-12 text-center border-1' min={1} max={10} required defaultValue={items.qty} />
                    </td>
                    <td className='min-w-[170px] py-8 border-1 text-center text-black font-bold text-[14px]'>
                      {items.price * items.qty}
                    </td>
                  </tr>

                )
              })}



              <tr className='relative  border-1'>
                <td className='py-8 '>
                  <button className='bg-black py-2 px-3 absolute right-2 bottom-3 hover:bg-[#c09578] text-white text-[12px]'>Update Cart</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 justify-around'>

            <div className='border-1 border-gray-200  my-10'>
              <h3 className='bg-black uppercase font-semibold text-white text-[14px] p-2 '>
                Coupon
              </h3>
              <div className='p-5'>
                <p className='text-[12px]'>
                  Enter your coupon code if you have one.
                </p>
                <form className='py-5'>
                  <input type='text' required name='coupon' id='coupon' placeholder='coupon code' className='text-[14px] px-5 py-2 border-1 border-gray-200' />
                  <button className='bg-black text-white font-semibold uppercase text-[12px] px-4 py-2 ml-4 hover:bg-[#c09578]'>Apply</button>
                </form>
              </div>
            </div>
            <div className='border-1 border-gray-200  my-10 ml-3'>
              <h3 className='bg-black uppercase font-semibold text-white text-[14px] p-2 '>
                Cart Totals
              </h3>

              <div className='space-y-2 m-3 pb-12 relative'>
                <div className='flex justify-between gap-3'>
                  <p className=' text-[12px] font-semibold'>
                    Subtotal
                  </p>
                  <p className=' text-[14px] font-semibold'>Rs. 134,000
                  </p>
                </div>
                <div className='flex justify-between gap-3'>
                  <p className=' text-[12px] font-semibold'>
                    Discount (-)
                  </p>
                  <p className=' text-[14px] font-semibold'>Rs. 0
                  </p>
                </div>
                <div className='flex justify-between gap-3'>
                  <p className=' text-[12px] font-semibold'>
                    Total
                  </p>
                  <p className=' text-[14px] font-semibold'>Rs. 134,000
                  </p>
                </div>
                <div className=''>
                  <button className='bg-[#c09578] py-2 px-3 absolute right-2 bottom-2  hover:bg-black text-white text-[12px] font-semibold'>Proceed to Checkout</button>
                </div>
              </div>
            </div>


          </div>
        </div>
      }

    </section>
  )
}
