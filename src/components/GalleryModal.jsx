import React, { useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';

export default function Modal({ visible, onClose }) {
  const handelOnClose = () => {};
  const [image, setImage] = useState(null);
  const [altText, setAltText] = useState("");
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.webp|\.svg)$/i;

    if (!allowedExtensions.exec(file.name)) {
      alert("Error: Please choose a file with a valid image format (jpg, jpeg, png, webp, svg).");
      event.target.value = "";
      return;
    }

    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
  };
  
  if (!visible) return null;
  return (
    <div
      onClick={handelOnClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-white p-2 rounded w-full sm:w-96">
        <div className="flex  justify-between items-center mb-5">
            <div className="w-full">
            <h1 className="font-semibold text-center text-xl text-gray-700 underline underline-offset-2">
            Add new Image
          </h1>
            </div>
          
         <div>
         <button
            onClick={onClose}
            className="p-2 rounded-full hover:text-red-500 border border-gray-500 hover:border-red-500 text-gray-500"
          >
            <AiOutlineClose/>
          </button>
         </div>
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="image-upload" className="mb-3">
            Upload Image:
          </label>
          <input
            id="image-upload"
            type="file"
            accept=".jpg, .jpeg, .png, .webp, .svg"
            onChange={handleImageUpload}
            className="border border-gray-700 p-2 rounded mb-3"
          />
          {image && (
            <img src={image} alt="Uploaded Image" className="w-full mb-3" />
          )}
          <input
            type="text"
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
            className="border border-gray-700 p-2 rounded mb-3"
            placeholder="Alternative Text"
          />
        </div>
        <div className="text-center">
          <button className="px-5 py-2 bg-gray-700 text-white rounded">
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
}
