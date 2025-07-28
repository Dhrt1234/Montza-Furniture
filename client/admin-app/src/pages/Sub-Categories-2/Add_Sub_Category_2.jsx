import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useEffect } from "react";
import $ from "jquery";
import "dropify/dist/js/dropify.min.js";
import "dropify/dist/css/dropify.min.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'

export default function Add_Sub_Category_2() {

    const { id } = useParams();
    console.log("update id", id);
    let [parentCatList, setParentCatList] = useState([])
    let [subCatList, setSubCatList] = useState([])
    /* let [parentcattId, setParentCatId]=useState(null) */
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL //http://localhost:8000/admin/
    const navigate = useNavigate();

    const [subCategoryShow, setSubCategoryShow] = useState("")
    let [sub_subcatName, setSub_SubcatName] = useState("")

    let [sub_subcatOrder, setSub_SubcatOrder] = useState("")


    let [parentCategoryId, setParentCategoryId] = useState("")

    let [subCategoryId, setSubCategoryId] = useState("")

    let [sub_subcatImage, setSub_SubcatImage] = useState("")
    let [loading, setLoading] = useState(true);

    let getParentcategory = () => {
        axios.get(`${apiBaseUrl}sub_subcategory/parentcategory`)
            .then((res) => res.data)
            .then((finalRes) => {
                setParentCatList(finalRes.data)
            })
    }
    //console.log(parentcattId);

    let getSubcategory = () => {
        //alert(e.target.value)

        axios.get(`${apiBaseUrl}sub_subcategory/subcategory`, {
            params: {
                subCategoryShow
            }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                setSubCatList(finalRes.data)
                setLoading(false)
                // setParentCategoryId("");
                console.log(finalRes.data)
            })
    }


    let savesub_SubCategory = (e) => {
        e.preventDefault()
        let formValue = new FormData(e.target)  //Form tag

        if (id) {

            axios.put(`${apiBaseUrl}sub_subcategory/update/${id}`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        e.target.reset()
                        $(".dropify").data('dropify').clearElement();
                        setTimeout(() => {
                            navigate("/view-Sub-category_2")
                        }, 3000)
                    }
                    else {
                        toast.error(finalRes.msg)
                    }
                })
        }
        else {
            axios.post(`${apiBaseUrl}sub_subcategory/insert`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        console.log(finalRes)
                        toast.success(finalRes.msg)
                        e.target.reset()
                        $(".dropify").data('dropify').clearElement();
                        setTimeout(() => {
                            navigate('/view-Sub-category_2')

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
        getSubcategory()
    }, [subCategoryShow])

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


    useEffect(() => {
        setParentCategoryId('');
        setSubCategoryId('');
        setSub_SubcatName('');
        setSub_SubcatOrder('');
        setSub_SubcatImage('');
        setSubCategoryShow('');

        if (id) {
            axios.get(`${apiBaseUrl}sub_subcategory/view/${id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    //  console.log(finalRes)
                    setSub_SubcatName(finalRes.data.sub_subcatName)
                    setSub_SubcatOrder(finalRes.data.sub_subcatOrder)
                    setSub_SubcatImage(finalRes.staticPath + finalRes.data.sub_subcatImage)
                    setParentCategoryId(finalRes.data.parentCategory)
                    setSubCategoryShow(finalRes.data.parentCategory)
                    setSubCategoryId(finalRes.data.subCategory)
                })
        }
    }, [id, sub_subcatImage])




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
                            <li> <span className='font-bold text-gray-800'>/&nbsp;  {id ? "Update " : " Add "} Sub Sub Category</span></li>
                        </ul>

                    </nav>
                </div>
                <div className='border-b-2 text-gray-300'></div>
                <div className='w-full min-h-[620px]'>
                    <div className='max-w-[1220px] mx-auto py-5'>
                        <h3 className='text-[26px] p-2 border rounded-t-md font-semibold border-slate-400 bg-gray-200'>  {id ? "Update " : " Add "} Sub SubCategory</h3>
                        <form onSubmit={savesub_SubCategory} className=' py-3 px-2 border border-t-0 rounded-b-md border-slate-400' autoComplete='off'>
                            <div className='flex gap-5'>
                                <div className='w-[30%]'>
                                    <label className="mb-1">
                                        <b>Sub SubCategory Image</b>
                                    </label>
                                    <input
                                        type="file"
                                        className="dropify text-[15px]"
                                        data-height="250"
                                        name='sub_subcatImage'
                                        data-default-file={sub_subcatImage}
                                        onChange={(e) => setSub_SubcatImage(e.target.value)}
                                    />
                                </div>
                                <div className='w-[62%]'>

                                    <div className='mb-3 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Parent Category Name </label>

                                        <select name='parentCategory'

                                            className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                             border-gray-400 w-full rounded-lg focus:border-blue-500'

                                            value={parentCategoryId}
                                            onChange={(e) => {
                                                setSubCategoryShow(e.target.value)
                                                setParentCategoryId(e.target.value)
                                            }}

                                        >
                                            <option>Select Parent Category</option>
                                            {
                                                parentCatList.map((items, index) =>

                                                    <option key={index} value={items._id}> {items.categoryName}  </option>
                                                )
                                            }
                                        </select>
                                    </div>

                                    <div className='mb-3 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Sub Category Name </label>

                                        <select name='subCategory' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                             border-gray-400 w-full rounded-lg focus:border-blue-500'
                                            onChange={(e) => setSubCategoryId(e.target.value)}
                                            value={subCategoryId}
                                        >
                                            {loading ?

                                                <option>Loading...</option>
                                                :
                                                subCatList.length === 0 ?
                                                    <option>No SubCategory Found</option>
                                                    :

                                                    subCatList.map((items, index) =>
                                                        <option key={index} value={items._id}>{items.subcategoryName}</option>)


                                            }
                                        </select>
                                    </div>
                                    <div className='mb-3 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Category Name</label>
                                        <input type='name' name='sub_subcatName' value={sub_subcatName} id='sub_subcatName'
                                            onChange={(e) => setSub_SubcatName(e.target.value)}
                                            className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                         border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Sub SubCategory Name' />
                                    </div>

                                    <div className='mb-3 p-1'>
                                        <label for="order" className='p-1 block font-medium text-gray-900'>Order</label>
                                        <input type='number' name='sub_subcatOrder' value={sub_subcatOrder} id='sub_subcatOrder'
                                            onChange={(e) => setSub_SubcatOrder(e.target.value)}
                                            className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                         border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Order' />
                                    </div>

                                </div>
                            </div>

                            <button className='text-white bg-purple-500 hover:bg-purple-700 font-medium rounded-lg py-3 px-2 my-3 mx-1.5'>
                                {id ? "Update " : " Add "} Sub Category

                            </button>
                        </form>
                    </div>

                </div>


            </section>








        </div>
    )
}
export { Add_Sub_Category_2 }