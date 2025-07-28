import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { FaFilter } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import TableHeader from '../../common/TableHeader';
import SelectCheckbox from '../../common/SelectCheckbox';

import ResponsivePagination from 'react-responsive-pagination';


export default function View_Material() {
    const linkName = "View Material";
    const module = "material";
    let [materialList, setMaterialList] = useState([])
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    const [ids, setIds] = useState([])
    let [selectAll, setSelectAll] = useState(false)
    // const navigate = useNavigate();
    let [materialName, setMaterialName] = useState('')
   /*  let [materialOrder, SetMaterialOrder] = useState('') */
    console.log("materialName", materialName)
   /*  console.log("materialOrder", materialOrder)
 */

      const [currentPage, setCurrentPage] = useState(1);
        let [totalpages, setTotalpages]= useState(0);
        let [limit , setLimit] = useState(5);

    let getMaterials = () => {
        
        axios.get(`${apiBaseUrl}material/view`, {
            params: {
                materialName,
              /*   materialOrder, */
                currentPage,
                limit

            }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes)
                setMaterialList(finalRes.data)
                setTotalpages(finalRes.pages)
            })

    }

    useEffect(() => {
        getMaterials()
    }, [materialName, currentPage, limit])

   

    let getAllCheckedvalue = (event) => {

        if (event.target.checked && !ids.includes(event.target.value)) {
            setIds([...ids, event.target.value])
            console.log("get ids", setIds)

        }
        else {
            setIds(ids.filter((v) => v != event.target.value))
            console.log("else ids", setIds)
        }
    }


    return (
        <div>
            <section className='w-full'>
                <div className='border-b-2 text-gray-300'></div>
                <div className='py-3'>
                    <nav className='mt-1'>
                        <ul className='flex items-center'>
                            <li> <Link to={'/dashboard'}><span className='font-bold text-gray-800'>Home </span> </Link> </li>&nbsp;
                            <li> <Link to={'/user'}><span className='font-bold text-gray-800'>/&nbsp;Material</span> </Link> </li>
                            <li> <span className='font-bold text-gray-800'>/&nbsp;View</span></li>
                        </ul>

                    </nav>
                </div>
                <div className='border-b-2 text-gray-300'></div>
                <div className='w-full min-h-[620px]'>
                    <div className='max-w-[1220px] mx-auto py-5'>
                        <TableHeader module={module} linkName={linkName} ids={ids} setIds={setIds} getData={getMaterials} setSearchName={setMaterialName} /* setSearchOrder={SetMaterialOrder} */ searchField1={materialName} /* searchField2={materialOrder} */ setLimit={setLimit} />
                        <div className='border border-slate-400 border-t-0 rounded-b-md'>

                            <div className='overflow-x-auto'>

                                <table className='w-full text-gray-500'>
                                    <thead className='text-gray-900 text-[12px] uppercase bg-gray-50'>
                                        <tr>
                                            <th>
                                                <SelectCheckbox ids={ids} setIds={setIds} list={materialList} selectAll={selectAll} setSelectAll={setSelectAll} />

                                            </th>
                                            <th scope='col' className='px-6 py-3'>SR. No</th>
                                            <th scope='col' className='px-6 py-3'>Material Name</th>
                                            <th scope='col' className='w-[12%]'>Order</th>

                                            <th scope='col' className='w-[11%]'>Status</th>
                                            <th scope='col' className='w[6%]'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {materialList.length >= 1 ?
                                            materialList.map((items, index) => {

                                                return (
                                                    <tr className='bg-white hover:bg-gray-50'>
                                                        <th className='w-4 p-4'>
                                                            <input type='checkbox' onChange={getAllCheckedvalue} value={items._id} checked={ids.includes(items._id)} className='text-blue-600 text-sm rounded-sm w-4 h-4 border-gray-400 ' />
                                                        </th>
                                                        <th className=' py-4'>
                                                           {
                                                            (currentPage-1)*limit+(index+1)
                                                           }
                                                        </th>
                                                        <th scope='row' className=' flex items-center justify-center text-[15px] py-4'>

                                                            <div className='text-base font-semibold'>{items.materialName}</div>

                                                        </th>
                                                        <th className='text-[15px] px-2  py-4'>{items.materialOrder}</th>

                                                        <th className=' px-2 py-4'>
                                                            {items.materialStatus ?
                                                                <button className='text-white font-medium px-5 py-2 bg-green-700 rounded-lg focus:outline-none hover:bg-green-900'>
                                                                    Active
                                                                </button>
                                                                :
                                                                <button className='text-white font-medium px-5 py-2 bg-red-700 rounded-lg focus:outline-none hover:bg-red-900'>
                                                                    Deactive
                                                                </button>
                                                            }

                                                        </th>
                                                        <th className='px-2 py-4'>
                                                            <Link to={`/update-Material/${items._id}`} className=''>
                                                                <button className='w-[40px] h-[40px] rounded-[50%] relative bg-blue-700 hover:bg-blue-800'>

                                                                    <FaPen className='text-white absolute left-3 bottom-3' />

                                                                </button>
                                                            </Link>

                                                        </th>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan={6}>

                                                    No Data Found

                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <ResponsivePagination
                    current={currentPage}
                    total={totalpages}
                    onPageChange={setCurrentPage}
                />
            </section>

        </div>
    )
}
export { View_Material }