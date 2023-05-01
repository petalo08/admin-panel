import React,{useState} from 'react'

import { FaSearch, FaTrashAlt, FaEdit } from "react-icons/fa";

import Layout from "../components/Layout"
function TeamMembers() {

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);


  const data = [
    { sNo: 1, name: "John", serviceName: "Service 1", date: "b-101" },
    { sNo: 2, name: "Mary", serviceName: "Service 2", date: "b-101" },
    { sNo: 3, name: "Bob", serviceName: "Service 3", date: "b-101" },
    { sNo: 4, name: "Alice", serviceName: "Service 4", date: "b-101" },
    { sNo: 5, name: "Jane", serviceName: "Service 5", date: "b-101" },
  ];

  const handleViewClick = (row) => {
    setSelectedRow(row);
    setShowModal(true);
  };

  // const handleDeleteClick = (row) => {
  //   setData(data.filter((r) => r.sNo !== row.sNo));
  // };

  const handleEditClick = (row) => {
    // implement your edit functionality here
    console.log("Edit row: ", row);
  };



  
  return (

  

    <Layout>
        <div className=' flex flex-col md:pl-2 lg:pl-40 xl:pl-60 ' >

        <div className="flex justify-between gap-2 items-center    px-48">
           
           <div className='flex flex-row justify-between py-3'>
           <div className='flex flex-row justify-between gap-2 ' >
           <input
               type="text"
            placeholder="Search..."
                   className=" px-4 py-2 w-96 outline-1 bg-green-200 text-black focus:outline-black rounded-md tracking-wide"
              />
           <div className=" bg-red-400 p-4  rounded-full cursor-pointer">
              <FaSearch className="text-white " />
              </div>
           </div>
            </div>
            <button className='p-2 bg-red-400 rounded-md cursor-pointer hover:ease-in text-white'>Add Members</button>
           </div>
           

                       {/* {table } */}
                       <div className="bg-red-200 p-4 px-20 text-center flex flex-col gap-10 ">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Position</th>
                <th>Flat number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.sNo}>
                  <td>{row.sNo}</td>
                  <td>{row.name}</td>
                  <td>{row.serviceName}</td>
                  <td>{row.date}</td>
                  <td className='flex justify-evenly'>
                    <FaTrashAlt
                      className="hover:text-red-500 hover:ease-out  rounded-md cursor-pointer"
                      // onClick={() => handleDeleteClick(row)}
                    />
                    <span> / </span>
                    <FaEdit
                      className="hover:text-blue-500 hover:ease-out rounded-md cursor-pointer"
                      onClick={() => handleEditClick(row)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


      {showModal && (
        <div className="modal ">
          <div className="modal-content flex flex-col gap-4 items-center">
            <h2 className='bg-white p-2 rounded-md'>View Row</h2>
            <form className='flex text-center items-center'>
              <label>
                S.No:
                <input className='p-2 rounded-md ' type="text" value={selectedRow.sNo} readOnly />
              </label>
              <label>
                Name:
                <input className='p-2 rounded-md ' type="text" value={selectedRow.name} readOnly />
              </label>
              <label>
                Service Name:
                <input className='p-2 rounded-md ' type="text" value={selectedRow.serviceName} readOnly />
              </label>
              <label className='p-2'>
                Date:
                <input className='p-2 rounded-md '
                type="text" value={selectedRow.date} readOnly />
              </label>
              <button className='bg-white p-2 rounded-md hover:bg-slate-200'
              onClick={() => setShowModal(false)}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>

                       
             
        </div>
         </Layout>
  )
}

export default TeamMembers