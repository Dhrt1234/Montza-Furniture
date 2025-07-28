"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { FaAngleRight } from "react-icons/fa";
import { Country } from '../Data/Country';
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { BiObjectsHorizontalCenter } from 'react-icons/bi';
import { useRazorpay } from 'react-razorpay';
import { fetchCart } from '../slice/cartSlice';


export default function checkout() {
    const { Razorpay } = useRazorpay();
    const [countryBillingButton, setcountryBillingButton] = useState(0);
    const [countryBillingTitle, setcountryBillingTitle] = useState("Select Country");
    const [paymentMethod, setPaymentMethod] = useState("cod");
let disPatch= useDispatch();
    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL;
    let token = useSelector((store) => store.login.token)
    let cart = useSelector((store) => store.cart.cart)
    console.log("cart header page", cart);
    let imagePath = useSelector((store) => store.cart.imagePath)

    let orderAmount = cart.reduce((total, obj) => total + (obj.price * obj.qty), 0)
    let orderQty = cart.reduce((total, obj) => total + (obj.qty), 0)


    const [shippingAddress, setShippingAddress] = useState({
        name: "",
        mobileNo: "",
        billingName: "",
        billingMobileNo: "",
        billingEmail: "",
        billingAddress: "",
        country: "",
        state: "",
        city: "",
        orderNotes: ""

    })
    let orderPlace = (event) => {
        event.preventDefault();
        console.log(paymentMethod)


        let orderItems = cart.map((items) => {
            return {
                title: items.title,
                price: items.price,
                qty: items.qty,
                color: items.color.colorName,
                image: items.image
            }
        })

        console.log(orderItems)
        console.log(orderAmount);
        console.log(orderQty);
        console.log("sa", shippingAddress);
        let obj = {
            paymentMethod,
            shippingAddress,
            orderItems,
            orderAmount,
            orderQty

        }
        axios.post(`${apiBaseUrl}order/order-place`,
            obj,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => res.data)
            .then((res) => {

                console.log("res", res);
                if (res.paymentMethod == "1") { //COD
                 
                    disPatch(fetchCart())
                    console.log("codd");
                    //Thank you page
                }
                else {  //Online
                    console.log("online");

                    const RazorpayOrderOptions = {
                        key: "rzp_test_WAft3lA6ly3OBc",
                        amount: orderAmount, // Amount in paise
                        currency: "INR",
                        name: "Monsta Furniture",
                        description: "Test Transaction",
                        order_id: res.ordersRes.id, // Generate order_id on server
                        handler: (response) => { // after user payment this handler worka nd we get msg payment did or not then we set response in Db  after successfull payment 
                            console.log("handler", response);
                            //razorpay_payment_id: 'pay_Qofh90kAeYHp7P', razorpay_order_id: 'order_QoffF9Y9PE9rB9', 
                            // razorpay_signature: '37868029ac826841d8647b0f50cb27e97b7986b5e72cf8f2f4d22db09d1dcce1'}


                            axios.post(`${apiBaseUrl}order/verify-order`,
                                response,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                })
                                .then((res) => res.data)
                                .then((res)=>{
                                    disPatch(fetchCart())
                                    console.log("final res",res);

                                    //thank you page
                                })
                        },
                        prefill: {
                            name: shippingAddress.billingName,
                            email: shippingAddress.billingEmail,
                            contact: shippingAddress.billingMobileNo,
                        },
                        theme: {
                            color: "#F37254",
                        },
                    };

                    const razorpayInstance = new Razorpay(RazorpayOrderOptions);
                    razorpayInstance.open();// payment gatway open 
                    console.log(res.ordersRes)
                }
            })

    }

    return (
        <>
            <ToastContainer />
            {/* Heading */}
            <section className='max-w-full my-8'>
                <div className='max-w-[1320px] mx-auto'>
                    <div className='text-center'>
                        <h2 className='text-2xl sm:text-4xl font-semibold'>Checkout</h2>
                        <div className='flex items-center justify-center gap-1 my-2'>
                            <Link href='/' className='text-sm hover:text-[#C09578]'>Home</Link>
                            <FaAngleRight className='text-[#C09578]' />
                            <Link href='/about' className='text-sm text-[#C09578]'>Checkout</Link>
                        </div>
                        <hr className='border-gray-200 my-5' />
                    </div>
                </div>
            </section>

            {/* Checkout Body */}
            <section className='max-w-full'>
                <div className='max-w-[1320px] mx-auto my-10 px-3'>
                    <form onSubmit={orderPlace} className='grid grid-cols-1 lg:grid-cols-[70%_30%] gap-5'>

                        {/* LEFT: Billing Form */}
                        <div>
                            <h2 className='text-base font-semibold bg-black text-white p-2 uppercase'>Billing Details</h2>

                            <div className='mt-5'>
                                {/* Basic Info */}
                                <div className='grid sm:grid-cols-2 gap-5'>
                                    <div>
                                        <label className='text-sm font-semibold'>Name*</label>
                                        <input type='text'
                                            name="name"
                                            value={shippingAddress.name}
                                            onChange={((e) => {
                                                let obj = { ...shippingAddress }
                                                obj['name'] = e.target.value
                                                setShippingAddress(obj)

                                            })}
                                            className='w-full p-2 border border-gray-300 rounded-sm my-2' />
                                        <label className='text-sm font-semibold'>Billing Name*</label>
                                        <input type='text'
                                            name="billingName"
                                            value={shippingAddress.billingName}
                                            onChange={((e) => {
                                                let obj = { ...shippingAddress }
                                                obj['billingName'] = e.target.value
                                                setShippingAddress(obj)
                                            })}

                                            className='w-full p-2 border border-gray-300 rounded-sm my-2' />
                                    </div>
                                    <div>
                                        <label className='text-sm font-semibold'>Mobile Number*</label>
                                        <input type='number'
                                            name="mobileNo"
                                            value={shippingAddress.mobileNo}
                                            onChange={((e) => {
                                                let obj = { ...shippingAddress }
                                                obj['mobileNo'] = e.target.value
                                                setShippingAddress(obj)
                                            })}
                                            className='w-full p-2 border border-gray-300 rounded-sm my-2' />
                                        <label className='text-sm font-semibold'>Billing Email*</label>
                                        <input type='email'
                                            name="billingEmail"
                                            value={shippingAddress.billingEmail}
                                            onChange={((e) => {
                                                let obj = { ...shippingAddress }
                                                obj['billingEmail'] = e.target.value
                                                setShippingAddress(obj)
                                            })}
                                            className='w-full p-2 border border-gray-300 rounded-sm my-2' />
                                    </div>
                                </div>

                                <label className='text-sm font-semibold'>Billing Mobile Number*</label>
                                <input type='number'
                                    name="billingMobileNo"
                                    value={shippingAddress.billingMobileNo}
                                    onChange={((e) => {
                                        let obj = { ...shippingAddress }
                                        obj['billingMobileNo'] = e.target.value
                                        setShippingAddress(obj)
                                    })}
                                    className='w-full p-2 border border-gray-300 rounded-sm my-2' />

                                <label className='text-sm font-semibold'>Billing Address*</label>
                                <input type='text'
                                    name="billingAddress"
                                    value={shippingAddress.billingAddress}
                                    onChange={((e) => {
                                        let obj = { ...shippingAddress }
                                        obj['billingAddress'] = e.target.value
                                        setShippingAddress(obj)
                                    })}

                                    className='w-full p-2 border border-gray-300 rounded-sm my-2' />

                                {/* Country Dropdown */}
                                <div className='relative mb-2'>
                                    <button
                                        type='button'
                                        className='w-full text-left p-2 border border-gray-300 rounded-sm mt-2 flex justify-between items-center text-gray-600'
                                        onClick={() => setcountryBillingButton(countryBillingButton === 1 ? 0 : 1)}
                                    >
                                        {countryBillingTitle}
                                        {countryBillingButton === 1 ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
                                    </button>
                                    <div className={`w-full h-[170px] overflow-y-scroll border border-gray-300 rounded-sm absolute top-full z-50 bg-white ${countryBillingButton === 1 ? 'block' : 'hidden'}`}>
                                        <ul>
                                            {Country.map(({ id, title }) => (
                                                <li
                                                    key={id}
                                                    className='p-3 hover:bg-blue-600 hover:text-white'
                                                    onClick={() => {
                                                        setcountryBillingButton(0);
                                                        setcountryBillingTitle(title);

                                                    }}
                                                >
                                                    {title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* City / State */}
                                <div className='grid sm:grid-cols-2 gap-5 mt-4'>
                                    <div>
                                        <label className='text-sm font-semibold'>State*</label>
                                        <input type='text'
                                            name="state"
                                            value={shippingAddress.state}
                                            onChange={((e) => {
                                                let obj = { ...shippingAddress }
                                                obj['state'] = e.target.value
                                                setShippingAddress(obj)
                                            })}

                                            className='w-full p-2 border border-gray-300 rounded-sm my-2' />
                                    </div>
                                    <div>
                                        <label className='text-sm font-semibold'>City*</label>
                                        <input type='text'

                                            name="city"
                                            value={shippingAddress.city}
                                            onChange={((e) => {
                                                let obj = { ...shippingAddress }
                                                obj['city'] = e.target.value
                                                setShippingAddress(obj)
                                            })}
                                            className='w-full p-2 border border-gray-300 rounded-sm my-2' />
                                    </div>
                                </div>

                                {/* Notes */}
                                <label className='text-sm font-semibold'>Order Notes</label>
                                <textarea
                                    name="orderNotes"
                                    value={shippingAddress.orderNotes}
                                    onChange={((e) => {
                                        let obj = { ...shippingAddress }
                                        obj['orderNotes'] = e.target.value
                                        setShippingAddress(obj)
                                    })}
                                    className='w-full p-2 border border-gray-300 rounded-sm my-2 h-[100px]'
                                    placeholder='Notes about your order...'
                                />
                            </div>
                        </div>

                        {/* RIGHT: Product + Payment */}
                        <div>

                            <h2 className='text-base font-bold w-full bg-black text-white p-2 uppercase'>Your order</h2>


                            <div className="max-w-2xl mx-auto my-2 overflow-x-auto">
                                <table className="min-w-full border border-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="text-center px-6 py-3 text-gray-800 font-semibold lg:text-lg text-base  border-b border-gray-300">
                                                Product
                                            </th>
                                            <th className="text-center px-6 py-3 text-gray-800 font-semibold lg:text-lg text-base  border-b border-gray-300">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {
                                            cart.map((items, index) => {
                                                return (
                                                    <tr className="border-b border-gray-200">
                                                        <td className="px-6 py-4 lg:text-base text-sm font-medium text-gray-900">
                                                            {items.title} × {items.qty}
                                                        </td>
                                                        <td className="px-6 py-4 lg:text-base text-sm text-center font-semibold text-gray-900">
                                                            Rs. {items.price * items.qty}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }


                                        <tr className="border-b border-gray-200">
                                            <td className="px-6 py-4 lg:text-base text-sm text-gray-700">Cart Subtotal</td>
                                            <td className="px-6 py-4 lg:text-base text-sm text-center text-gray-700">Rs.
                                                {
                                                    cart.reduce(
                                                        (total, obj) => total + (obj.price * obj.qty), 0)
                                                }

                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="px-6 py-4 lg:text-base text-sm font-bold text-gray-900">Order Total</td>
                                            <td className="px-6 py-4 lg:text-base text-sm text-center font-bold text-gray-900">
                                                {
                                                    cart.reduce(
                                                        (total, obj) => total + (obj.price * obj.qty), 0)
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Payment Method Radio Buttons */}
                            <div className="my-4">
                                <label className="block text-base font-semibold mb-2">Payment Method</label>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="2"
                                            checked={paymentMethod === '2'}
                                            onChange={() => setPaymentMethod('2')}
                                            className="accent-[#C09578]"
                                        />
                                        Online
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="1"
                                            checked={paymentMethod === '1'}
                                            onChange={() => setPaymentMethod('1')}
                                            className="accent-[#C09578]"
                                        />
                                        Cash On Delivery
                                    </label>
                                </div>
                            </div>

                            <button type='submit' className='my-5 bg-[#C09578] text-white font-bold p-2 rounded-sm text-base cursor-pointer hover:text-white hover:bg-black'>Placed Order</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}