import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'


export default function Add_Material() {
    const { id } = useParams();
    console.log(id);
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
   // console.log(apiBaseUrl)

    let [formValue, setFormValue] = useState({
        materialName: '',
        materialOrder: ''
    })

    const navigate = useNavigate();


    let saveMaterial = (event) => {
        event.preventDefault();
       
        if (id) {
            //update query 
            axios.put(`${apiBaseUrl}material/update/${id}`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        setFormValue({ materialName: '', materialOrder: '' })

                        setTimeout(() => {
                            navigate('/view-material')
                        }, 3000)


                    }
                })
        }
        else {

            //add query
            axios.post(`${apiBaseUrl}material/insert`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        setFormValue({ materialName: '', materialOrder: '' })
                        setTimeout(() => {
                            navigate('/view-material')
                        }, 3000)


                    }
                    else {
                        toast.error(finalRes.error)
                    }


                })
        }
    }
    useEffect(() => {
        setFormValue({
            materialName: '',
            materialOrder: ''
        })

        if(id){
            axios.get(`${apiBaseUrl}material/view/${id}`)
            
            .then((res)=>res.data)
            .then((finalRes)=>{
                console.log("get data",finalRes.data)
                setFormValue({
                    materialName:finalRes.data.materialName,
                    materialOrder:finalRes.data.materialOrder,
                })
            })
        
        }
    }, [id])

    return (
        <div>
            <ToastContainer />
            <section className='w-full'>
                <div className='border-b-2 text-gray-300'></div>
                <div className='py-3'>
                    <nav className='mt-1'>
                        <ul className='flex items-center'>
                            <li> <Link to={'/dashboard'}><span className='font-bold text-gray-800'>Home </span> </Link> </li>&nbsp;
                            <li> <Link to={'/add-material'}><span className='font-bold text-gray-800'>/&nbsp;Material</span> </Link> </li>
                            <li> <span className='font-bold text-gray-800'>/&nbsp;{id ? "Update " : " Add "}</span></li>
                        </ul>

                    </nav>
                </div>
                <div className='border-b-2 text-gray-300'></div>
                <div className='w-full min-h-[620px]'>
                    <div className='max-w-[1220px] mx-auto py-5'>
                        <h3 className='text-[26px] p-2 border rounded-t-md font-semibold border-slate-400 bg-gray-200'>{id ? "Update " : " Add "} Material</h3>
                        <form onSubmit={saveMaterial} className=' py-3 px-2 border border-t-0 rounded-b-md border-slate-400' autoComplete='off'>


                            <div>

                                <div className='mb-5 p-1'>
                                    <label for="name" className='p-1 block font-medium text-gray-900'>Category Name </label>
                                    <input type='name' value={formValue.materialName} name='materialName' id='material_name' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
                                          border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Material Name'

                                        onChange={(e) => {

                                            let obj = { ...formValue }//{materialName:'',materialOrder:''}
                                            obj['materialName'] = e.target.value//cloth
                                            setFormValue(obj) //{materialName:cloth,materialOrder:''}

                                        }}

                                    />
                                </div>

                                <div className='mb-5 p-1'>
                                    <label for="order" className='p-1 block font-medium text-gray-900'>Order</label>
                                    <input type='number' value={formValue.materialOrder} name='materialOrder' id='material_order' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
                                         border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Order'
                                        onChange={(e) => {

                                            let obj = { ...formValue }//{materialName:'',materialOrder:''}
                                            obj['materialOrder'] = e.target.value//3
                                            setFormValue(obj) //materialOrder:3

                                        }}


                                    />
                                </div>
                                <button className='text-white bg-purple-500 hover:bg-purple-700 font-medium rounded-lg py-3 px-2 mx-1.5'>
                                    {id ? "Update Category" : " Add Category"}

                                </button>
                            </div>


                        </form>

                    </div>
                </div>
            </section>

        </div>
    )
}
export { Add_Material }
