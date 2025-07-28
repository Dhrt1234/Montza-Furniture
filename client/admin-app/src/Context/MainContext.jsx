import React, { createContext, useEffect, useState } from 'react'
export let loginContext=createContext()
export default function MainContext({children}) {

  let [adminID,setAdminID]=useState(localStorage.getItem("ADMINID") ?? '')  // here, if we get adminID from backend then store in localstorage and then pass to state (setAdminID) 

  useEffect(()=>{
    localStorage.setItem("ADMINID",adminID)// here we can store adminID in local storage when we get from backend 
  },[adminID])

  let obj={ // then this obj with adminID and setAdminID to provider
    adminID,
    setAdminID
  }

  return (
    <loginContext.Provider value={obj}> {/* // this provider give adminID value to all components of site means all pages ki this user is login . */}
        {children}
    </loginContext.Provider>
  )
}
