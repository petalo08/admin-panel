import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import GalleryModal from "../components/GalleryModal";
import { getGalleryById, updateGalleryById } from "../api/gallery";
import BaseLayout from '../layout/BaseLayout';

function Commercials() {

  const [showMyModal, setShowMyModal] = useState(false);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const handleOnClose = () => setShowMyModal(false);

  const handleOnChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFetchGalleryData = async () => {
    try {
      const res = await getGalleryById();
      console.log(res.data.data)
      if (res.data) {
        setDescription(res.data.data.description);
        setImages(res.data.data.images);
      }
    } catch (err) {
      console.log(err)
    }
  };

  const handleUpdateGallery = async () => {
    try {
      let body = {
        description: description,
      };
      const res = await updateGalleryById(body);
      if (res.status === 200) {
        alert("Updated successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleFetchGalleryData();
  }, []);



  return (
    <BaseLayout>
      <div className="flex flex-col md:pl-2 lg:pl-40 xl:pl-60">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-2">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search images"
                className="px-3 py-2 text-gray-700 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 transition-colors w-full sm:w-96 bg-gray-100"
              />
              <button className="ml-2 p-2 bg-red-300 cursor-pointer rounded-md text-white">
                <FiSearch className="h-6 w-6" />
              </button>
            </div>
            <button
              onClick={() => setShowMyModal(true)}
              className="p-2 bg-red-300 cursor-pointer rounded-md text-white"
            >
              Upload Image
            </button>
          </div>
          {/* {description } */}
          <div className="container mx-auto px-4 lg:px-8 py-16 flex flex-col md:flex-row justify-between items-center">
            <input
              type="text"
              placeholder="Add description"
              value={description}
              onChange={handleOnChange}
              className="w-full py-2 px-4 h-20 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 transition-colors"
            />
            <div className="w-full md:w-1/3 lg:w-1/2 xl:w-1/3 flex justify-center md:justify-end mt-4 md:mt-0">
              <button
                onClick={() => handleUpdateGallery()}
                className="px-4 py-2 h-14 bg-red-300 text-white rounded-md"
              >
                Update Description
              </button>
            </div>
          </div>
          {/* { Gallery images} */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden transform transition-all ease-out duration-500 hover:scale-105 rounded-md"
              >
                {console.log(image)}
                <Image
                  src={image?.url?.publicUrl}
                  alt={image?.altText}
                  width={800}
                  height={800}
                />
              </div>
            ))}
          </div>
        </div>

        <GalleryModal onClose={handleOnClose} visible={showMyModal} />
      </div>
    </BaseLayout>
  )
}

export default Commercials

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const token = req.cookies.authToken;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }
  const user = JSON.parse(req.cookies.user)
  if (user.role == "user") {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    }
  }
  return {
    props: {},
  };
}