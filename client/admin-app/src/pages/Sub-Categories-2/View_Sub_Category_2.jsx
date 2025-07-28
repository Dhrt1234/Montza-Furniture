import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FaFilter } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import ResponsivePagination from 'react-responsive-pagination';
import HeaderSubCategory from '../../common/HeaderSubCategory';
import axios from 'axios';
import SelectCheckbox from '../../common/SelectCheckbox';


export default function View_Sub_Category_2() {
    const linkName = "View Sub SubCategory";
    let [subsubcatList, setSubSubCatList] = useState([])
    let [staticPath, setStaticPath] = useState('')
    let apiBaseUrl = import.meta.env.VITE_APIBASEURL
    const module = "sub_subcategory";
    let [ids, setIds] = useState([])
    let [parentCategory, setParentCategory] = useState('')
    let [subCategory, setSubCategory] = useState('')
    let [sub_subcatName, setSub_SubcatName] = useState('')

    const [currentPage, setCurrentPage] = useState(1);
    let [totalpages, setTotalpages] = useState(0);
    let [limit, setLimit] = useState(5);
      let [selectAll, setSelectAll] = useState(false)


    let getSubSubCategories = () => {
        axios.get(`${apiBaseUrl}sub_subcategory/view`, {

            params: {
                parentCategory,
                subCategory,
                sub_subcatName,
                currentPage,
                limit
            }
        })
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes)
                setSubSubCatList(finalRes.data)
                setStaticPath(finalRes.staticPath)
                setTotalpages(finalRes.pages)
            })

    }


    let checkedCategory = (event) => {
        if (event.target.checked && !ids.includes(event.target.value)) {
            setIds([...ids, event.target.value])
            console.log("get", setIds)
        }
        else {

            setIds(ids.filter((v) => {
                return v != event.target.value
            }))
        }
    }

    useEffect(() => {
        getSubSubCategories()
    }, [parentCategory, subCategory, sub_subcatName, currentPage, limit])

    return (
        <div>
            <section className='w-full'>
                <div className='border-b-2 text-gray-300'></div>
                <div className='py-3'>
                    <nav className='mt-1'>
                        <ul className='flex items-center'>
                            <li> <Link to={'/dashboard'}><span className='font-bold text-gray-800'>Home </span> </Link> </li>&nbsp;
                            <li> <Link to={'/user'}><span className='font-bold text-gray-800'>/&nbsp;Sub Sub Category</span> </Link> </li>
                            <li> <span className='font-bold text-gray-800'>/&nbsp;View</span></li>
                        </ul>

                    </nav>
                </div>
                <div className='border-b-2 text-gray-300'></div>
                <div className='w-full min-h-[620px]'>
                    <div className='max-w-[1220px] mx-auto py-5'>

                        <HeaderSubCategory module={module} linkName={linkName} ids={ids}
                            setIds={setIds} getData={getSubSubCategories} parentCategory={parentCategory}
                            subCategory={subCategory} sub_subcatName={sub_subcatName} setParentCategory={setParentCategory}
                            setSubCategory={setSubCategory} setSub_SubcatName={setSub_SubcatName} setLimit={setLimit}
                        />
                        <div className='border border-slate-400 border-t-0 rounded-b-md'>

                            <div className='overflow-x-auto'>

                                <table className='w-full text-gray-500'>
                                    <thead className='text-gray-900 text-[12px] uppercase bg-gray-50'>
                                        <tr>
                                            <th>
                                                <SelectCheckbox ids={ids} setIds={setIds} list={subsubcatList} selectAll={selectAll} setSelectAll={setSelectAll} />
                                            </th>
                                            <th scope='col' className='px-6 py-3'>SR. No</th>
                                            <th scope='col' className='px-6 py-3'>Parent Category</th>
                                            <th scope='col' className='px-6 py-3'>Sub Category</th>
                                            <th scope='col' className='px-6 py-3'>Category Name</th>
                                            <th scope='col' className='w-[12%]'>Image</th>
                                            <th scope='col' className='w-[15%]'>Order No</th>
                                            <th scope='col' className='w-[11%]'>Status</th>
                                            <th scope='col' className='w[6%]'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {

                                            subsubcatList.map((items, index) => {
                                                return (


                                                    <tr className='bg-white hover:bg-gray-50'>
                                                        <th className='w-4 p-4'>
                                                            <input type='checkbox' onChange={checkedCategory} value={items._id} checked={ids.includes(items._id)} className='text-blue-600 text-sm rounded-sm w-4 h-4 border-gray-400 ' />
                                                        </th>
                                                        <th className=' py-4'>
                                                            {
                                                                (currentPage - 1) * limit + (index + 1)
                                                            }
                                                        </th>

                                                        <th scope='row' className=' text-[15px] px-6 py-4'>

                                                            {items.subCategory.parentCategory.categoryName}

                                                        </th>


                                                        <th scope='row' className=' text-[15px] px-6 py-4'>

                                                            {items.subCategory.subcategoryName}

                                                        </th>
                                                        <th scope='row' className='  text-[15px] px-6 py-4'>

                                                            {items.sub_subcatName}

                                                        </th>
                                                        <th className='px-6 py-4'>
                                                            <img src={staticPath + items.sub_subcatImage} className='mx-5 w-10 h-10 rounded-full' />
                                                        </th>
                                                        <th className='text-[15px] px-6  py-4'>{items.sub_subcatOrder}</th>

                                                        {items.sub_subcatstatus ?
                                                            <button className='text-white font-medium px-5 py-2 bg-green-700 rounded-lg focus:outline-none hover:bg-green-900'>
                                                                Active
                                                            </button>
                                                            :
                                                            <button className='text-white font-medium px-5 py-2 bg-red-700 rounded-lg focus:outline-none hover:bg-red-900'>
                                                                Deactive
                                                            </button>
                                                        }
                                                        <th className='px-2 py-4'>
                                                            <Link to={`/update-Sub-category_2/${items._id}`}>
                                                                <button className='w-[40px] relative   h-[40px] rounded-[50%] bg-blue-700 hover:bg-blue-800'>

                                                                    <FaPen className='text-white absolute left-3 bottom-3' />

                                                                </button>
                                                            </Link>

                                                        </th>
                                                    </tr>
                                                )
                                            })
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

export { View_Sub_Category_2 }