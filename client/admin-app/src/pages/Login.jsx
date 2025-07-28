import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { loginContext } from '../Context/MainContext'
import axios from 'axios'
export default function Login() {


  let { adminID, setAdminID } = useContext(loginContext)
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  const navigate = useNavigate();
  let apiBaseUrl = import.meta.env.VITE_APIBASEURL //http://localhost:8000/admin/


  let loginAdmin = (event) => {

    let obj = {
      adminEmail: email,
      adminPassword: password
    }
    event.preventDefault()
    axios.post(`${apiBaseUrl}auth/login`, obj)
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes.status) {
          //Login
          setAdminID(finalRes.adminID)

        }
        else {
          alert(finalRes.msg)
          //Invalid userName or Password
        }
      })
  }
  useEffect(() => {
    if (adminID != "") { // here we check ki if adminID is not equal to blank then we go to dashboard means if we store local storage then whenver we goto login that redirect to dashboard page.
      navigate("/dashboard")
    }

  }, [adminID])


  return (
    <div>
      <section className='bg-gray-50'>
        <div className='flex flex-col items-center justify-center gap-4 py-[50px]'>
          <a href='#'><img src='https://www.wscubetech.com/images/wscube-tech-logo-2.svg' /></a>

          <form onSubmit={loginAdmin} class="w-[500px] bg-white rounded-lg shadow-2xl py-8 px-6">
            <div class="mb-5">
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" name='email' value={email} onChange={(event) => setEmail(event.target.value)} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
            </div>
            <div class="mb-5">
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
              <input type="password" name='password' onChange={(event) => setPassword(event.target.value)} value={password} id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            <div class="flex items-start mb-5">
              <div class="flex items-center h-5">
                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
              </div>
              <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <div className="flex justify-end mb-4">
              <Link to={'/forgot-password'} className="text-sm text-blue-600 hover:text-blue-800">Forgot password?</Link>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Submit
            </button>
          </form>
        </div>
      </section>









    </div>
  )
}
