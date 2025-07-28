import React, { useEffect } from 'react'
import { Link } from 'react-router'
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useState } from 'react'
import axios from 'axios';
import SelectCheckbox from '../../common/SelectCheckbox';
import TableHeader from '../../common/TableHeader';
export default function View_Product() {


let module="product";
 const linkName = "View Product";
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL //http://localhost:8000/admin/
  let [productList, setProductList] = useState([])
  let [imagePath, setImagepath] = useState('')
  let [viewProduct, setviewProduct] = useState(null)
  let [singleproductData, setSingleproductData] = useState(false)
  let [ids, setIds] = useState([])
  
      let [selectAll, setSelectAll] = useState(false)

  let getProduct = () => {
    axios.get(`${apiBaseUrl}product/view/`, {

    })
      .then((res) => res.data)
      .then((finalRes) => {
        setProductList(finalRes.data)
        setImagepath(finalRes.staticPath)

      })
  }

  useEffect(() => {
    getProduct()
  }, [])

  let getsingleProducts = (id) => {
    axios.get(`${apiBaseUrl}product/view/${id}`, {

    })
      .then((res) => res.data)
      .then((finalRes) => {

        if (finalRes.status) {
          console.log("single", finalRes.data)
          setSingleproductData(finalRes.data)
          setviewProduct(true)
        }



      })
  }
  let checkedProduct = (event) => {
  
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

  return (
    <div>
      {/* <div className={`w-full max-h-full fixed left-0 right-0 top-0 bg-gray-200 ${modelstatus ? 'block' : 'hidden'} translate-x-[-50%] translate-y-[-50%]`}>
      </div> */}
      {singleproductData &&

        <div className={` max-w-full max-h-full fixed  left-[50%] 
          top-[50%] p-4 rounded-lg bg-white duration-200 z-50  
          ${viewProduct ? '' : 'hidden'} translate-x-[-50%] translate-y-[-50%]`}>
          {/* either you can write up format div ya below format div */}

          {/* <div className={`w-[1200px] mx-auto bg-white shadow-2xl 
                rounded-xl fixed top-1/2 left-1/2   transform -translate-x-1/2 -translate-y-1/2
                 z-50 ${viewProduct ? '' : 'hidden'}`}></div> */}

          <div className='flex items-center justify-center border-b rounded-t p-6'>
            <h3 className='absolute left-5 text-[18px] font-semibold  text-red-600'>Product Image's & Price</h3>
            <span onClick={() => setviewProduct(false)}
              className='absolute right-2 text-3xl cursor-pointer'>&times;</span>
          </div>

          <div className='p-4 space-y-4'>
            <div className='grid grid-cols-[20%_43%_32%] gap-10'>
              <div className='grid grid-rows-2 gap-3 border-2 shadow-md rounded-md p-4'>
                <div>
                  <b className='text-[14px] text-red-600'>Main Image</b>
                  <img className='py-3' src={imagePath + singleproductData.productImage} />
                </div>
                <div>
                  <b className='text-[14px] text-red-600'>Back Image</b>
                  <img className='py-3' src={imagePath + singleproductData.productBackimage} />
                </div>
              </div>
              <div>
                <b className='text-[14px] text-red-600'>Gallery Images</b>
                <div className='grid grid-cols-3 gap-5 border-2 shadow-md rounded-md p-4'>
                  {singleproductData.productGallery.map((imagename) => {
                    return (

                      <img className='w-36'
                        src={imagePath + imagename}
                        alt="Gallery-iamges"
                      />
                    )
                  })


                  }
                </div>
              </div>
              <div className='border-2 shadow-md rounded-md p-1 mr-6'>
                <h3 className=' text-center font-semibold text-[18px] '>Product Details</h3>
                <ul className='mt-7 space-y-4'>
                  <li className='font-semibold text-[16px] text-red-600'>
                    Category :
                    <span className='font-semibold text-[14px] text-black capitalize'> &nbsp; {singleproductData.parentCategory.categoryName}</span>
                  </li>
                  <li className='font-semibold text-[16px] text-red-600'>
                    SubCategory :
                    <span className='font-semibold text-[14px] text-black capitalize'> &nbsp; {singleproductData.subCategory.subcategoryName}</span>
                  </li>
                  <li className='font-semibold text-[16px] text-red-600'>
                    SubSubCategory :
                    <span className='font-semibold text-[14px] text-black capitalize'> &nbsp; {singleproductData.subSubCategory.sub_subcatName}</span>
                  </li>

                  <li className='font-semibold text-[16px] text-red-600'>
                    Color : &nbsp;  &nbsp;
                    {
                      singleproductData.productColor.map(
                        (colorItems) => {
                          return (
                            <span className={`font-semibold text-[12px] px-2 py-1 mx-2 text-white rounded-md`} style={{ background: colorItems.colorName }} >
                              {colorItems.colorName} </span>
                          )
                        }
                      )
                    }

                  </li>
                  <li className='font-semibold text-[16px] text-red-600'>
                    productMeterial :
                    {
                      singleproductData.productMeterial.map(
                        (Meterial) => {
                          return (
                            <span className={`font-semibold text-[14px] text-black capitalize'`} >
                              &nbsp;   {Meterial.materialName}
                            </span>
                          )
                        }
                      )
                    }

                  </li>
                  <li className='font-semibold text-[16px] text-red-600'>
                    Price :
                    <span className='font-semibold text-[14px] text-black capitalize'> &nbsp; ₹ {singleproductData.productActualPrice}</span>
                  </li>
                  <li className='font-semibold text-[16px] text-red-600'>
                    Sale Price :
                    <span className='font-semibold text-[14px] text-black capitalize'> &nbsp; ₹ {singleproductData.productsalePrice}</span>
                  </li>
                  <li className='font-semibold text-[16px] text-red-600'>
                    Stocks:
                    <span className='font-semibold text-[14px] text-black capitalize'> &nbsp;  {singleproductData.productStocks}</span>
                  </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      }
      {viewProduct && (
        <div
          className="fixed inset-0 bg-[#525151b5] bg-opacity-50 z-40"
          onClick={() => setviewProduct(false)}
        ></div>
      )}
      <section className='w-full'>
        <div className='border-b-2 text-gray-300'></div>
        <div className='py-3'>
          <nav className='mt-1'>
            <ul className='flex items-center'>
              <li> <Link to={'/dashboard'}><span className='font-bold text-gray-800'>Home </span> </Link> </li>&nbsp;
              <li> <Link to={'/view_product'}><span className='font-bold text-gray-800'>/&nbsp;Product</span> </Link> </li>
              <li> <span className='font-bold text-gray-800'>/&nbsp;View</span></li>
            </ul>

          </nav>
        </div>
        <div className='border-b-2 text-gray-300'></div>
        <div className='w-full min-h-[620px]'>
          <div className='max-w-[1220px] mx-auto py-5'>
          <TableHeader module={module} linkName={linkName} ids={ids}
                         setIds={setIds} getData={getProduct} />
            <div className='border border-slate-400 border-t-0 rounded-b-md'>

              <div className='overflow-x-auto'>

                <table className='w-full text-gray-500'>
                  <thead className='text-gray-900 text-[12px] uppercase bg-gray-50'>
                    <tr>
                      <th>
                       <SelectCheckbox ids={ids} setIds={setIds} list={productList} selectAll={selectAll} setSelectAll={setSelectAll} />
                      </th>
                      <th scope='col' className='px-6 py-3'>S.no</th>
                      <th scope='col' className='px-6 py-3'>Product Name</th>

                      <th scope='col' className='w-[12%]'>Short Description</th>
                      <th scope='col' className='w-[15%]'>Thumbnails</th>
                      <th scope='col' className='w-[11%]'>Action</th>
                      <th scope='col' className='w[6%]'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((items, index) => {
                      return (
                        <tr key={index} className='bg-white hover:bg-gray-50'>
                          <th className='w-4 p-4'>
                            <input type='checkbox'
                            onChange={checkedProduct}
                            value={items._id}
                            checked={ids.includes(items._id)}
                             className='text-blue-600 text-sm rounded-sm w-4 h-4 border-gray-400 ' />
                          </th>
                          <th scope='row' className=' text-[15px] px-6 py-4'>


                            {index + 1}
                          </th>


                          <th scope='row' className=' text-[15px] px-6 py-4'>
                            {items.productName}

                          </th>
                          <th scope='row' className='  text-[15px] px-6 py-4'>

                            <p className='line-clamp-1 w-[180px]'>
                              {items.productDescription}
                            </p>
                            <button onClick={() => getsingleProducts(items._id)} className='text-[14px] text-blue-500'>Read More</button>



                          </th>

                          <th className='px-6 py-4'>
                            <img src={imagePath + items.productImage} className='w-16 h-16 rounded-md object-cover' />
                          </th>


                          <th className='px-6 py-4   mt-6'>
                          <Link to={`/edit-product/${items._id}`}>
                            <FaRegEdit className='text-3xl ml-7 text-yellow-500'/>
                          </Link>
                          </th>

                          <th className=' px-6 py-4'>

                            {items.productStatus
                              ?
                              <button className=' bg-gradient-to-r from-green-400 via-green-500 to-green-600 py-1.5 text-white font-semibold px-5 rounded-sm'>Active</button>
                              :
                              <button className=' bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-1.5 text-white font-semibold px-5 rounded-sm'>DeActive</button>


                            }
                          </th>

                        </tr>
                      )
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section >

    </div >


  )
}

export { View_Product }
