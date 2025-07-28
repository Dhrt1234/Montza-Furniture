import React, { useContext, useEffect } from 'react'
import { HiBars3 } from "react-icons/hi2";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { FaCircleUser } from "react-icons/fa6";
import { RiProfileFill } from "react-icons/ri";
import { loginContext } from '../Context/MainContext';

export default function Header() {

  const navigate = useNavigate();
  let { adminID, setAdminID } = useContext(loginContext)


  useEffect(() => {

    if(adminID == ''){
      navigate('/') //login page
    }
  }, [adminID])

  
  return (
    <div>
      <header>




        <nav class="border-gray-200  dark:bg-gray-800 dark:border-gray-700">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
              {/*  <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" /> */}
              <HiBars3 className='text-3xl h-8' />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Dashboard</span>
            </a>
            <div className="group relative  z-50">
              <img
                src="../images/User_Profile.jpeg"
                className="rounded-full w-11 h-11 object-cover"
                alt=""
              />
              <div className="hidden group-hover:block absolute top-[45px] left-[-150px] bg-[#fff] shadow-md border rounded-[10px] z-50">
                <ul>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 font-[500] py-1 pl-3 hover:bg-[#F1F4F5] hover:text-[blue] rounded-[10px_10px_0_0]"
                  >
                    <FaCircleUser /> Profile
                  </Link>
                  <hr className="border-[#00000076]" />
                  <Link
                    to="/company_profile"
                    className="flex items-center gap-2 font-[500] py-1 pl-3 pr-5 hover:bg-[#F1F4F5] hover:text-[blue]"
                  >
                    <RiProfileFill />
                    Company Profile
                  </Link>
                  <hr />
                  <button onClick={() => setAdminID('')} className="flex items-center gap-2 font-[500] py-1 pl-3 pr-5 hover:bg-[#F1F4F5] hover:text-[blue] cursor-pointer rounded-[0px_0px_10px_10px]">
                    <FaLock />
                    LogOut
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </nav>


      </header>

    </div>
  )
}
