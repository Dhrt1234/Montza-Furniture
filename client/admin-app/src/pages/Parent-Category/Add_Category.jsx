import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useEffect } from "react";
import $ from "jquery";
import "dropify/dist/js/dropify.min.js";
import "dropify/dist/css/dropify.min.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'


export default function Add_Category() {


    const { id } = useParams();
    console.log(id);
    const navigate = useNavigate();
    let [categoryName, setcategoryName] = useState("")

    let [categoryOrder, setcategoryOrder] = useState("")

    let [categoryImage, setcategoryImage] = useState("")

    useEffect(() => {
        $(".dropify").dropify({
            messages: {
                default: "Drag and drop",
                error: 'Ooops, something wrong happended.'
            },
            tpl: {
                loader: '<div class="dropify-loader"></div>',
                errorLine: '<p class="dropify-error">{{ error }}</p>',
                message: `<div class="dropify-message"><span class="file-icon" /> <p class="text-[25px]">{{ default }}</p></div>`,
            },
        });
    }, [categoryImage]);

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    console.log(apiBaseUrl)


    /* save category */
    let saveCategory = (e) => {
        e.preventDefault()


        let formValue = new FormData(e.target)  //Form tag


        if (id) {
            axios.put(`${apiBaseUrl}category/update/${id}`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        $(".dropify").data('dropify').clearElement();
                        e.target.reset()
                        setTimeout(() => {
                            navigate("/view-category")
                        }, 2000)
                    }
                    else {
                        toast.error(finalRes.msg)
                    }
                })

        }
        else {
            axios.post(`${apiBaseUrl}category/insert`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        console.log(finalRes)
                        toast.success(finalRes.msg)
                        e.target.reset()
                        $(".dropify").data('dropify').clearElement();
                        setTimeout(() => {
                            navigate('/view-category')

                        }, 3000)

                    }
                    else {

                        toast.error(finalRes.msg)
                    }



                })
        }
    }


    useEffect(()=>{

        axios.get(`${apiBaseUrl}category/view/${id}`)
      .then((res) => res.data)
      .then((finalRes) => {
        // console.log(finalRes.data.categoryName)
        // console.log(finalRes.data.categoryOrder)
        setcategoryName(finalRes.data.categoryName)
        setcategoryOrder(finalRes.data.categoryOrder)
        setcategoryImage(finalRes.staticPath+finalRes.data.categoryImage)
      })
  }, [id,categoryImage])


    return (
        <div>
            <ToastContainer />
            <section className='w-full'>
                <div className='border-b-2 text-gray-300'></div>
                <div className='py-3'>
                    <nav className='mt-1'>
                        <ul className='flex items-center'>
                            <li> <Link to={'/dashboard'}><span className='font-bold text-gray-800'>Home </span> </Link> </li>&nbsp;
                            <li> <Link to={'/user'}><span className='font-bold text-gray-800'>/&nbsp;Category</span> </Link> </li>
                            <li> <span className='font-bold text-gray-800'>/&nbsp;  {id ? "Update " : " Add "}</span></li>
                        </ul>

                    </nav>
                </div>
                <div className='border-b-2 text-gray-300'></div>
                <div className='w-full min-h-[620px]'>
                    <div className='max-w-[1220px] mx-auto py-5'>
                        <h3 className='text-[26px] p-2 border rounded-t-md font-semibold border-slate-400 bg-gray-200'>  {id ? "Update Category" : " Add Category"}</h3>
                        <form onSubmit={saveCategory} className=' py-3 px-2 border border-t-0 rounded-b-md border-slate-400' autoComplete='off'>
                            <div className='flex gap-5'>
                                <div className='w-[30%]'>
                                    <label className="mb-1">
                                        <b>Category Image</b>
                                    </label>
                                    <input
                                        type="file"
                                        className="dropify text-[15px]"
                                        data-height="250"
                                        name="categoryImage"
                                        data-default-file={categoryImage}
                                        onChange={(e)=> setcategoryImage(e.target.value)}
                                    />
                                </div>
                                <div className='w-[62%]'>

                                    <div className='mb-5 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Category Name </label>
                                        <input type='name' name='categoryName' value={categoryName} 
                                        onChange={(e)=> setcategoryName(e.target.value)} 
                                        id='categoryName' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
                                         border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Category Name' />
                                    </div>

                                    <div className='mb-5 p-1'>
                                        <label for="order" className='p-1 block font-medium text-gray-900'>Order</label>
                                        <input type='number' name='categoryOrder' value={categoryOrder}
                                        onChange={(e)=> setcategoryOrder(e.target.value)}
                                        id='categoryOrder' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
                                     border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Order' />
                                    </div>

                                </div>
                            </div>

                            <button className='text-white bg-purple-500 hover:bg-purple-700 font-medium rounded-lg py-3 px-2 my-3 mx-1.5'>
                                {id ? "Update Category" : " Add Category"}


                            </button>
                        </form>
                    </div>

                </div>


            </section>



        </div>
    )
}
export { Add_Category }