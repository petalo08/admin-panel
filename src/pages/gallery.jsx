import React from 'react'
import Layout from "../components/Layout"
import Image from 'next/image';
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
      <div className=' flex flex-col  md:pl-2 lg:pl-40 xl:pl-60 '>
       
        
        <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className='flex justify-end  py-4'>
        <button className='p-2 bg-red-300 cursor-pointer rounded-md text-white'>Upload Image</button>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden transform transition-all ease-out duration-500 hover:scale-105 rounded-md" 
          >
            <Image
              src={image}
              alt={`Image ${index}`}
              width={800}
              height={800}
            />
          </div>
        ))}
      </div>
    </div>
      </div>
     </Layout>
  )
}

export default gallery