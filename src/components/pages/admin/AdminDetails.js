import React from "react";
import Image from "next/image";
const AdminDetails = () => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row">
      {/* First Div */}
      <div className="flex flex-col md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
        <div className="flex flex-col items-center justify-center mb-4">
          <img
            src="data:image/jpeg;base64,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" // Replace with the actual image path
            alt="User Image"
            className="w-40 h-40 rounded-full mb-2"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            Upload Image
          </button>
        </div>
      </div>

      {/* Second Div */}
      <div className="flex flex-col md:w-1/2 lg:w-1/2 xl:w-1/2 p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <label htmlFor="name" className="w-24 font-medium">
              Name:
            </label>
            <input
              id="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button className="px-4 py-2 ml-2 bg-green-500 text-white rounded-md">
              Update
            </button>
          </div>

          <div className="flex items-center">
            <label htmlFor="email" className="w-24 font-medium">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button className="px-4 py-2 ml-2 bg-green-500 text-white rounded-md">
              Update
            </button>
          </div>

          <div className="flex items-center">
            <label htmlFor="phone" className="w-24 font-medium">
              Phone:
            </label>
            <input
              id="phone"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button className="px-4 py-2 ml-2 bg-green-500 text-white rounded-md">
              Update
            </button>
          </div>

          <div className="flex items-center">
            <label htmlFor="role" className="w-24 font-medium">
              Role:
            </label>
            <input
              id="role"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button className="px-4 py-2 ml-2 bg-green-500 text-white rounded-md">
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetails;
