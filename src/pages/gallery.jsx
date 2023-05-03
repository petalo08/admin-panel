import React from 'react'
import Layout from "../components/Layout"
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';


const images = [
  "https://source.unsplash.com/random/800x800?nature",
  "https://source.unsplash.com/random/800x800?water",
  "https://source.unsplash.com/random/800x800?mountain",
  "https://source.unsplash.com/random/800x800?sky",
  "https://source.unsplash.com/random/800x800?forest",
  "https://source.unsplash.com/random/800x800?beach",
  "https://source.unsplash.com/random/800x800?flower",
  "https://source.unsplash.com/random/800x800?animal",
];


function gallery() {
  return (
    <Layout>
    <div className="flex flex-col md:pl-2 lg:pl-40 xl:pl-60">







      
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex justify-between items-center py-4 gap-2">
          <div className="flex items-center ">
            <input
              type="text"
              placeholder="Search images"
              className="px-3 py-2 text-gray-700 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 transition-colors w-96 bg-gray-100"
            />
            <button className="ml-2 p-2 bg-red-300 cursor-pointer rounded-md text-white">
              <FiSearch className="h-6 w-6" />
            </button>
          </div>
          <button className="p-2 bg-red-300 cursor-pointer rounded-md text-white">
            Upload Image
          </button>
        </div>
        {/* {description } */}
        <div className="container mx-auto px-4 lg:px-8 py-16 flex flex-row justify-between items-center">
    <input
      type="text"
      placeholder="Add description"
      className="w-full py-2 px-4 h-20 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 transition-colors"
    />
     <div className="w-full md:w-1/3 lg:w-1/2 xl:w-1/3 flex justify-center md:justify-end">
    <button className="px-4 py-2 h-14  bg-red-300 text-white rounded-md">Update Description</button>
  </div>
  </div>
 

        {/* { Gallery images} */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden transform transition-all ease-out duration-500 hover:scale-105 rounded-md"
            >
              <Image src={image} alt={`Image ${index}`} width={800} height={800} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
  
  )
}

export default gallery