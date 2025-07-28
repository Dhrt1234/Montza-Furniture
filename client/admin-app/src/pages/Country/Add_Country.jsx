import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'


export default function Add_Country() {

    const {id}=useParams();
    console.log(id)
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
 //   console.log(apiBaseUrl)
   
    let [c_name, setCName] = useState('')
    let [c_order, setCOrder] = useState('')
    const navigate = useNavigate();

    let saveCountry = (event) => {
        
        event.preventDefault();
        let obj = {
            countryName: c_name,
            countryOrder: c_order

        }
        console.log(obj)
        if (id) {
            //update query 
            axios.put(`${apiBaseUrl}country/update/${id}`, obj)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        setCName('')
                        setCOrder('')
                     
                        setTimeout(() => {
                            navigate('/view-country')
                        }, 3000)

                    }
                })
        }
        else {

            //add query
            axios.post(`${apiBaseUrl}country/insert`, obj)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        setCName('')
                        setCOrder('')
                        setTimeout(() => {
                            navigate('/view-country')
                        }, 3000)
                    }
                    else {
                        toast.error(finalRes.error)
                    }

                })

        }
    }

    useEffect(()=>{
        setCName('')
        setCOrder('')
        
        if(id){
            axios.get(`${apiBaseUrl}country/view/${id}`)
            .then((res)=>res.data)
            .then((finalRes)=>{
                setCName(finalRes.data.countryName)
                setCOrder(finalRes.data.countryOrder)

            })
        }

    },[id])

    return (
        <div>
               <ToastContainer />
            <section className='w-full'>
                <div className='border-b-2 text-gray-300'></div>
                <div className='py-3'>
                    <nav className='mt-1'>
                        <ul className='flex items-center'>
                            <li> <Link to={'/dashboard'}><span className='font-bold text-gray-800'>Home </span> </Link> </li>&nbsp;
                            <li> <Link to={'/user'}><span className='font-bold text-gray-800'>/&nbsp;Country</span> </Link> </li>
                            <li> <span className='font-bold text-gray-800'>/&nbsp;{id ? "Update " : " Add "}</span></li>
                        </ul>

                    </nav>
                </div>
                <div className='border-b-2 text-gray-300'></div>
                <div className='w-full min-h-[620px]'>
                    <div className='max-w-[1220px] mx-auto py-5'>
                        <h3 className='text-[26px] p-2 border rounded-t-md font-semibold border-slate-400 bg-gray-200'>{id ? "Update " : " Add "} Country</h3>
                        <form onSubmit={saveCountry} className=' py-3 px-2 border border-t-0 rounded-b-md border-slate-400' autoComplete='off'>


                            <div>

                                <div className='mb-5 p-1'>
                                    <label for="name" className='p-1 block font-medium text-gray-900'>Country Name </label>
                                    <input type='name' name='country_name' id='country_name' value={c_name} onChange={(e) => setCName(e.target.value)} className='text-[20px] border-2 py-2.5 px-2 block shadow-md
         border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Country Name' />
                                </div>

                                <div className='mb-5 p-1'>
                                    <label for="country_order" className='p-1 block font-medium text-gray-900'>Country Order</label>
                                    <input type='number' name='country_order' id='country_order' value={c_order} onChange={(e) => setCOrder(e.target.value)} className='text-[20px] border-2 py-2.5 px-2 block shadow-md
         border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Country Order' />
                                </div>
                                <button className='text-white bg-purple-500 hover:bg-purple-700 font-medium rounded-lg py-3 px-2 mx-1.5'>
                                    
                                   {id ? "Update " : " Add "} Country

                                </button>
                            </div>


                        </form>

                    </div>
                </div>
            </section>

        </div>
    )
}

export { Add_Country }