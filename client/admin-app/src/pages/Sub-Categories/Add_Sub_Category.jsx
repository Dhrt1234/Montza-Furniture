import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useEffect } from "react";
import $ from "jquery";
import "dropify/dist/js/dropify.min.js";
import "dropify/dist/css/dropify.min.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'

export default function Add_Sub_Category() {


    const { id } = useParams();
    console.log("update id", id);
    let pImage = import.meta.env.VITE_PIMAGE
    let [preview, setPreview] = useState(pImage)
    let [parentCatList, setParentCatList] = useState([])
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL //http://localhost:8000/admin/
    const navigate = useNavigate();


    let [subCategoryName, setSubCategoryName] = useState("")

    let [subCategoryOrder, setSubCategoryOrder] = useState("")


    let [parentCategoryId, setParentCategoryId] = useState("")

    let getParentcategory = () => {
        axios.get(`${apiBaseUrl}subcategory/parentcategory`)
            .then((res) => res.data)
            .then((finalRes) => {
                setParentCatList(finalRes.data)
            })
    }
    let savesubCategory = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)  //Form tag

        if (id) {
            axios.put(`${apiBaseUrl}subcategory/update/${id}`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                      
                        e.target.reset()
                         setPreview(pImage)
                        setTimeout(() => {
                            navigate("/view-Sub-category")
                        }, 3000)
                    }
                    else {
                        toast.error(finalRes.msg)
                    }
                })
        }
        else {

            axios.post(`${apiBaseUrl}subcategory/insert`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        console.log(finalRes)
                        toast.success(finalRes.msg)
                        setSubCategoryName('');
                        setSubCategoryOrder('');
                        setParentCategoryId('');
                        setPreview(pImage)
                        setTimeout(() => {
                            navigate('/view-Sub-category')

                        }, 3000)
                    }
                    else {

                        toast.error(finalRes.msg)
                    }


                })
        }
    }

    useEffect(() => {
        getParentcategory()
    }, [])


    useEffect(() => {

        setSubCategoryName('');
        setSubCategoryOrder('');
        setParentCategoryId('');
        setPreview(pImage);

        if(id){

        axios.get(`${apiBaseUrl}subcategory/view/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                // console.log(finalRes.data.categoryName)
                // console.log(finalRes.data.categoryOrder)
                setSubCategoryName(finalRes.data.subcategoryName)
                setSubCategoryOrder(finalRes.data.subcategoryOrder)
                setPreview(finalRes.staticPath + finalRes.data.subcategoryImage)
                setParentCategoryId(finalRes.data.parentCategory)

            })
        }
    }, [id, preview])

    return (
        <div>
            <ToastContainer />
            <section className='w-full'>
                <div className='border-b-2 text-gray-300'></div>
                <div className='py-3'>
                    <nav className='mt-1'>
                        <ul className='flex items-center'>
                            <li> <Link to={'/dashboard'}><span className='font-bold text-gray-800'>Home </span> </Link> </li>&nbsp;
                            <li> <Link to={'/user'}><span className='font-bold text-gray-800'>/&nbsp;Sub Category</span> </Link> </li>
                            <li> <span className='font-bold text-gray-800'>/&nbsp;{id ? "Update " : " Add "}</span></li>
                        </ul>

                    </nav>
                </div>
                <div className='border-b-2 text-gray-300'></div>
                <div className='w-full min-h-[620px]'>
                    <div className='max-w-[1220px] mx-auto py-5'>
                        <h3 className='text-[26px] p-2 border rounded-t-md font-semibold border-slate-400 bg-gray-200'>{id ? "Update " : " Add "} Sub Category</h3>
                        <form onSubmit={savesubCategory} className=' py-3 px-2 border border-t-0 rounded-b-md border-slate-400' autoComplete='off'>
                            <div className='flex gap-5'>
                                <div className='w-[30%]'>
                                    <label className="mb-1">
                                        <b>SubCategory Image</b>
                                    </label>
                                    <div className='p-3' >
                                        <img src={preview} className='h-52 w-xs' alt="" />

                                        <input
                                            name="subcategoryImage"
                                            type="file"
                                            onChange={(e) => {
                                                setPreview(URL.createObjectURL(e.target.files[0]))
                                            }}

                                            className='border-2 border-gray-400 shadow-md my-4 p-2 rounded-lg'

                                        />
                                    </div>
                                </div>
                                <div className='w-[62%]'>

                                    <div className='mb-3 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Parent Category Name </label>

                                        <select name='parentCategory' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                 border-gray-400 w-full rounded-lg focus:border-blue-500'
                                            onChange={(e) => setParentCategoryId(e.target.value)}
                                            value={parentCategoryId}
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
                                    </div>
                                    <div className='mb-3 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>SubCategory Name</label>
                                        <input type='name' name='subcategoryName' value={subCategoryName}
                                            onChange={(e) => setSubCategoryName(e.target.value)}
                                            id='subcategoryName' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                             border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='SubCategory Name' />
                                    </div>

                                    <div className='mb-3 p-1'>
                                        <label for="order" className='p-1 block font-medium text-gray-900'>Order</label>
                                        <input type='number' name='subcategoryOrder' value={subCategoryOrder}
                                            onChange={(e) => setSubCategoryOrder(e.target.value)}
                                            id='subcategoryOrder' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                             border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Order' />
                                    </div>

                                </div>
                            </div>

                            <button className='text-white bg-purple-500 hover:bg-purple-700 font-medium 
                            rounded-lg py-3 px-2 my-3 mx-1.5'>
                                {id ? "Update " : " Add "} Sub Category

                            </button>
                        </form>
                    </div>

                </div>


            </section>
        </div>
    )
}
export { Add_Sub_Category }