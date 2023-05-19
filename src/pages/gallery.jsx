import React, { useEffect, useState } from "react"
import BaseLayout from "../layout/BaseLayout"
import GalleryModal from "../components/GalleryModal"
import { getGalleryById, updateGalleryById } from "../api/gallery"
import { Button, Img, Stack, Textarea, useToast } from "@chakra-ui/react"

function Gallery() {
  const toast = useToast()
  const [showMyModal, setShowMyModal] = useState(false)
  const [description, setDescription] = useState("")
  const [images, setImages] = useState([])
  const handleOnClose = () => setShowMyModal(false)

  const handleOnChange = (e) => {
    setDescription(e.target.value)
  }

  const handleFetchGalleryData = async () => {
    try {
      const res = await getGalleryById()
      console.log(res)
      if (res.data) {
        setDescription(res.data.data.description)
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
        description: description
      }
      const res = await updateGalleryById(body)
      if (res.status === 200) {
        toast({
          title: "Gallery Updated.",
          description: "We've updated your gallery description.",
          position: "top-right",
          status: "success",
          duration: 3000,
        })
      }
    }
    catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    handleFetchGalleryData()
  }, [])

  return (
    <BaseLayout>
      <Stack direction='row'
        justify={'flex-end'}
        align={'center'}
        position={'sticky'}
        top={0}
        bg={'white'}
        px={4}
        py={2}
        my={2}
        rounded={'md'}
        zIndex={2}
        shadow={'md'}
      >
        <Button
          position={'sticky'}
          top={0}
          colorScheme='blue'
          variant='solid'
          onClick={() => setShowMyModal(true)}>
          Upload Image
        </Button>
      </Stack>
      <Stack
        justify={'space-evenly'}
        direction={['column', 'row', 'row']} spacing={5}>
        <Stack
          w={['100%', '100%', '100%']}
          direction={['column', 'column', 'column']}
        >
          <Textarea
            h='40'
            placeholder="Add description"
            value={description}
            onChange={handleOnChange}
            size='md'
          />
          <Button
            colorScheme='blue'
            variant='solid'
            onClick={() => handleUpdateGallery()}>
            Update
          </Button>
        </Stack>
        <Stack
          w={['100%', '100%', '100%']}
          direction={['column', 'column', 'column']}>
          {images.map((image, index) => (
            <img
              className="relative overflow-hidden w-60 h-30 transform transition-all ease-out duration-500 hover:scale-105 rounded-md"
              key={index} src={image?.url} alt={image?.altText}
            />
          ))}
        </Stack>
      </Stack>
      <GalleryModal onClose={handleOnClose} visible={showMyModal} />
    </BaseLayout>

  )
}


export default Gallery

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const token = req.cookies.authToken;
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const user = JSON.parse(req.cookies.user)
  if (user.role === "user") {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}