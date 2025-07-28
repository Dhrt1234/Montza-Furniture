"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { IoIosArrowForward } from "react-icons/io";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import { redirect } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { userData } from '../slice/userSlice';

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from '../config/firebaseConfing';







export default function Login() {

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  let dispatch = useDispatch()// dispatcher use redux toolkits actions
  let dashBoard = () => {
    window.location.href = '/my-dashboard'
  }

  let apiBaseurl = process.env.NEXT_PUBLIC_APIBASEURL
  let [registerData, setregisterData] = useState({
    userName: "",
    userPassword: "",
    userEmail: "",
    userPhone: ""
  })
  let [otp, setotp] = useState("")
  let [otpVarification, setotpVarification] = useState(false)


  let userRegister = (e) => {
    e.preventDefault();
    console.log("api", apiBaseurl)
    sentOtp();
 

  }
  let sentOtp = () => {
    console.log("email", registerData.userEmail);
    axios.post(`${apiBaseurl}user/send-otp`, registerData)
      .then((res) => res.data)
      .then((finalRes) => {
        console.log(finalRes.status)
        if (finalRes.status) {
          toast.success(finalRes.msg)
          setotpVarification(true)
        }
        else {
          toast.error(finalRes.msg)
        }
      })
  }

  let otpVerify = (e) => {
    axios.post(`${apiBaseurl}user/verify-otp`, { otp })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          axios.post(`${apiBaseurl}user/register`, registerData)
            .then((res) => res.data)
            .then((finalRes) => {
              if (finalRes.status) {
                toast.success(finalRes.msg)
                setregisterData({ userName: "", userPassword: "", userEmail: "", userPhone: "" })
                setotpVarification(false)
              } else {
                toast.error(finalRes.msg)
              }
            })
          e.target.reset()
        }
        else {
          toast.error(finalRes.msg)
        }
      })
    e.preventDefault()
  }


  let login = (e) => {
    console.log("api", apiBaseurl)
    console.log(e.target)
    console.log("email", e.target.email.value)
    console.log("pwd", e.target.userPassword.value);
    let formValue = new FormData(e.target)
    axios.post(`${apiBaseurl}user/login`, formValue)
      .then((res) => {
        if (res.data.status) {
          console.log("user from db", res.data.user);
          console.log("token from db", res.data.token);
          dispatch(userData({ user: res.data.user, token: res.data.token })); //database user pass to slice's actions(userData)
          redirect('/my-dashboard')
        }
        else {
          alert(res.data.msg)
        }
      })
    e.preventDefault()


  }

  let loginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("user from google", user)

        let insertObj = {
          userName: user.displayName,
          userEmail: user.email,
          userPhone: user.phoneNumber

        }
        axios.post(`${apiBaseurl}user/google-login`, insertObj)
          .then((res) => {
            console.log("google data from db", res.data);
         if(res.data.status){
          dispatch(userData({user:res.data.user,token:res.data.token}))
         redirect('/my-dashboard')
        
        }
         
         
          })


        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });



  }


  return (

    <section>
      <ToastContainer />

      {/* OTP VARIFICATION */}
      <div className={`fixed inset-0 bg-[#525151b5] bg-opacity-50 z-40
${otpVarification ? "block" : "hidden"}`} >
        <div className='w-[400px] p-7 mx-auto bg-white fixed z-50
top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2'>
          {/*     <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2> */}
          <div className='flex items-center justify-center border-b rounded-t p-6'>
            <h3 className='absolute left-5 text-[18px] font-semibold  text-gray-600'>Verify OTP</h3>
            <span onClick={() => setotpVarification(false)}
              className='absolute right-2 text-3xl cursor-pointer'>&times;</span>
          </div>
          <p className="w-full text-sm text-gray-600 mb-6 mt-4 text-center">
            Enter the OTP sent to &nbsp;

            <span className="font-bold text-black"> &nbsp; &nbsp;{registerData.userEmail}</span>
          </p>
          <form onSubmit={otpVerify} className="space-y-4">
            <input
              type="text"
              maxLength="6"
              required
              name='otp'
              placeholder="123456"
              onChange={(e) => setotp(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg
text-center focus:outline-none focus:ring-2 focus:ring-[#C09578]"
            />
            <button
              type="submit"
              className="w-full text-white font-semibold
bg-[#C09578] px-5 py-2 rounded-2xl cursor-pointer hover:text-white
hover:bg-black"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
      {/* OTP VARIFICATION */}

      {/* title of Page */}
      <h3 className="text-center text-[35px] font-bold text-[#333] mt-3 pt-3">My Account</h3>

      <div className="justify-center flex items-center mb-6">
        <Link href="/" className="hover:text-[#C09578] cursor-pointer text-[14px] text-[#555]">
          Home
        </Link>
        <span className="flex items-center text-[14px] text-[#C09578]">
          <IoIosArrowForward className="mx-1 text-[#C09578]" />
          My Account
        </span>

      </div>
      <div className="border-b border-[#ccc] w-full m-auto pb-4"> </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 max-w-[1320px] lg:m-auto gap-10 lg:gap-20 py-4 px-3 md:mx-2 sm:mx-2">
        {/* Login Section */}
        <div className="w-full ">

          <h2 className="text-2xl font-semibold mb-6 text-[#333]">Login</h2>
          <form onSubmit={login} className="p-6 border-[1px] border-[#ccc] rounded-2xl">
            <div className="mb-4 ">
              <label htmlFor="login-email" className="block text-gray-700 text-sm font-bold mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  name='email'
                  id="login-email"
                  className=" shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email Address" required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="login-password" className="block text-gray-700 text-sm font-bold mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  name='userPassword'
                  id="login-password"
                  className="shadow appearance-none border  rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Password" required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <a href="#" className="inline-block align-baseline font-semibold text-sm text-[#C09578] hover:text-[#a87f64]">
                Lost your password?
              </a>
              <button
                className="bg-[#C09578] cursor-pointer rounded-[20px] uppercase hover:bg-black text-white font-bold py-2 px-6  focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>


            </div>
            <button onClick={loginGoogle} type='button' className="bg-[#C09578] cursor-pointer rounded-[20px] uppercase hover:bg-black text-white font-bold py-2 px-6  focus:outline-none focus:shadow-outline">
              Login with Google
            </button>
          </form>
        </div>

        {/* Register Section */}
        <div className="w-full md:mx-2 sm:mx-2">
          <h2 className="text-2xl font-semibold mb-6 text-[#333]">Register</h2>
          <form onSubmit={userRegister} className="relative p-6   border-[1px] border-[#ccc] rounded-2xl">
            <div className="mb-4">
              <label htmlFor="register-email" className="block text-gray-700 text-sm font-bold mb-2">
                User Name<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="userName"
                  id="register-username"
                  value={registerData.userName}
                  onChange={(e) => {
                    let obj = { ...registerData }
                    obj['userName'] = e.target.value
                    setregisterData(obj)
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="User Name" required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="register-email" className="block text-gray-700 text-sm font-bold mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  name='userEmail'
                  id="register-email"
                  value={registerData.userEmail}
                  onChange={(e) => {
                    let obj = { ...registerData }
                    obj['userEmail'] = e.target.value
                    setregisterData(obj)

                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email Address" required
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="register-password" className="block text-gray-700 text-sm font-bold mb-2 text-[#555]">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="password"
                  name='userPassword'
                  id="register-password"
                  value={registerData.userPassword}

                  onChange={(e) => {
                    let obj = { ...registerData }
                    obj['userPassword'] = e.target.value
                    setregisterData(obj)
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Password" required
                />
              </div>
            </div>
            <div className="mb-6 pb-9">
              <label htmlFor="register-password" className="block text-gray-700 text-sm font-bold mb-2 text-[#555]">
                Phone No <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaPhoneAlt className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="number"
                  name='userPhone'
                  id="register-userPhone"
                  value={registerData.userPhone}
                  onChange={(e) => {
                    let obj = { ...registerData }
                    obj['userPhone'] = e.target.value
                    setregisterData(obj)
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 pl-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="User Phone No" required
                />
              </div>
            </div>
            <button
              className="absolute right-5 my-[-38px] cursor-pointer  rounded-[20px] uppercase hover:bg-black bg-[#C09578] text-white font-bold py-2 px-6  focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>




    </section >

  )
}
