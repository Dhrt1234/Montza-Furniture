import React,{useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import axios from 'axios';
import { SketchPicker } from 'react-color';
import "react-color-palette/css";
import { toast, ToastContainer } from 'react-toastify';


export default function Add_Color() {


  const {id}=useParams();
    console.log(id)

  let apiBaseUrl = import.meta.env.VITE_APIBASEURL
  console.log(apiBaseUrl)

    const navigate = useNavigate();
  //let [currentId, setCurrentId] = useState(null)

  let [colorFromValue, setcolorFromValue] = useState({
    colorName: '',
    colorCode: '',
    colorOrder: ''
  })

 

  const colorChangeComplete = (newColor) => {
    let obj = { ...colorFromValue }
    obj['colorCode'] = newColor.hex;
    console.log(obj['colorCode'])
    setcolorFromValue(obj)
  };
  let colorSave = (event) => {
    event.preventDefault()
    if(id){

        //update query 
            axios.put(`${apiBaseUrl}color/update/${id}`, colorFromValue)
                .then((res) => res.data)
                .then((finalRes) => {
                    if (finalRes.status) {
                        toast.success(finalRes.msg)
                        setcolorFromValue({

                            colorName: '',
                            colorCode: '',
                            colorOrder: ''
                        })
                        
                        setTimeout(() => {
                            navigate('/view-color')
                        }, 3000)


                    }
                })

    }
    else{   axios.post(`${apiBaseUrl}color/insert`, colorFromValue)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          toast.success(finalRes.msg)
          setcolorFromValue({
            colorName: '',
            colorCode: '',
            colorOrder: ''
          })
          setTimeout(() => {
            navigate('/view-color')
          }, 3000)
        }
        else {
          toast.error(finalRes.msg)
        }
      })
    }

   
  }

   useEffect(() => {
          setcolorFromValue({
              colorName: '',
              colorCode: '',
              colorOrder: ''
          })
  
          if(id){
              axios.get(`${apiBaseUrl}color/view/${id}`)
              
              .then((res)=>res.data)
              .then((finalRes)=>{
                  console.log("get data",finalRes.data)
                  setcolorFromValue({
                      colorName:finalRes.data.colorName,
                      colorCode:finalRes.data.colorCode,
                      colorOrder:finalRes.data.colorOrder,
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
              <li> <Link to={'/add-color'}><span className='font-bold text-gray-800'>/&nbsp;Color</span> </Link> </li>
              <li> <span className='font-bold text-gray-800'>/&nbsp;{id ? "Update " : " Add "}</span></li>
            </ul>

          </nav>
        </div>
        <div className='border-b-2 text-gray-300'></div>
        <div className='w-full min-h-[620px]'>
          <div className='max-w-[1220px] mx-auto py-5'>


            <h3 className='text-[26px] p-2 border rounded-t-md font-semibold border-slate-400 bg-gray-200'>{id ? "Update " : " Add "} Color</h3>
            <form action="" onSubmit={colorSave}  className=' py-3 px-2 border border-t-0 rounded-b-md border-slate-400' autoComplete='off'>


              <div>

                <div className='mb-5 p-1'>
                  <label for="name" className='p-1 block font-medium text-gray-900'>Color Name </label>
                  <input type='name' name='colour_name' id='cname' value={colorFromValue.colorName} className='text-[20px] border-2 py-2.5 px-2 block shadow-md
                                     border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Color Name'
                    onChange={(e) => {
                      let obj = { ...colorFromValue }
                      obj['colorName'] = e.target.value
                      setcolorFromValue(obj)
                    }}

                  />
                </div>
                <div className='mb-5 p-1 w-[200px]'>

                  <SketchPicker color={colorFromValue.colorCode} onChangeComplete={colorChangeComplete} />

                </div>

                <div className='mb-5 p-1'>
                  <label for="order" className='p-1 block font-medium text-gray-900'>Order</label>
                  <input type='number' name='color_order' value={colorFromValue.colorOrder} id='corder' className='text-[20px] border-2 py-2.5 px-2 block shadow-md
                                     border-gray-400 w-full rounded-lg focus:border-blue-500' placeholder='Enter Order'
                    onChange={(e) => {
                      let obj = { ...colorFromValue }
                      obj['colorOrder'] = e.target.value
                      setcolorFromValue(obj)
                    }}

                  />
                </div>
                <button className='text-white bg-purple-500 hover:bg-purple-700 font-medium rounded-lg py-3 px-2 mx-1.5'>
                  {id ? "Update " : " Add "} Color

                </button>
              </div>


            </form>



          </div>
        </div>

      </section>







    </div>
  )
}
export { Add_Color }