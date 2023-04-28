import React from 'react'
import Sidebar from './Sidebar'
import Header from "./Header"
const Layout = ( {children}) => {
  return (
   <div className=' flex flex-row '>
        <div> <Sidebar/></div>
         <div className='flex flex-col flex-1 '> 
         <div><Header/></div>
          <div className='p-2 m'>{children}</div>
        </div>
   </div>
    
  )
}

export default Layout