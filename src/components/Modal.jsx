import React from "react";

export default function Modal({visible, onClose}) {

    const handelOnClose = () => {  }; 
    if (!visible) return null ; 
  return (
    <div 
    onClick={handelOnClose}
    className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-2 rounded w-72 ">
        <div className="flex flex-row gap-5">
        <h1 className="font-semibold text-center text-xl text-gray-700 pl-8">
          Insert a New Member
          
        </h1>
        <button onClick={onClose} className="  pl-3 rounded-full hover:text-red-500  ">X</button>
        </div>
        
        <p className="text-center text-gray-700 mb-5">Member Details</p>
        

        <div className="flex flex-col">
          <input
            type="text"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder="Name of the member"
          />
          <input
            type="text"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder="position"
          />
           <input
            type="text"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder="flat number"
          />
        </div>
        <div className="text-center">
          <button className="px-5 py-2 bg-gray-700 text-white rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}