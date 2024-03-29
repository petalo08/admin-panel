import BaseLayout from "../layout/BaseLayout";
import React, { useEffect, useState } from "react";

import EventModal from "../components/pages/events/EventModal";
import { updateGalleryById } from "../api/gallery";
import { AiFillDelete } from "react-icons/ai";
import {
  Button,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { getEventsById } from "../api/events";

function Events() {
  const toast = useToast();
  const [showMyModal, setShowMyModal] = useState(false);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const handleOnClose = () => setShowMyModal(false);

  const handleOnChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFetchEventsData = async () => {
    try {
      const res = await getEventsById();
      console.log(res);
      if (res.data) {
        setDescription(res.data.data.description);
        setImages(res.data.data.images);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateGallery = async () => {
    try {
      let body = {
        description: description,
      };
      const res = await updateGalleryById(body);
      if (res.status === 200) {
        toast({
          title: "Gallery Updated.",
          description: "We've updated your gallery.",
          position: "top-right",
          status: "success",
          duration: 3000,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleFetchEventsData();
  }, []);
  const handleDeleteImage = async (index) => {
    try {
      let tempImages = [...images];
      tempImages.splice(index, 1);
      let body = {
        images: tempImages,
      };
      const res = await updateGalleryById(body);
      if (res.status === 200) {
        toast({
          title: "Image Deleted.",
          description: "We've deleted your image.",
          position: "top-right",
          status: "success",
          duration: 3000,
        });
        setImages(tempImages);
      }
    } catch (err) {
      toast({
        title: "Error.",
        description: "We've deleted your image.",
        position: "top-right",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <BaseLayout>
      <Stack
        direction="row"
        justify={"flex-end"}
        align={"center"}
        position={"sticky"}
        top={0}
        bg={"white"}
        px={4}
        py={2}
        rounded={"md"}
        zIndex={2}
        shadow={"md"}
      >
        <Button
          position={"sticky"}
          top={0}
          colorScheme="blue"
          variant="solid"
          onClick={() => setShowMyModal(true)}
        >
          Upload Image
        </Button>
      </Stack>
      <Stack
        shadow={"md"}
        rounded={"md"}
        p={5}
        justify={"space-evenly"}
        direction={["column", "row", "row"]}
        spacing={5}
      >
        <Stack
          w={["100%", "100%", "100%"]}
          direction={["column", "column", "column"]}
        >
          <Textarea
            h="40"
            placeholder="Add description"
            defaultValue={description}
            onChange={handleOnChange}
            size="md"
          />
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={() => handleUpdateGallery()}
          >
            Update
          </Button>
        </Stack>
        <Stack
          w={["100%", "100%", "100%"]}
          direction={["column", "column", "column"]}
        >
          <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            color={"gray.600"}
            align={"center"}
          >
            Events Images
          </Text>
          <SimpleGrid columns={[1, 2, 2]} p={5} spacing={2}>
            {images.map((image, index) => (
              <Stack key={index}>
                <img
                  className="relative overflow-hidden object-cover w-72 h-48 transform transition-all ease-out duration-500 hover:scale-105 rounded-md"
                  key={index}
                  src={image?.url}
                  alt={image?.altText}
                />
                <Stack>
                  <Button
                    w="max-content"
                    colorScheme="blue"
                    variant="solid"
                    onClick={() => handleDeleteImage(index)}
                  >
                    <AiFillDelete />
                  </Button>
                </Stack>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
      <EventModal onClose={handleOnClose} visible={showMyModal} />
    </BaseLayout>
  );
}

export default Events;

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
  const user = JSON.parse(req.cookies.user);
  if (user.role == "user") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
