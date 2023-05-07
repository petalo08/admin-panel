import React, { useEffect, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import { supabase } from "../utils/supabaseClient";
import { getGalleryById, updateGalleryById } from "../api/gallery";
import { useToast } from "@chakra-ui/react";

export default function Modal({ visible, onClose }) {

  const handelOnClose = () => { }
  const toast = useToast()
  const [image, setImage] = useState(null)
  const [images, setImages] = useState([])
  const [fl, setFl] = useState(null)
  const [altText, setAltText] = useState("")

  const handleFetchGalleryData = async () => {
    try {
      const res = await getGalleryById()
      if (res.data) {
        setImages(res.data.data.images)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleUpdateGallery = async () => {
    try {
      let body = {
        images: images
      }
      const res = await updateGalleryById(body)
      if (res.status === 200) {
        alert("Updated successfully")
      }
    }
    catch (err) {
      console.error(err)
    }
  }

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
    setFl(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!fl) return

    const path = `gallery/${fl.name}`
    const { data, error } = await supabase.storage.from('images').upload(path, fl)

    if (error) {
      console.error(error)
    } else {
      console.log('File uploaded successfully:', data)
      const { data: url, error: err } = supabase.storage.from('images').getPublicUrl(path)
      if (err) {
        console.error(err)
        return
      }
      const newImage = {
        url: url.publicUrl,
        alt: altText
      }
      setImages([...images, newImage])
      setImage(null)
      setFl(null)
      setAltText("")
      const res2 = await updateGalleryById({ images: [...images, newImage] })
      if (res2.status === 200) {
        console.log("Updated successfully")
        toast({
          title: "Image uploaded successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }
  useEffect(() => {
    handleFetchGalleryData()
  }, [])
  if (!visible) return null;

  return (
    <div
      onClick={handelOnClose}
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
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
              <AiOutlineClose />
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
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-gray-700 text-white rounded">
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
}
