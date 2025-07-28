import React, { useEffect } from 'react'

export default function SelectCheckbox({ ids, setIds, list, selectAll, setSelectAll }) {
     console.log("check page ids", ids)
    console.log("check page list", list)
    console.log("check page selectAll", selectAll)
    console.log("checkpage setSelectAll", setSelectAll)

    let handleAll = (event) => {
            if (event.target.checked) {
 
                let allIds = list.map((items) => items._id)
                setIds(allIds)
            }
            else {
                setIds([])
            }
        }
        useEffect(() => {
            if (list.length > 1) {
                if (list.length == ids.length) {
                    setSelectAll(true)
                }
                else {
                    setSelectAll(false)
                }
            }
    
        }, [ids])
  return (
    <div> <input type='checkbox' onChange={handleAll}
            checked={selectAll}

            className='text-blue-600 text-sm rounded-sm w-4 h-4 border-gray-400 ' /></div>
  )
}
