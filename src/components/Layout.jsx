import React from 'react'
import Sidebar from './Sidebar'
const Layout = ( {children}) => {
  return (
    <div className='h-screen flex flex-row justify-start '>
        <Sidebar />
        <div className='bg-gray-200 flex-1 py-4 px-64 text-black'>
          {children}
        </div>
    </div>
  )
}

export default Layout