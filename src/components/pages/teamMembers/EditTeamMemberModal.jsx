import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Stack,
} from '@chakra-ui/react'
import { updateTeamMemberById } from '../../../api/teamMember'
import { supabase } from '../../../utils/supabaseClient'

const EditTeamMemberModal = (props) => {
  const toast = useToast()
  const { isOpen, onOpen, onClose, data } = props
  console.log(data)
  const [newData, setNewData] = useState({})
  const [image, setImage] = useState(null)
  const [fl, setFl] = useState(null)

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

  const handleUpdate = async (e) => {
    e.preventDefault()
    console.log(e.target.name.value)
    console.log('doing')
    if (fl) {
      const path = `members/${fl.name}`
      const { data: data2, error } = await supabase.storage.from('images').upload(path, fl)
      if (error) {
        console.error(error)
      } else {
        console.log('File uploaded successfully:', data)
        const { data: url, error: err } = supabase.storage.from('images').getPublicUrl(path)
        if (err) {
          console.error(err)
          return
        }
        setImage(null)
        setFl(null)
        const res = await updateTeamMemberById(data?._id, {
          name: e.target.name.value,
          designation: e.target.designation.value,
          image: url.publicUrl || data.image,
        })
        if (res.status === 200) {
          console.log(res.data)
          toast({
            title: "Details uploaded successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        }
      }
    }
    else {
      try {
        const res = await updateTeamMemberById(data?._id, {
          name: e.target.name.value,
          designation: e.target.designation.value,
        })
        if (res.status === 200) {
          console.log(res.data)
          toast({
            title: "Details uploaded successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        }
      }
      catch (err) {
        console.log(err)
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }
  useEffect(() => {
    setNewData(data)
  }, [])
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleUpdate}>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={data.name}
                    onChange={(e) => setNewData({ ...data, name: e.target.value })}
                    className="border border-gray-700 p-2 rounded"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="designation">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    id="designation"
                    defaultValue={data.designation}
                    onChange={(e) =>
                      setNewData({ ...data, designation: e.target.value })
                    }
                    className="border border-gray-700 p-2 rounded"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="image">Image</label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept=".jpg, .jpeg, .png, .webp, .svg"
                    onChange={handleImageUpload}
                    className="border border-gray-700 p-2 rounded"
                  />
                  {image ? (
                    <img src={image} alt="preview" className="w-24 h-24" />)
                    :
                    (< img src={data.image} alt={data.name} className="w-24 h-24" />)}
                </div>
              </div>
              <Stack justify='center' my={2} align='center'>
                <Button type='submit' colorScheme='blue'>
                  Update
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default EditTeamMemberModal



