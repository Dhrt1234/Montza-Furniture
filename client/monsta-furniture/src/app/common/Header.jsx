"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaHeart, FaShoppingCart, FaChevronDown, FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../slice/userSlice';
import { fetchCart } from '../slice/cartSlice';
import DeleteCart from '../product/DeleteCart';
import { redirect } from 'next/navigation';
import axios from 'axios';





export default function Header() {


  //userData
  let user = useSelector((store) => store.login.user) // here 1st store  is key and 2nd store is our store and we can access login from it.  
  console.log("user", user);

  let cart = useSelector((store) => store.cart.cart)
  console.log("cart header page", cart);
  let imagePath = useSelector((store) => store.cart.imagePath)

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCart())
  }, [])
  let orderAmount = cart.reduce(
    (total, obj) => total + (obj.price * obj.qty), 0)
  let orderQty = cart.reduce((total, obj) => total + (obj.qty), 0)

  console.log("hello", cart)
  const [isOpen, setIsOpen] = useState(false);
  let [cartSlider, setCartSlider] = useState(false);
  let [activeParentId, setActiveParentId] = useState(null);
  let [activeSubId, setActiveSubId] = useState(null);
  let [pageTab, setPageTab] = useState(false);
  const [megaMenu, setMegaMenu] = useState([]);
  let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;

  let getMegaMenu = () => {


    axios.get(`${apiBaseUrl}home/getMegaMenu`)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log("megamenu", finalRes)
        setMegaMenu(finalRes.categoryData);

      })

  }


  useEffect(() => {
    getMegaMenu()
  }, [])



  return (

    <section className='relative'>


      {/* Top Header conact and Login section */}


      <div className='max-w-[100%] py-2 lg:border-b md:border-b border-0 border-[#ccc]'>
        <div className='max-w-[1320px] m-auto flex justify-around '>
          <p className=' lg:block md:block hidden text-[13px]'>Contact us 24/7 : +91-9781234560 / furniture@gmail.com</p>

          {user ?

            <button onClick={() => {
              dispatch(logOut())
              dispatch(fetchCart())
              redirect("/login")

            }}>LogOut</button>
            :

            <Link href="/login" className='md:block sm:block hidden text-[13px] cursor-pointer hover:text-[#c69a78]'>
              Login / Register
            </Link>
          }





        </div>
      </div>
      {/* Logo and Cart*/}

      <header className='border-b border-[#ccc] max-w-[100%] py-4 px-3'>
        <div className='max-w-[1320px] px-5 m-auto flex items-center justify-between'>

          <Link href={"/"} className=' flex items-center space-x-2 '>
            <img className="h-8" src="/images/cccfbdab-3bec-439f-88b9-5694698cd302-1670132652.png" alt="company-icon" />
          </Link>


          {/* search and cart */}
          <div className='flex items-center gap-5'>
            <div className='md:block sm:block hidden'>
              <form action={"/"} className='border-1 border-[#ccc] py-3 px-7 flex items-center justify-between'>
                <input type='text' placeholder='Serach Product...' className=' outline-none text-[12px] item-center placeholder:text-gray-500' />
                <FaSearch className="ml-2 text-black  text-[14px]" />
              </form>
            </div>
            {/* Wishlist */}
            <button className="border border-[#ccc]  p-3">
              <FaHeart className="text-black hover:text-[#C09578] text-[20px]" />
            </button>

            {/* Cart */}
            <div onClick={() => setCartSlider(true)}
              className='flex items-center relative border border-[#ccc] py-3 px-6'>
              <span className='absolute w-5 h-5 bg-[#C09578]  top-[30%] left-[-5%] flex items-center justify-center text-white rounded-full'>
                {orderQty}
              </span>
              <div className='flex items-center justify-between hover:text-[#d3b39e]'>
                <FaShoppingCart className=" text-black hover:text-[#d3b39e] mr-3" />
                <span className='lg:block md:block hidden'>|</span>
                <span className='lg:block md:block hidden font-medium px-1  '>Rs. {orderAmount}</span>
                <FaChevronDown className=" lg:block md:block hidden ml-1 text-blackhover:text-[#d3b39e]" />

              </div>
            </div>
            <button onClick={() => setIsOpen(!isOpen)}
              data-collapse-toggle="navbar-default" type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center
     text-sm text-[#d3b39e] rounded-lg  border border-[#d3b39e]
      focus:outline-none focus:ring-2 md:hidden
       focus:ring-gray-200 dark:text-gray-400
        dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Navbar Area*/}


      <div className={`${isOpen ? '' : 'hidden'}  w-full md:block md:w-auto`} id="navbar-default">
        <nav className="border-b lg:static md:static absolute top-0 left-0 border-[#ccc] py-2 ">
          <div className="max-w-screen-xl mx-auto  px-4 py-4 flex justify-center">
            <ul className="flex flex-col md:flex-row space-x-8 text-[13px] font-bold ">
              <Link href={"/"} className="text-[#C09578] cursor-pointer">HOME</Link>
              {megaMenu.map((items, index) => (
                <li className="relative uppercase text-gray-800 hover:text-[#C09578] cursor-pointer flex items-center gap-1"
                  onMouseEnter={() => {
                    setActiveParentId(items._id);
                    setActiveSubId(null);
                  }}
                  onMouseLeave={() => setActiveParentId(null)}

                >
                  {items.categoryName}
                  <FaChevronDown className="text-xs mt-[1px]" />
                  {activeParentId === items._id && (
                    <div className=' absolute top-5 left-0  border border-gray-100 w-[600px] bg-white 
               p-6 grid grid-cols-3 gap-6 text-left z-50'>

                      {items.subcategories.map((subcategory, index) => (
                        <div>


                          <h4 className=' uppercase text-black hover:text-[#C09578] font-bold mb-2 pb-3 '>{subcategory.subcategoryName}</h4>
                          <ul className='space-y-1 text[11px] text-gray-500'>
                            {subcategory.sub_subcategories.map((subsubcategory, index) => (

                              <Link href={`/product/product-listings/${subsubcategory.slug}`}>
                                <li className='hover:text-[#C09578] uppercase'>
                                  {subsubcategory.sub_subcatName}
                                </li>
                              </Link>

                            ))}
                          </ul>

                        </div>

                      ))}

             


                    </div>
                  )}
                </li>
              ))}

              <li className="relative text-gray-800 hover:text-[#C09578] cursor-pointer flex items-center gap-1"
                onMouseEnter={() => setPageTab(true)}
                onMouseLeave={() => setPageTab(false)}

              >
                PAGES
                <FaChevronDown className="text-xs mt-[1px]" />
                <div className={`${pageTab ? '' : 'hidden'} 
              absolute top-5 left-0  border border-gray-100 w-[600px] bg-white 
               p-6 grid grid-cols-3 gap-6 text-left z-50 `}>
                  <ul className='space-y-1 text[11px] text-gray-500'>
                    <li className='hover:text-[#C09578]'><Link href={"/about"}>About Us</Link></li>
                    <li className='hover:text-[#C09578]'><Link href={"/cart"}>Cart</Link></li>
                    <li className='hover:text-[#C09578]'><Link href={"/chekout"}>Checkout</Link></li>
                    <li className='hover:text-[#C09578]'><Link href={"/faq"}>Frequently Questions</Link></li>
                  </ul>
                </div>
              </li>

              <Link href={"/contact"} className="text-gray-800 hover:text-[#C09578] cursor-pointer">CONTACT US</Link>
            </ul>
          </div>
        </nav>
      </div>

      {/* slider cart */}
      <div className='realtive max-w-full'>
        <div className={`  absolute top-0 bg-[rgba(0,0,0,0.6)] ${cartSlider ? "translate-x-0" : "translate-x-full"} `}></div>
        <div className={`${cartSlider ? "translate-x-0" : "translate-x-full"} fixed top-0 right-0 h-full w-[350px] bg-white z-50 transform transition-transform duration-300 px-4`}>
          <div className='flex justify-between items-center p-4 border-b-[1px] border-[#ccc]'>

            <h2 className='text-[16px] font-semibold' >Cart</h2>
            <button onClick={() => setCartSlider(false)} className='text-3xl'>&times;</button>
          </div>
          {cart.length == 0 ?
            <div className='p-10 text-center'>

              <img src='/images/my-Order.jpg' alt='Empty Cart' className='mx-auto'></img>
              <p className='mt-5 py-6 text-gray-600 border-t-[1px] border-b-[1px] border-[#ccc]'>Your shopping cart is empty!</p>
            </div>
            : <div>
              {cart.map((items, index) => {
                return (
                  <div className='border-b-2 border-[#C09578]'>


                    <div className='flex gap-5 my-3 py-2  '>
                      <div className='w-[50px] h-[50px]'>
                        <img src={imagePath + items.image}
                          alt="coffee table"
                        />
                      </div>

                      <div>
                        <div>
                          <span className='text-[16px] capitalize font-bold'>{items.title}</span> <br />



                          <span className='text-[14px] font-bold'>Color:</span> &nbsp;
                          <span className='text-[14px] capitalize font-semibold text-[#C09578]'>{items.color.colorName}</span>
                        </div>
                        <div className='flex gap-3'>
                          <span>Rs. {items.price}</span>
                          <span>Qty: {items.qty}</span>
                        </div>


                      </div>

                    </div>
                    <div className='flex gap-10 pb-1'>
                      <div>
                        <DeleteCart cartId={items._id} />
                        {/*  <span className='font-bold text-[14px]'>Remove</span> */}
                      </div>

                      |
                      <div>
                        <FaHeart className="text-black hover:text-[#C09578] text-[20px]" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          }

        </div>
      </div>
    </section>



  )
}

