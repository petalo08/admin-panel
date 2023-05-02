import React,{useState} from 'react'

import { FaSearch, FaTrashAlt, FaEdit } from "react-icons/fa";

import Layout from "../components/Layout"
import Modal from '../components/Modal';
function TeamMembers() {

  const [showMyModal, setShowMyModal] = useState(false);
  const handekOnClose = () => setShowMyModal(false);
 


  const data = [
    { sNo: 1, name: "John", serviceName: "Service 1", date: "b-101" },
    { sNo: 2, name: "Mary", serviceName: "Service 2", date: "b-101" },
    { sNo: 3, name: "Bob", serviceName: "Service 3", date: "b-101" },
    { sNo: 4, name: "Alice", serviceName: "Service 4", date: "b-101" },
    { sNo: 5, name: "Jane", serviceName: "Service 5", date: "b-101" },
  ];

 

  // const handleDeleteClick = (row) => {
  //   setData(data.filter((r) => r.sNo !== row.sNo));
  // };

  const handleEditClick = (row) => {
    // implement your edit functionality here
    console.log("Edit row: ", row);
  };



  
  return (

  

    <Layout>
    <div className="flex flex-col md:pl-2 lg:pl-40 xl:pl-60">
  
      <div className="flex justify-between items-center px-4 md:px-10 lg:px-20 py-3">
        <div className="flex flex-row justify-between gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 w-full md:w-96 outline-1 bg-green-200 text-black focus:outline-black rounded-md tracking-wide"
          />
          <div className="bg-red-400 p-4 rounded-full cursor-pointer">
            <FaSearch className="text-white" />
          </div>
        </div>
        <button
          onClick={() => setShowMyModal(true)}
          className="p-2 bg-red-400 rounded-md cursor-pointer hover:ease-in text-white"
        >
          Add Members
        </button>
      </div>
  
      {/* {table } */}
      <div className="bg-red-200 p-4 px-10 md:px-20 text-center flex flex-col gap-10">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Flat number</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.sNo}>
                <td className="px-4 py-2">{row.sNo}</td>
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2">{row.serviceName}</td>
                <td className="px-4 py-2">{row.date}</td>
                <td className="flex justify-evenly">
                  <FaTrashAlt
                    className="hover:text-red-500 hover:ease-out rounded-md cursor-pointer"
                    // onClick={() => handleDeleteClick(row)}
                  />
                  <span>/</span>
                  <FaEdit
                    className="hover:text-blue-500 hover:ease-out rounded-md cursor-pointer"
                    onClick={() => handleEditClick(row)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal onClose={handekOnClose} visible={showMyModal} />
    </div>
  </Layout>
  
  )
}

export default TeamMembers