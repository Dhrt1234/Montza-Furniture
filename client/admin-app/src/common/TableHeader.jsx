import React, { useState } from "react";
import axios from 'axios';
import { FaFilter } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import { IoMdSearch } from "react-icons/io";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default function TableHeader({ module, linkName, ids, setIds, getData, setSearchName, searchField1, setLimit /*  , searchField2, setSearchOrder  */ }) {
    const [filterSearch, setFilterSearch] = useState(false);
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL //http://localhost:8000/admin/

    console.log(setSearchName)

    let deleteData = () => {
        console.log(ids)
        console.log(module)
        if (ids.length >= 1) {
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
                    axios.post(`${apiBaseUrl}${module}/multi-delete`, { ids })
                        .then((res) => res.data)
                        .then((finalRes) => {
                            if (finalRes.status) {
                                getData()
                                setIds([])
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

    let changeStatus = () => {
        console.log(ids)
        console.log(module)
        if (ids.length >= 1) {
            axios.post(`${apiBaseUrl}${module}/changeStatus`, { ids })
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        getData()
                        setIds([])

                    }
                    else {
                        toast.error(finalRes.msg)
                    }
                })
        }
        else {
            toast.error("Please select records")
        }
    }

    return (
        <div>
            <ToastContainer />
            {filterSearch && (
                <div className=" bg-[#F9FAFB] p-4 mb-5">
                    <form className="flex gap-2">
                        <input

                            type="text"
                            placeholder="Search by name"
                            className="w-[400px] bg-white text-[14px] px-4 py-3 mr-2 border border-[#00000025] rounded-[4px]"
                            value={searchField1} onChange={(e) => setSearchName(e.target.value)}
                        />
                        {/*    <input
                            
                            type="text"
                            placeholder="Search by order"
                            className="w-[400px] bg-white text-[14px] px-4 py-3 mr-2 border border-[#00000025] rounded-[4px]"
                            value={searchField2} onChange={(e) => setSearchOrder(e.target.value)}
                        /> */}
                        <div className="bg-[#1E40AF] text-[#fff] p-3 text-[18px] rounded-[4px]">
                            <IoMdSearch onClick={getData} />
                        </div>



                    </form>
                </div>
            )}


            <div className='flex items-center justify-between bg-slate-200 py-3 px-4 border rounded-t-md border-slate-400'>

                <h3 className='text-[26px] font-semibold'>{linkName} {setIds} </h3>
                <div className='flex justify-between gap-5'>

                    <select onChange={(e) => setLimit(e.target.value)} className="bg-white rounded-[8px] cursor-pointer p-3 font-semibold">
                        <option value={5}>Change Page Limit</option>
                        <option value={10}>10</option>
                        <option value={12}>12</option>
                        <option value={15}>15</option>
                    </select>

                    <button
                        onClick={() => setFilterSearch(!filterSearch)}
                        className="bg-[#1D4ED8] hover:bg-[#1d33d8] text-white p-3 mr-3 rounded-[8px] cursor-pointer"
                    >
                        {/* <FaFilter /> */}
                        {filterSearch ? <MdFilterAltOff /> : <MdFilterAlt />}
                    </button>
                    <button onClick={changeStatus} className=' cursor-pointer text-white font-medium px-4 bg-green-700 rounded-lg focus:outline-none hover:bg-green-900'>
                        Change Status
                    </button>
                    <button onClick={deleteData} className='cursor-pointer text-white font-medium px-4 mx-4 bg-red-700 rounded-lg focus:outline-none hover:bg-red-900'>
                        Delete
                    </button>
                </div>
            </div></div>
    )
}
