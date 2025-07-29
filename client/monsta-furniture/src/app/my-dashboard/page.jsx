"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa";
import { Country } from '../Data/Country';

import { store } from '../store/store';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'
export default function Dashboard() {

    let token = useSelector((store) => store.login.token)

    let [dashBoardButton, setdashBoardButton] = useState(1)

    let [countryBillingTitle, setcountryBillingTitle] = useState("Select Country")

    let [countryBillingButton, setcountryBillingButton] = useState(false)

    let [countryShippingTitle, setcountryShippingTitle] = useState("Select Country")



    let [countryShippingButton, setcountryShippingButton] = useState(false)

    let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEURL
    let [userName, setuserName] = useState('')
    let [userEmail, setuserEmail] = useState('')
    let [userPhone, setuserPhone] = useState('')
    let [userAddress, setuserAddress] = useState('')
    let [userGender, setuserGender] = useState("Mr.")

    let [orderData, setOrderData] = useState([])
    let userData = () => {

        axios.post(`${apiBaseUrl}user/user-data`,
            {},
            {

                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            .then((res) => res.data)
            .then((finalRes) => {
                setuserEmail(finalRes.data.userEmail)
                setuserName(finalRes.data.userName)
                setuserPhone(finalRes.data.userPhone)

                const dbGender = finalRes.data.userGender;
                if (dbGender === "Mr." || dbGender === "Mrs.") {
                    setuserGender(dbGender);
                }
                else {
                    setuserGender("Mr.");
                }
                setuserGender(finalRes.data.userGender)
                setuserAddress(finalRes.data.userAddress)


            })
    }

    let getOrders = () => {
        axios.post(`${apiBaseUrl}order/view-order`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => res.data)
            .then((finalRes) => {
                //  console.log("order",finalRes)
                setOrderData(finalRes.data)
                console.log("order", finalRes.data)

            })
    }


    useEffect(() => {
        userData()
        getOrders()
    }, [])


    let userUpdate = (e) => {
        e.preventDefault()


        let updateobj = {
            userName,
            userGender,
            userAddress
        }
        console.log("updateobj", updateobj)

        axios.put(`${apiBaseUrl}user/user-update`, updateobj,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    toast.success(finalRes.msg)

                }
                else {
                    toast.error(finalRes.msg)
                }
            })
    }

    let changePassword = (e) => {
        e.preventDefault()

        let oldPassword = e.target.oldPassword.value
        let newPassword = e.target.newPassword.value
        let confirmPassword = e.target.confirmPassword.value

        console.log(token)
        console.log(oldPassword, newPassword, confirmPassword)
        if (newPassword != confirmPassword) {
            toast.error("New password or Confirm Password Not matched")

        }
        else {
            let obj = {
                oldPassword,
                newPassword,

            }

            axios.post(`${apiBaseUrl}user/change-password`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                    }

                    else {
                        toast.error(finalRes.msg)
                    }
                })



        }
    }

    return (
        <>
            <ToastContainer />
            <section className="max-w-full my-8" id="my-dashboard">
                <div className="max-w-[1320px] lg:mx-auto mx-2" id="mydashboard-mid">
                    <div className="w-full text-center" id="muAccount-mid-heading">
                        <h2 className="lg:text-4xl sm:text-4xl text-2xl font-semibold">
                            My Dashboard
                        </h2>
                        <div className="flex items-center justify-center gap-2 lg:my-3 sm:my-3 my-2">
                            <Link href="/" className="text-sm hover:text-[#C09578]">
                                Home
                            </Link>
                            <FaAngleRight className="text-[#C09578]" />
                            <Link href="/my-dashboard" className="text-sm text-[#C09578]">
                                My Dashboard
                            </Link>
                        </div>
                        <hr className="border-gray-200 my-5" />
                    </div>
                </div>
            </section>

            <section className='max-w-full my-8' id='my-dashboard-content'>
                <div className='max-w-[1320px] lg:mx-auto mx-2'>
                    <div className='max-w-full grid lg:grid-cols-[23%_auto] sm:grid-cols-[23%_auto] gap-5'>


                        <div id='my-dashBoard-button'>
                            <button className={`w-full  py-3 rounded-sm text-sm font-bold cursor-pointer text-left px-3 text-white hover:bg-[#C09578] my-1 ${dashBoardButton == 1 ? 'bg-[#C09578]' : 'bg-[#212121]'}`} onClick={() => setdashBoardButton(1)}>My Dashboard</button>

                            <button className={`w-full  py-3 rounded-sm text-sm font-bold cursor-pointer text-left px-3 text-white hover:bg-[#C09578] my-1 ${dashBoardButton == 2 ? 'bg-[#C09578]' : 'bg-[#212121]'}`} onClick={() => setdashBoardButton(2)}>Orders</button>

                            <button className={`w-full  py-3 rounded-sm text-sm font-bold cursor-pointer text-left px-3 text-white hover:bg-[#C09578] my-1 ${dashBoardButton == 3 ? 'bg-[#C09578]' : 'bg-[#212121]'}`} onClick={() => setdashBoardButton(3)}>Addresses</button>

                            <button className={`w-full  py-3 rounded-sm text-sm font-bold cursor-pointer text-left px-3 text-white hover:bg-[#C09578] my-1 ${dashBoardButton == 4 ? 'bg-[#C09578]' : 'bg-[#212121]'}`} onClick={() => setdashBoardButton(4)}>My Profile</button>

                            <button className={`w-full  py-3 rounded-sm text-sm font-bold cursor-pointer text-left px-3 text-white hover:bg-[#C09578] my-1 ${dashBoardButton == 5 ? 'bg-[#C09578]' : 'bg-[#212121]'}`} onClick={() => setdashBoardButton(5)}>Change Password</button>

                            <button className={`w-full  py-3 rounded-sm text-sm font-bold cursor-pointer text-left px-3 text-white hover:bg-[#C09578] my-1 ${dashBoardButton == 6 ? 'bg-[#C09578]' : 'bg-[#212121]'}`} onClick={() => setdashBoardButton(6)}>Logout</button>
                        </div>



                        <div id='my-dashboard-content'>

                            <div className={`${dashBoardButton == 1 ? 'block' : 'hidden'}`} id='my-dashboard'>
                                <h3 className='lg:text-xl text-base font-semibold'>My Dashboard</h3>
                                <p className='py-3 lg:text-base text-sm font-normal text-[#5A5A5A] '>From your account dashboard. you can easily check & view your <span className='text-black  font-semibold'> recent orders </span>, manage your   <span className='text-black font-semibold'>shipping and billing addresses </span> and <span className='text-black font-semibold'> Edit your password and account details.</span> </p>
                            </div>

                            <div className={`${dashBoardButton == 2 ? 'block' : 'hidden'}`} id='orders'>
                                <h3 className='text-xl font-semibold'>Orders</h3>
                                <div className="lg:overflow-x-auto sm:overflow-x-auto overflow-x-scroll my-5">
                                    <table className="max-w-full text-sm text-left border border-gray-200">
                                        <thead className="bg-gray-100 text-center">

                                            <tr>
                                                <th className="px-4 py-3 font-semibold text-gray-800 border border-gray-200">Order</th>
                                                <th className="px-4 py-3 font-semibold text-gray-800 border border-gray-200">Date</th>
                                                <th className="px-4 py-3 font-semibold text-gray-800 border border-gray-200">Status</th>
                                                <th className="px-4 py-3 font-semibold text-gray-800 border border-gray-200">Total</th>
                                                <th className="px-4 py-3 font-semibold text-gray-800 border border-gray-200">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className='text-center'>

                                            {orderData.map((items, index) => {
                                                let { updatedAt, orderStatus } = items;
                                                let dateOnly = updatedAt.split('T')[0];
                                                console.log("date", dateOnly);
                                                let dateObj = new Date(dateOnly);
                                               //  Format to 'July 5, 2025'
                                                let order_Date = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                                                console.log(order_Date); // Output: "July 5, 2025"
                                                let order_status;
                                                orderStatus==1?order_status="pending":orderStatus==2?order_status="processing":order_status="completed";
                                                console.log(order_status);
                                                return (
                                                    <tr className="border-t border-gray-200">
                                                        <td className="px-4 py-3 text-gray-800 border-r-1 border-gray-200">{index+1}</td>
                                                        <td className="px-4 py-3 text-gray-800 border-r-1 border-gray-200 ">{order_Date}</td>
                                                        <td className="px-4 py-3 font-semibold text-gray-800 border-r-1 border-gray-200 capitalize">{order_status}</td>
                                                        <td className="px-4 py-3 font-semibold text-gray-800 border-r-1 border-gray-200">Rs. {items.orderAmount}</td>
                                                        <td className="px-4 py-3 text-[#C09578] font-semibold cursor-pointer hover:underline ">View</td>
                                                    </tr>

                                                )
                                            })}

                                           
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            <div className={`${dashBoardButton == 3 ? 'block' : 'hidden'}`} id='address'>
                                <p className='text-sm text-[#5A5A5A] font-normal'>The following addresses will be used on the checkout page by default.</p>

                                <div className='w-full grid lg:grid-cols-2 gap-5 my-5' id='billing-shipping-addresses'>


                                    <div id='billing-address'>
                                        <h3 className='lg:text-xl text-base font-normal capitalize'>Billing address</h3>
                                        <div className='w-full border-1 border-gray-300 rounded-sm my-2 p-4' id='billing-form'>
                                            <form action="">
                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Billing Name*</label>
                                                <input type="text" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-3' />

                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Billing Email*</label>
                                                <input type="email" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />

                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Billing Mobile Number*</label>
                                                <input type="tel" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />


                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Billing Address*</label>
                                                <input type="text" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />


                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Country*</label>

                                                <div className='relative mb-2' id='country'>

                                                    <button type='button' className='w-full text-left lg:text-base text-sm p-2 border-1 border-gray-200 rounded-sm mt-2 text-gray-600' onClick={() => setcountryBillingButton(!countryBillingButton)}>{countryBillingTitle}
                                                    </button>
                                                    <div className={`w-full border-1 h-[500px] overflow-y-scroll  border-gray-200 rounded-sm absolute top-[100%] bg-white ${countryBillingButton ? 'block' : 'hidden'}`}>
                                                        <nav>
                                                            <ul>

                                                                {
                                                                    Country.map((value, index) => {
                                                                        let { id, title } = value
                                                                        return (
                                                                            <li key={id} className=' text-base py-1 hover:bg-blue-600 hover:text-white w-full p-3 ' onClick={() => {
                                                                                setcountryBillingButton(false)
                                                                                setcountryBillingTitle(title)
                                                                            }}>
                                                                                {title}
                                                                            </li>
                                                                        )
                                                                    })
                                                                }

                                                            </ul>
                                                        </nav>
                                                    </div>
                                                </div>

                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>State*</label>
                                                <input type="text" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />

                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>City*</label>
                                                <input type="text" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />

                                                <button type='submit' className='py-2 px-5 my-5  font-semibold text-sm bg-[#C09578] rounded-xl text-white flex justify-end ml-auto cursor-pointer hover:bg-black hover:text-white' >Update</button>
                                            </form>
                                        </div>
                                    </div>

                                    <div id='shipping-address'>
                                        <h3 className='lg:text-xl text-base font-normal capitalize'>shipping address</h3>
                                        <div className='w-full border-1 border-gray-300 rounded-sm my-2 p-4' id='shipping-form'>
                                            <form action="">
                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Shipping Name*</label>
                                                <input type="text" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-3' />

                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Shipping Email*</label>
                                                <input type="email" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />

                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Shipping Mobile Number*</label>
                                                <input type="tel" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />


                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Shipping Address*</label>
                                                <input type="text" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />

                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Country*</label>

                                                <div className='relative mb-2' id='country'>

                                                    <button type='button' className='w-full text-left lg:text-base text-sm p-2 border-1 border-gray-200 rounded-sm mt-2 text-gray-600' onClick={() => setcountryShippingButton(!countryShippingButton)}>{countryShippingTitle}
                                                    </button>
                                                    <div className={`w-full border-1 h-[500px] overflow-y-scroll  border-gray-200 rounded-sm absolute top-[100%] bg-white ${countryShippingButton ? 'block' : 'hidden'}`}>
                                                        <nav>
                                                            <ul>

                                                                {
                                                                    Country.map((value, index) => {
                                                                        let { id, title } = value
                                                                        return (
                                                                            <li key={id} className=' lg:text-base text-sm py-1 hover:bg-blue-600 hover:text-white w-full p-3 ' onClick={() => {
                                                                                setcountryShippingButton(false)
                                                                                setcountryShippingTitle(title)
                                                                            }}>
                                                                                {title}
                                                                            </li>
                                                                        )
                                                                    })
                                                                }

                                                            </ul>
                                                        </nav>
                                                    </div>
                                                </div>

                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>State*</label>
                                                <input type="text" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />

                                                <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>City*</label>
                                                <input type="text" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />

                                                <button type='submit' className='py-2 px-5 my-5  font-semibold text-sm bg-[#C09578] rounded-xl text-white flex justify-end ml-auto cursor-pointer hover:bg-black hover:text-white' >Update</button>
                                            </form>
                                        </div>
                                    </div>


                                </div>

                            </div>

                            <div className={`${dashBoardButton == 4 ? 'block' : 'hidden'}`} id='profile'>
                                <h3 className='lg:text-xl text-base font-semibold'>My Profile</h3>
                                <div className='w-full border-1 border-gray-300 rounded-sm my-2 p-4' id='billing-form'>
                                    <form onSubmit={userUpdate} action="">
                                        <input type="radio" value="Mr."
                                            onChange={(e) => setuserGender(e.target.value)} checked={userGender == "Mr."}
                                        />
                                        <label htmlFor="" className='font-semibold'>Mr.</label>&nbsp;&nbsp;&nbsp;
                                        <input type="radio" value="Mrs."
                                            onChange={(e) => setuserGender(e.target.value)} checked={userGender == "Mrs."} />
                                        <label htmlFor="" className='font-semibold'>Mrs.</label>
                                        <br />
                                        <br />
                                        <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Name*</label>
                                        <input type="text" name='userName' value={userName}
                                            onChange={(e) => setuserName(e.target.value)}

                                            className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />


                                        <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Email*</label>
                                        <input type="email" name='userEmail' value={userEmail}
                                            readOnly
                                            className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />


                                        <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Mobile Number*</label>
                                        <input type="number" name='userPhone' value={userPhone}
                                            readOnly className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />


                                        <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Address*</label>
                                        <input type="text" name='userAddress' value={userAddress}
                                            onChange={(e) => setuserAddress(e.target.value)}

                                            className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />


                                        <button type='submit' className='py-2 px-5 my-5  font-semibold text-sm bg-[#C09578] rounded-xl text-white flex justify-end ml-auto cursor-pointer hover:bg-black hover:text-white' >Update</button>
                                    </form>
                                </div>
                            </div>


                            <div className={`${dashBoardButton == 5 ? 'block' : 'hidden'}`} id='cahngePassword'>
                                <h3 className='lg:text-xl text-base font-semibold'>Change Password</h3>
                                <div className='w-full border-1 border-gray-300 rounded-sm my-2 p-4' id='changePassword-form'>
                                    <form onSubmit={changePassword} action="">
                                        <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Current Password</label>
                                        <input name='oldPassword' type="password" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />


                                        <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>New Password</label>
                                        <input name='newPassword' type="password" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />


                                        <label htmlFor="" className='text-sm cursor-pointer font-semibold hover:text-[#C09578]'>Confirm Password</label>
                                        <input name='confirmPassword' type="password" className='w-full p-1.5 border-1 border-gray-200 rounded-sm my-2' />




                                        <button type='submit' className='py-2 px-5 my-5  font-semibold text-sm bg-[#C09578] rounded-xl text-white flex justify-end ml-auto cursor-pointer hover:bg-black hover:text-white' >Change Password</button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
