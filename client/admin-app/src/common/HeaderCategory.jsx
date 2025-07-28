import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default function HeaderCategory({ module, linkName, ids, setIds, getData, parentCategory, subcategoryName, setParentCategory, setSubcategoryName, setLimit }) {
    const [filterSearch, setFilterSearch] = useState(false);
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL //http://localhost:8000/admin/
    let [parentCatList, setParentCatList] = useState([])

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

    let getParentcategory = () => {
        axios.get(`${apiBaseUrl}subcategory/parentcategory`)
            .then((res) => res.data)
            .then((finalRes) => {
                setParentCatList(finalRes.data)
            })
    }

    useEffect(() => {
        getParentcategory()
    }, [])

    return (
        <div>

            {filterSearch && (
                <div className="bg-[#F9FAFB] p-4 mb-5">
                    <form className="grid grid-cols-[40%_35%_5%] gap-[1%] items-center">


                        <select name='parentCategory' className='text-[16px] border-2 py-2 px-2 block shadow-md
                                                 border-gray-400 w-full rounded-lg focus:border-blue-500'
                            onChange={(e) => setParentCategory(e.target.value)}
                            value={parentCategory}
                        >

                            <option>Select Parent Category</option>
                            {
                                parentCatList.map((items, index) =>

                                    <option
                                        key={index} value={items._id}>
                                        {items.categoryName}
                                    </option>
                                )
                            }
                        </select>
                        <input
                            type="text"
                            name="subcategoryName"
                            value={subcategoryName}
                            onChange={(e) => setSubcategoryName(e.target.value)}
                            placeholder="Search name"
                            className="w-[400px] text-[14px] px-4 py-3 mr-2 border border-[#00000025] rounded-[4px]"
                        />
                        <button type='submit' className="bg-[#1E40AF] text-[#fff] p-3 text-[18px] rounded-[4px]">
                            <IoMdSearch />
                        </button>



                    </form>
                </div>
            )}


            <div className='flex items-center justify-between bg-slate-100 py-3 px-4 border rounded-t-md border-slate-400'>

                <h3 className='text-[26px] font-semibold'>{linkName}</h3>
                <div className='flex justify-between gap-5'>
                    <select onChange={(e) => setLimit(e.target.value)} className="bg-white rounded-[8px] cursor-pointer p-3 font-semibold">
                        <option value={2}>Change Page Limit</option>
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
                    <button onClick={changeStatus} className='text-white font-medium px-4 bg-green-700 rounded-lg focus:outline-none hover:bg-green-900'>
                        Change Status
                    </button>
                    <button onClick={deleteData} className='text-white font-medium px-4 mx-4 bg-red-700 rounded-lg focus:outline-none hover:bg-red-900'>
                        Delete
                    </button>
                </div>
            </div></div>
    )

}
