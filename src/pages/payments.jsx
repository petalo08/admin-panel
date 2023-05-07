
import React, { useState } from 'react'

import { FaSearch, FaTrashAlt, FaEdit } from "react-icons/fa";

import BaseLayout from "../layout/BaseLayout"
function Payments() {

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const data = [
    { sNo: 1, name: "John", serviceName: "Service 1", date: "2023-05-01" },
    { sNo: 2, name: "Mary", serviceName: "Service 2", date: "2023-05-02" },
    { sNo: 3, name: "Bob", serviceName: "Service 3", date: "2023-05-03" },
    { sNo: 4, name: "Alice", serviceName: "Service 4", date: "2023-05-04" },
    { sNo: 5, name: "Jane", serviceName: "Service 5", date: "2023-05-05" },
  ];

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  return (
    <BaseLayout>
      <div className='flex flex-col w-full min-h-screen'>
  <div className="flex justify-between items-center  bg-gray-100 md:px-10 lg:px-20">
    <div className='flex flex-row justify-between py-3 w-full md:w-auto'>
      <div className='flex flex-row justify-end gap-2'>
        <input
          type="text"
          placeholder="Search..."
          className="px-2 py-1 text-xs w-full rounded-md md:text-base lg:w-96"
        />
        <div className="bg-red-400 p-2 rounded-full cursor-pointer">
          <FaSearch className="text-white" />
        </div>
      </div>
    </div>
  </div>

  <div className="flex flex-col flex-grow py-4 px-4 md:px-10 lg:px-20">
    <div className="overflow-x-auto">
      <table className='w-full table-auto'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider md:text-sm '>S.No</th>
            <th className='py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider md:text-sm'>Name</th>
            <th className='py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider md:text-sm'>Service Name</th>
            <th className='py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider md:text-sm'>Date</th>
            <th className='py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider md:text-sm'>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.sNo}>
              <td className='py-2 text-sm text-gray-500 text-center'>{row.sNo}</td>
              <td className='py-2 text-sm text-gray-500 text-center'>{row.name}</td>
              <td className='py-2 text-sm text-gray-500 text-center'>{row.serviceName}</td>
              <td className='py-2 text-sm text-gray-500 text-center'>{row.date}</td>
              <td className='py-2 text-sm text-gray-500 flex justify-evenly items-center'>
                <FaTrashAlt
                  className="hover:text-red-500 rounded-md cursor-pointer "
                  // onClick={() => handleDeleteClick(row)}
                />
                
                <button className='hover:bg-gray-300 p-2 rounded-md md:text-sm' onClick={() => handleViewClick(row)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
</div>


    </BaseLayout>
  )
}

export default Payments