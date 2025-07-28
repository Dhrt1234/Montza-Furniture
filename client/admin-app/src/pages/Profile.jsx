import React, { useContext, useEffect, useState } from "react";
import { IoMdMail } from "react-icons/io";
import { IoPhonePortrait } from "react-icons/io5";
import { Link } from "react-router";
import $ from "jquery";
import "dropify/dist/js/dropify.min.js";
import "dropify/dist/css/dropify.min.css";
import { loginContext } from "../Context/MainContext";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'



export default function Profile() {
    const [profile, setProfile] = useState(true);
    let [error, setError] = useState('')
    let [msg, setMsg] = useState('')
    let { adminID } = useContext(loginContext)
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL

    let [adminName, setadminName] = useState('')
    let [adminEmail, setadminEmail] = useState('')
    let [adminPhone, setadminPhone] = useState('')
    let [adminImage, setadminImage] = useState("")

    let changePassword = (event) => {
        alert("hi")
        event.preventDefault()
        let currentPassword = event.target.currentPassword.value;
        let newPassword = event.target.newPassword.value;
        let confirmPassword = event.target.confirmPassword.value;

        if (newPassword != confirmPassword) {
            return setError("New password or Confirm Password Not matched")

        }

        axios.post(`${apiBaseUrl}auth/change-password`, {
            currentPassword,
            newPassword,
            adminID
        })
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) { //1
                    //Login
                    setMsg(finalRes.msg)
                    event.target.reset()
                    setTimeout(() => {
                        setMsg('')
                    }, 2000)


                }
                else {

                    setError(finalRes.msg)
                    setTimeout(() => {
                        setError('')
                    }, 2000)

                }
            })
    }

    useEffect(() => {
        $(".dropify").dropify({
            messages: {
                default: "Drag and drop",
            },
            tpl: {
                message: `<div class="dropify-message"><span class="file-icon" /> <p class="text-[25px]">{{ default }}</p></div>`,
            },
        });
    });

    useEffect(() => {

        axios.get(`${apiBaseUrl}auth/getadmin/${adminID}`)
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes.data)
                console.log(finalRes.data.adminName)
                console.log(finalRes.data.adminEmail)
                console.log(finalRes.data.adminPhone)
                setadminName(finalRes.data.adminName)
                setadminEmail(finalRes.data.adminEmail)
                setadminPhone(finalRes.data.adminPhone)
                setadminImage(finalRes.staticPath + finalRes.data.adminImage)

            })
    }, [adminID])

    let adminUpdate = (e) => {
        e.preventDefault()


        let formValue = new FormData(e.target)

        axios.put(`${apiBaseUrl}auth/update/${adminID}`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    toast.success(finalRes)
                    $(".dropify").data('dropify').clearElement();
                    e.target.reset()
                    /*   setTimeout(() => {
                           navigate("/view-category")
                       }, 2000) */
                }
                else {
                    toast.error(finalRes.msg)
                }
            })
        }

        return (
            <>
            <ToastContainer />
                <div>
                    <div className=" px-5 bg-[#F1F4F5] border-b-3 border-t-3 border-[#00000029]">
                        <h1 className="py-4 text-[25px] font-semibold text-[#00000095] ">
                            <Link
                                to="/dashboard"
                                className="hover:text-[#0000ff88] cursor-pointer"
                            >
                                {" "}
                                Home{" "}
                            </Link>{" "}
                            /{" "}
                            <span className="hover:text-[#0000ff88] cursor-pointer">
                                {" "}
                                Profile
                            </span>
                        </h1>
                    </div>
                    {/* <hr className="border-[#00000029] mt-1" /> */}

                    <div className=" bg-[#F1F4F5] md:p-5 p-2">
                        <div className="flex lg:flex-nowrap flex-wrap mt-4 gap-4 w-full">
                            <div className="lg:w-[50%] w-[500px]">
                                <div className="shadow-md rounded-[10px] overflow-hidden">
                                    <div className="px-4 py-8 bg-[#fff] h-[200px] flex flex-col items-center justify-center">
                                        <div className="pt-7">
                                            <img src={adminImage} alt="profile" className="w-30 h-30 rounded-full object-cover" />
                                        </div>
                                        <h1 className="text-[20px] font-semibold pt-4">Admin</h1>
                                    </div>
                                    <div className="px-4 py-7 bg-[#F6F9FD]">
                                        <div className="pt-2">
                                            <h1 className="text-[22px]  font-bold">
                                                Contact Information
                                            </h1>
                                            <h1 className="text-[18px] flex items-center gap-2 mt-3">
                                                <IoPhonePortrait />
                                                {adminPhone}
                                            </h1>
                                            <h1 className="text-[18px] flex items-center gap-2 mt-3">
                                                <IoMdMail />{adminEmail}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-[50%] w-full">
                                <div className="p-4 shadow-md bg-[#fff] rounded-[10px] overflow-hidden">
                                    <div className="">
                                        <ul className="flex gap-3 text-[22px] font-semibold border-b">
                                            <li
                                                className={`px-4 pb-2 cursor-pointer ${profile ? "text-[blue] border-b-[2px]" : ""
                                                    }`}
                                                onClick={() => setProfile(true)}
                                            >
                                                Edit Profile
                                            </li>
                                            <li
                                                className={`px-4 pb-2 cursor-pointer ${profile == false ? "text-[blue] border-b-[2px]" : ""
                                                    }`}
                                                onClick={() => setProfile(false)}
                                            >
                                                Change Password
                                            </li>
                                        </ul>
                                    </div>

                                    {profile ? (
                                        <div>
                                            <form onSubmit={adminUpdate}>
                                                <div className="flex lg:flex-nowrap flex-wrap gap-4 mt-2">
                                                    <div className="lg:w-[40%] w-full">

                                                        <div className="py-4">
                                                            <label className=" text-[18px] font-semibold">
                                                                Choose Image

                                                            </label>
                                                        </div>
                                                        <div className="py-2">
                                                            <input
                                                                type="file"
                                                                name="adminImage"

                                                                className="dropify text-[15px] my-4"
                                                                data-height="250"
                                                                data-default-file={adminImage}
                                                                onChange={(e) => setadminImage(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="lg:w-[60%] w-full">
                                                        <div className="flex flex-col mt-4">
                                                            <label className="mb-1">
                                                                <b>Name</b>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name='adminName'
                                                                value={adminName}
                                                                onChange={(e) => setadminName(e.target.value)}
                                                                className=" border border-[#0000004a] rounded-[5px] outline-0 px-3 py-1 "
                                                                placeholder="Name"
                                                                required
                                                            />
                                                        </div>

                                                        <div className="flex flex-col mt-4">
                                                            <label className="mb-1">
                                                                <b>Email</b>
                                                            </label>
                                                            <input
                                                                type="email"
                                                                name="adminEmail"
                                                                value={adminEmail}
                                                                onChange={(e) => setadminEmail(e.target.value)}
                                                                className=" border border-[#0000004a] rounded-[5px] outline-0 px-3 py-1 "
                                                                placeholder="Email"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="flex flex-col mt-4">
                                                            <label className="mb-1">
                                                                <b>Mobile Number</b>
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="adminPhone"
                                                                value={adminPhone}
                                                                onChange={(e) => setadminPhone(e.target.value)}
                                                                className=" border border-[#0000004a] rounded-[5px] outline-0 px-3 py-1 "
                                                                placeholder="Mobile Number"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    className="bg-[#7E22CE] text-[#fff] py-2 px-3 rounded-[8px] font-[500]  cursor-pointer my-4"
                                                    onSubmit={(e) => e.preventDefault()}
                                                >
                                                    Update Profile
                                                </button>
                                            </form>
                                        </div>
                                    ) : (
                                        <div>
                                            <form onSubmit={changePassword}>
                                                {error != '' && <p className='text-red-500'> {error} </p>}

                                                {msg != '' && <p className='text-red-500'> {msg} </p>}
                                                <div className="flex flex-col mt-2">
                                                    <label className="mb-1">
                                                        <b>Current Password</b>
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="currentPassword"
                                                        className=" border border-[#0000004a] rounded-[5px] outline-0 px-3 py-1 "
                                                        placeholder="Current Password"
                                                        required
                                                    />
                                                </div>

                                                <div className="flex flex-col mt-4">
                                                    <label className="mb-1">
                                                        <b>New Password</b>
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="newPassword"
                                                        className=" border border-[#0000004a] rounded-[5px] outline-0 px-3 py-1 "
                                                        placeholder="New Password
"
                                                        required
                                                    />
                                                </div>

                                                <div className="flex flex-col mt-4">
                                                    <label className="mb-1">
                                                        <b>Confirm Password</b>
                                                    </label>
                                                    <input
                                                        type="password"
                                                        name="confirmPassword"
                                                        className=" border border-[#0000004a] rounded-[5px] outline-0 px-3 py-1 "
                                                        placeholder="Confirm Password"
                                                        required
                                                    />
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="bg-[#7E22CE] text-[#fff] py-2 px-3 rounded-[8px] font-[500]  cursor-pointer my-4"

                                                >
                                                    Change Password
                                                </button>
                                            </form>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
