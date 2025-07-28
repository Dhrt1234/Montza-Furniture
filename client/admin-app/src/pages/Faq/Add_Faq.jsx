import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'


export default function Add_Faq() {
    const {id}=useParams();
    console.log(id)
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    console.log(apiBaseUrl)
    
    let [formValue, setFormValue] = useState({
        faqQue: '',
        faqAns: '',
        faqOrder: ''

    })

    const navigate = useNavigate();
    let saveFaq = (event) => {
        event.preventDefault();

        if (id) {
            //update query 
            axios.put(`${apiBaseUrl}faq/update/${id}`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        setFormValue({

                            faqQue: '',
                            faqAns: '',
                            faqOrder: ''
                        })
                        
                        setTimeout(() => {
                            navigate('/view-faq')
                        }, 3000)


                    }
                })
        }
        else {

            //add query
            axios.post(`${apiBaseUrl}faq/insert`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        setFormValue({
                           faqQue: '',
                            faqAns: '',
                            faqOrder: ''
                        })
                        setTimeout(() => {
                            navigate('/view-faq')
                        }, 3000)


                    }
                    else {
                        toast.error(finalRes.msg)
                    }


                })
        }
    }
useEffect(() => {
        setFormValue({
            faqQue: '',
            faqAns: '',
            faqOrder: ''
        })

        if(id){
            axios.get(`${apiBaseUrl}faq/view/${id}`)
            
            .then((res)=>res.data)
            .then((finalRes)=>{
                console.log("get data",finalRes.data)
                setFormValue({
                    faqQue:finalRes.data.faqQue,
                    faqAns:finalRes.data.faqAns,
                    faqOrder:finalRes.data.faqOrder,
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
                            <li> <Link to={'/user'}><span className='font-bold text-gray-800'>/&nbsp;Faq</span> </Link> </li>
                            <li> <span className='font-bold text-gray-800'>/&nbsp;{id ? "Update " : " Add "}</span></li>
                        </ul>

                    </nav>
                </div>
                <div className='border-b-2 text-gray-300'></div>
                <div className='w-full min-h-[620px]'>
                    <div className='max-w-[1220px] mx-auto py-5'>
                        <h3 className='text-[26px] p-2 border rounded-t-md font-semibold border-slate-400 bg-gray-200'>{id ? "Update " : " Add "} Faq</h3>
                        <form onSubmit={saveFaq} className=' py-3 px-2 border border-t-0 rounded-b-md border-slate-400' autoComplete='off'>


                            <div>

                                <div className='mb-5 p-1'>
                                    <label for="question" className='p-1 block font-medium text-gray-900'>Question </label>
                                    <input type='text' value={formValue.faqQue} name='question' id='question' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
                                     border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Question'
                                        onChange={(e) => {

                                            let obj = { ...formValue }
                                            obj['faqQue'] = e.target.value
                                            setFormValue(obj)
                                        }}
                                    />
                                </div>
                                <div className='mb-3 p-1'>
                                    <label for="answer" className='p-1 block font-medium text-gray-900'>Answer</label>
                                    <textarea name='answer' value={formValue.faqAns} id='answer' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                         border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Answer'

                                        onChange={(e) => {
                                            let obj = { ...formValue }
                                            obj['faqAns'] = e.target.value
                                            setFormValue(obj)
                                        }}

                                    />
                                </div>
                                <div className='mb-5 p-1'>
                                    <label for="order" className='p-1 block font-medium text-gray-900'>Order</label>
                                    <input type='number' value={formValue.faqOrder} name='order' id='order' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
                                         border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Order'
                                        onChange={(e) => {
                                            let obj = { ...formValue }
                                            obj['faqOrder'] = e.target.value
                                            setFormValue(obj)
                                        }}
                                    />
                                </div>
                                <button className='text-white bg-purple-500 hover:bg-purple-700 font-medium rounded-lg py-3 px-2 mx-1.5'>
                                    {id ? "Update " : " Add "} Faq

                                </button>
                            </div>


                        </form>

                    </div>
                </div>
            </section>




        </div>
    )
}
export { Add_Faq }