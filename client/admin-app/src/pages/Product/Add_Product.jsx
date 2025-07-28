import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useEffect } from "react";
import $ from "jquery";
import "dropify/dist/js/dropify.min.js";
import "dropify/dist/css/dropify.min.css";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'

export function MyEditor({ name, data, onChangeData }) {
  // const [value, setValue] = useState("");
console.log("data",data);
console.log("func",onChangeData);

  return (
    <div>
      {/* <ReactQuill value={value} onChange={setValue} /> */}
      <ReactQuill value={data} onChange={onChangeData} />

      {/* Hidden input to store the value */}
      <input type="hidden" name={name} value={data} />
    </div>
  );
}
export default function Add_Product() {


    let { id } = useParams();
    console.log("id for update", id)
   /*  const quillRef = useRef();
 */
    let pImage = import.meta.env.VITE_PIMAGE
    let [preview, setPreview] = useState(pImage)
    let [preview2, set2Preview] = useState(pImage)
    let [preview3, set3Preview] = useState([])
    let [parentCatList, setParentCatList] = useState([])
    let [subCatList, setSubCatList] = useState([])
    let [subSubCatList, setSubSubCatList] = useState([])
    let [colorList, setColorList] = useState([])
    let [meterialList, setMeterialList] = useState([])
    let [loading1, setLoading1] = useState(true);
    let [loading2, setLoading2] = useState(true);

    let apiBaseUrl = import.meta.env.VITE_APIBASEURL //http://localhost:8000/admin/
    const navigate = useNavigate();

    let [imagepath, setImagepath] = useState('')
    let [getSingleProduct, setgetSingleProduct] = useState({
        productName: "",
        parentCategory: "",
        subCategory: "",
        subSubCategory: "",
        productMeterial: [],
        productColor: [],
        productType: "",
        productbestSelling: "",
        productTopRated: "",
        productUpsell: "",
        productActualPrice: "",
        productsalePrice: "",
        productStocks: "",
        productOrder: "",
        productDescription: ""
    })
    let getParentcategory = () => {
        axios.get(`${apiBaseUrl}product/parent-category`)
            .then((res) => res.data)
            .then((finalRes) => {
                setParentCatList(finalRes.data)
            })
    }

    let getColor = () => {
        axios.get(`${apiBaseUrl}product/product-color`)
            .then((res) => res.data)
            .then((finalRes) => {
                setColorList(finalRes.data)
            })
    }

    let getMeterial = () => {
        axios.get(`${apiBaseUrl}product/product-meterial`)
            .then((res) => res.data)
            .then((finalRes) => {
              console.log("m set",  setMeterialList(finalRes.data));
            })
    }


    let getSubcategory = (id) => {
        axios.get(`${apiBaseUrl}product/sub-category/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                setSubCatList(finalRes.data)
                setLoading1(false)
            })
    }
    let getSub_Subcategory = (id) => {

        axios.get(`${apiBaseUrl}product/sub_subcategory/${id}`)
            .then((res) => res.data)
            .then((finalRes) => {
                console.log(finalRes.data)
                setSubSubCatList(finalRes.data)
                setLoading2(false)
            })
    }


    useEffect(() => {

        getParentcategory()
        getColor()
        getMeterial()
    }, [])



    let productSave = (e) => {

        e.preventDefault()
        let formValue = new FormData(e.target)  //Form tag
        if (id) {

            alert(id)
            axios.put(`${apiBaseUrl}product/update/${id}`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        console.log(finalRes)
                        toast.success(finalRes.msg)
                        //    e.target.reset()
                        setPreview(pImage)
                        set2Preview(pImage)
                        set3Preview([])
                        setTimeout(() => {
                            navigate('/view-product')

                        }, 3000)
                    }
                    else {
                        toast.error(finalRes.msg)
                    }
                })
        }
        else {
            axios.post(`${apiBaseUrl}product/insert`, formValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        console.log(finalRes)
                        toast.success(finalRes.msg)
                        //    e.target.reset()
                        setPreview(pImage)
                        set2Preview(pImage)
                        set3Preview([])
                        setTimeout(() => {
                            navigate('/view-product')

                        }, 3000)
                    }
                    else {
                        toast.error(finalRes.msg)
                    }
                })
        }

    }


    useEffect(() => {
        setgetSingleProduct({
            productName: "",
            parentCategory: "",
            subCategory: "",
            subSubCategory: "",
            productMeterial: [],
            productColor: [],
            productType: "",
            productbestSelling: "",
            productTopRated: "",
            productUpsell: "",
            productActualPrice: "",
            productsalePrice: "",
            productStocks: "",
            productOrder: ""

        });
        setPreview(pImage);
        set2Preview(pImage);
        set3Preview([]);
        setImagepath('');


        if (id) {
            axios.get(`${apiBaseUrl}product/view/${id}`)
                .then((res) => res.data)
                .then((finalRes) => {
                    console.log("single data", finalRes.data)
                    getSubcategory(finalRes.data.parentCategory._id)
                    getSub_Subcategory(finalRes.data.subCategory._id)
                    setgetSingleProduct({
                        productName: finalRes.data.productName,
                        parentCategory: finalRes.data.parentCategory._id,
                        subCategory: finalRes.data.subCategory._id,
                        subSubCategory: finalRes.data.subSubCategory._id,
                        productMeterial: finalRes.data.productMeterial,
                        productColor: finalRes.data.productColor,
                        productType: finalRes.data.productType,
                        productbestSelling: finalRes.data.productbestSelling,
                        productTopRated: finalRes.data.productTopRated,
                        productUpsell: finalRes.data.productUpsell,
                        productActualPrice: finalRes.data.productActualPrice,
                        productsalePrice: finalRes.data.productsalePrice,
                        productStocks: finalRes.data.productStocks,
                        productOrder: finalRes.data.productOrder,
                        productDescription: finalRes.data.productDescription
                    });
                    setPreview(finalRes.staticPath + finalRes.data.productImage);
                    set2Preview(finalRes.staticPath + finalRes.data.productBackimage);
                    set3Preview(finalRes.data.productGallery);
                    console.log("lemgth", preview3.length);
                    setImagepath(finalRes.staticPath);
                    /*      finalRes.data.productGallery.map((img, index) => {
                             const galleryImage=finalRes.staticPath + img
                             console.log("galleryImage",galleryImage);
                             set3Preview([...preview3, ...galleryImage]);
                             console.log("lemgth",preview3.length);
                         })*/

                    // console.log("set3Preview",set3Preview);

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
                            <li> <Link to={'/add-product'}><span className='font-bold text-gray-800'>/&nbsp; Product</span> </Link> </li>
                            <li> <span className='font-bold text-gray-800'>/ &nbsp; {id ? "Update " : " Add "}</span></li>
                        </ul>

                    </nav>
                </div>
                <div className='border-b-2 text-gray-300'></div>
                <div className='w-full min-h-[620px]'>
                    <div className='max-w-[1220px] mx-auto py-5'>
                        <h3 className='text-[26px] p-2 border rounded-t-md font-semibold border-slate-400 bg-gray-200'>{id ? "Update " : " Add "} Product</h3>
                        <form onSubmit={productSave} className=' py-3 px-2 border border-t-0 rounded-b-md border-slate-400' autoComplete='off'>
                            <div className='grid grid-cols-3 gap-[10px]'>


                                <div id='images'>
                                    <div id='img-1'>
                                        <label className="mb-1">
                                            <b>Product Image</b>
                                        </label>
                                        <img src={preview} className='h-52' alt="" />
                                        <input
                                            name="productImage"
                                            type="file"
                                            onChange={(e) => {
                                                setPreview(URL.createObjectURL(e.target.files[0]))
                                            }}
                                        />

                                    </div>

                                    <div id='img-2'>
                                        <label className="mb-1">
                                            <b>Back Image</b>
                                        </label>
                                        <img src={preview2} className='h-52' alt="" />
                                        <input
                                            name="productBackimage"
                                            type="file"
                                            onChange={(e) => { /*e.target.files[0]-->  this Object holds a reference to the file on disk */
                                                set2Preview(URL.createObjectURL(e.target.files[0])) /* this points to the File object we just created */
                                            }}
                                        />


                                    </div>
                                    <div id='img-3'>
                                        <label className="mb-1">
                                            <b>Gallery Image</b>
                                        </label>
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            {console.log("size", preview3.length)}
                                            {

                                                preview3.map((img, index) => (
                                                    <div key={index} className="relative">

                                                        <img src={imagepath + img} className='h-32 w-full object-cover' alt={`Gallery ${index + 1}`} />

                                                    </div>
                                                ))

                                            }
                                        </div>
                                        {<input
                                            name="productGallery"
                                            type="file"
                                            multiple
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files);
                                                const newPreviews = files.map(file => URL.createObjectURL(file));
                                                set3Preview([...preview3, ...newPreviews]);
                                            }}
                                        />}
                                    </div>

                                </div>
                                <div id='middle'>

                                    <div className='mb-5 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Product Name </label>
                                        <input type='name' name='productName' id='pro_id' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
                                         border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Product Name'
                                            value={getSingleProduct.productName}
                                            onChange={(e) => {
                                                let obj = { ...getSingleProduct }
                                                obj['productName'] = e.target.value
                                                setgetSingleProduct(obj)
                                            }}
                                        />
                                    </div>

                                    <div className='mb-5 p-1'>
                                        <label for="order" className='p-1 block font-medium text-gray-900'>Select Sub Category</label>
                                        <select name='subCategory' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                             border-gray-400 w-full rounded-lg focus:border-blue-500'
                                            onChange={(e) => getSub_Subcategory(e.target.value)}
                                        >
                                            {loading1 ?
                                                <option value="">Loading</option>
                                                :
                                                subCatList.length === 0 ?
                                                    <option value="">No SubCategory Found</option>
                                                    :
                                                    subCatList.map((items, index) => <option key={index}
                                                        value={items._id}
                                                        selected={items._id == getSingleProduct.subCategory}>
                                                        {items.subcategoryName}
                                                    </option>)
                                            }
                                        </select>
                                    </div>
                                    <div className='mb-5 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Select Material </label>
                                        <select multiple name='productMeterial[]' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                             border-gray-400 w-full rounded-lg focus:border-blue-500'>
                                            <option>Select Material</option>
                                            {
                                                meterialList.map((items, index) => {

                                                    let materialselected =
                                                        getSingleProduct.productMeterial.map((material) => material._id)
                                                    return (
                                                        <option key={index} value={items._id}
                                                            selected={materialselected.includes(items._id)}
                                                        >
                                                            {items.materialName}
                                                        </option>
                                                    )

                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className='mb-5 p-1'>
                                        <label for="order" className='p-1 block font-medium text-gray-900'>Select Product Type</label>
                                        <select name='productType' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                             border-gray-400 w-full rounded-lg focus:border-blue-500'

                                        >
                                            <option>Select Product Type</option>
                                            <option value='1' selected={getSingleProduct.productType == 1}>Featured</option>
                                            <option value='2' selected={getSingleProduct.productType == 2}>New Arrival</option>
                                            <option value='3' selected={getSingleProduct.productType == 3}>OnSale</option>

                                        </select>
                                    </div>

                                    <div className='mb-5 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Is Top Rated </label>
                                        <select name='productTopRated' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                             border-gray-400 w-full rounded-lg focus:border-blue-500'>
                                            <option>Nothing Selected</option>
                                            <option value='true' selected={getSingleProduct.productTopRated == true}>Yes</option>

                                            <option value='false' selected={getSingleProduct.productTopRated == false}>No</option>

                                        </select>
                                    </div>

                                    <div className='mb-5 p-1'>
                                        <label for="price" className='p-1 block font-medium text-gray-900'>Actual Price</label>
                                        <input type='number' name='productActualPrice' id='actual_price' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
                                     border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Actual Price'
                                            value={getSingleProduct.productActualPrice}

                                            onChange={(e) => {
                                                let obj = { ...getSingleProduct }
                                                obj['productActualPrice'] = e.target.value
                                                setgetSingleProduct(obj)
                                            }}

                                        />
                                    </div>
                                    <div className='mb-5 p-1'>
                                        <label for="order" className='p-1 block font-medium text-gray-900'>Total In stocks</label>
                                        <input type='number' name='productStocks' id='stocks' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
                                     border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Total In stocks'
                                            value={getSingleProduct.productStocks}
                                            onChange={(e) => {
                                                let obj = { ...getSingleProduct }
                                                obj['productStocks'] = e.target.value
                                                setgetSingleProduct(obj)
                                            }}
                                        />
                                    </div>
                                </div>
                                <div id='right'>

                                    <div className='mb-5 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Select Parent Category  </label>
                                        <select name='parentCategory' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                             border-gray-400 w-full rounded-lg focus:border-blue-500'
                                            onChange={(e) => getSubcategory(e.target.value)}
                                        >
                                            <option>Parent Category</option>
                                            {
                                                parentCatList.map((items, index) => <option key={index}
                                                    value={items._id}
                                                    selected={items._id == getSingleProduct.parentCategory}
                                                >
                                                    {items.categoryName}
                                                </option>)
                                            }
                                        </select>
                                    </div>

                                    <div className='mb-5 p-1'>
                                        <label for="order" className='p-1 block font-medium text-gray-900'>Select Sub Sub Category</label>
                                        <select name='subSubCategory' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                             border-gray-400 w-full rounded-lg focus:border-blue-500'>

                                            {loading2 ?
                                                <option>Loading...</option>
                                                :
                                                subSubCatList.length === 0 ?
                                                    <option>No Sub Subcategory Found</option>
                                                    :
                                                    subSubCatList.map((items, index) => <option key={index}
                                                        value={items._id}
                                                        selected={items._id == getSingleProduct.subSubCategory}
                                                    >
                                                        {items.sub_subcatName}
                                                    </option>)


                                            }
                                        </select>
                                    </div>
                                    <div className='mb-5 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Select Colour</label>
                                        <select multiple name='productColor[]' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                             border-gray-400 w-full rounded-lg focus:border-blue-500'>
                                            <option>Select Colour</option>
                                            {
                                                colorList.map((items, index) => {
                                                    let isSelected =
                                                        getSingleProduct.productColor.map((colors) => colors._id)

                                                    return (
                                                        <option key={index}
                                                            value={items._id}
                                                            selected={isSelected.includes(items._id)} /* here  selected is coditiin and  here isSelected is array of single product colour ids. so if items._id is included in isSelected array then that items._id is selected otherwise we can check next items._id with isSelected array.  */
                                                        >

                                                            {items.colorName} </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className='mb-5 p-1'>
                                        <label for="order" className='p-1 block font-medium text-gray-900'>Is Best Selling</label>
                                        <select name='productbestSelling' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                             border-gray-400 w-full rounded-lg focus:border-blue-500'>
                                            <option>Nothing Selected</option>
                                            <option value='true' selected={getSingleProduct.productbestSelling == true}>Yes</option>
                                            <option value='false' selected={getSingleProduct.productbestSelling == false}>No</option>
                                        </select>
                                    </div>

                                    <div className='mb-5 p-1'>
                                        <label for="name" className='p-1 block font-medium text-gray-900'>Is UpSell </label>
                                        <select name='productUpsell' className='text-[20px] border-2 py-2 px-2 block shadow-md
                                                             border-gray-400 w-full rounded-lg focus:border-blue-500'>
                                            <option>Nothing Selected</option>
                                            <option value='true' selected={getSingleProduct.productUpsell == true}>Yes</option>
                                            <option value='false' selected={getSingleProduct.productUpsell == false}>No</option>
                                        </select>
                                    </div>

                                    <div className='mb-5 p-1'>
                                        <label for="price" className='p-1 block font-medium text-gray-900'>Sale Price</label>
                                        <input type='number' name='productsalePrice' id='s_price' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
 border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Sale Price'
                                            value={getSingleProduct.productsalePrice}
                                            onChange={(e) => {
                                                let obj = { ...getSingleProduct }
                                                obj['productsalePrice'] = e.target.value
                                                setgetSingleProduct(obj)
                                            }}

                                        />
                                    </div>
                                    <div className='mb-5 p-1'>
                                        <label for="order" className='p-1 block font-medium text-gray-900'>Order</label>
                                        <input type='number' name='productOrder' id='productOrder' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
 border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Order'
                                            value={getSingleProduct.productOrder}

                                            onChange={(e) => {
                                                let obj = { ...getSingleProduct }
                                                obj['productOrder'] = e.target.value
                                                setgetSingleProduct(obj)
                                            }}
                                        />
                                    </div>
                                </div>

                                {/*  <div className="mt-5 h-[200px]">
                                    <ReactQuill theme="snow" className="" />
                                </div> */}

                            </div>
                            <div className="mt-5 h-[200px]">
                                {/* productDescription */}
                                {/* <ReactQuill theme="snow" ref={quillRef} className="" /> */}
                               <MyEditor name="productDescription"
              data={getSingleProduct.productDescription}
              onChangeData={(e) => {
                let obj = { ...getSingleProduct }
                obj['productDescription'] = e
                setgetSingleProduct(obj)
                console.log(obj);
              }}
            />
                            </div>
                            {/*   <div className='my-5'>
                                <label htmlFor="" className='text-[16px] font-semibold'>Description</label>


                                <textarea name="productDescription" className='w-[100%] h-[250px] border-2' id=""
                                    value={getSingleProduct.productDescription}
                                    onChange={(event) => {
                                        let obj = { ...getSingleProduct }
                                        obj['productDescription'] = event.target.value
                                        setgetSingleProduct(obj)
                                    }}

                                ></textarea>
                            </div> */}
                            <button className='text-white bg-purple-500 hover:bg-purple-700 font-medium rounded-lg py-3 px-2 my-3 mx-1.5'>
                                {id ? "Update " : " Add "} Product

                            </button>
                        </form>
                    </div>

                </div>


            </section>

        </div>
    )
}
export { Add_Product }