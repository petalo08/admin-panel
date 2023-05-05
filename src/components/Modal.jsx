import React from "react";
import { AiOutlineClose } from 'react-icons/ai';
export default function Modal({ visible, onClose }) {
  const handelOnClose = () => {};
  if (!visible) return null;
  return (
    <div
      onClick={handelOnClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-white p-2 rounded w-full sm:w-96">
      <div className="flex  justify-between items-center mb-5">
          <div className="w-full">
            <h1 className="font-semibold text-center text-2xl text-gray-700 ">
              Add New Members
               </h1>
              </div>

             <div>
              <button
              onClick={onClose}
              className="p-1 rounded-full hover:text-red-500 border border-gray-500 hover:border-red-500 text-gray-500"
              >
              <AiOutlineClose />
            </button>
            </div>
            </div>
            <p className="text-center text-gray-700 mb-5">Member Details</p>
            <div className="flex flex-col">
            <input
            type="text"
            className="border border-gray-700 p-2 rounded mb-3"
            placeholder="Name of the member"
             />
            <input
            type="text"
            className="border border-gray-700 p-2 rounded mb-3"
            placeholder="Position"
            />
            <input
            type="text"
            className="border border-gray-700 p-2 rounded mb-5"
            placeholder="Flat number"
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
