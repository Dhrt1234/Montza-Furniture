import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useEffect } from "react";
import $ from "jquery";
import "dropify/dist/js/dropify.min.js";
import "dropify/dist/css/dropify.min.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
export default function Add_Slider() {
    const navigate = useNavigate();

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
    });
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    console.log(apiBaseUrl)


    /* save slider */
    let saveSlider = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)  //Form tag
        axios.post(`${apiBaseUrl}slider/insert`, formValue)
            .then((res) => res.data)
            .then((finalRes) => {
                if (finalRes.status) {
                    console.log(finalRes)
                    toast.success(finalRes.msg)
                    e.target.reset()
                    $(".dropify").data('dropify').clearElement();
                    setTimeout(() => {
                        navigate('/view-slider')

                    }, 3000)

                }
                else {

                    toast.error(finalRes.msg)
                }



            })

    }
    return (
        <div>
<ToastContainer />
            <section className='w-full'>
                <div className='border-b-2 text-gray-300'></div>
                <div className='py-3'>
                    <nav className='mt-1'>
                        <ul className='flex items-center'>
                            <li> <Link to={'/dashboard'}><span className='font-bold text-gray-800'>Home </span> </Link> </li>&nbsp;
                            <li> <Link to={'/user'}><span className='font-bold text-gray-800'>/&nbsp;Slider</span> </Link> </li>
                            <li> <span className='font-bold text-gray-800'>/&nbsp;Add</span></li>
                        </ul>

                    </nav>
                </div>
                <div className='border-b-2 text-gray-300'></div>
                <div className='w-full min-h-[620px]'>
                    <div className='max-w-[1220px] mx-auto py-5'>
                        <h3 className='text-[26px] p-2 border rounded-t-md font-semibold border-slate-400 bg-gray-200'>Add Slider</h3>
                        <form onSubmit={saveSlider} className=' py-3 px-2 border border-t-0 rounded-b-md border-slate-400' autoComplete='off'>
                            <div className='flex gap-5'>
                                <div className='w-[30%]'>
                                    <label className="mb-1">
                                        <b>Category Image</b>
                                    </label>
                                    <input
                                        type="file"
                                        className="dropify text-[15px]"
                                        data-height="250"
                                        name='sliderImage'
                                    />
                                </div>
                                <div className='w-[62%]'>

                                    <div className='mb-5 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Title</label>
                                        <input type='name' name='title' id='title' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
                                                 border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Title' />
                                    </div>

                                    <div className='mb-5 p-1'>
                                        <label for="order" className='p-1 block font-medium text-gray-900'>Order</label>
                                        <input type='number' name='sliderOrder' id='sliderOrder' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
                                             border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Order' />
                                    </div>


                                </div>
                            </div>

                            <button className='text-white bg-purple-500 hover:bg-purple-700 font-medium rounded-lg py-3 px-2 my-3 mx-1.5'>Add Slider

                            </button>
                        </form>
                    </div>

                </div>


            </section>









        </div>
    )
}
export { Add_Slider }