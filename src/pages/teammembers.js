import React, { useState } from "react";
import BaseLayout from "../layout/BaseLayout";
import { getAllTeamMembers } from "../api/teamMember";
import TeamTable from "../components/pages/teamMembers/TeamTable";
import {
  Button, Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { getSeoByPageName } from "../api/seo"


function TeamMembers(props) {
  const { teamMembers } = props
  const [image, setImage] = useState(null)
  const [fl, setFl] = useState(null)
  const [name, setName] = useState("")
  const [designation, setDesignation] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()

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
    }
    setFl(file)
  }

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
        <Button onClick={onOpen}>Add a member</Button>
      </Stack>
      <TeamTable data={teamMembers} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add team member</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Designation" />
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
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </BaseLayout>
  );
}

export default TeamMembers;

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
  try {
    const res = await getAllTeamMembers();
    // const seo = await getSeoByPageName("teammembers")
    if (res.status == 200) {
      return {
        props: {
          teamMembers: res.data.data,
        },
      };
    }
  } catch (err) {
    return {
      props: {
        teamMembers: [],
      },
    };
  }
}
