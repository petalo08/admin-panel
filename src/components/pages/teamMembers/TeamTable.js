import { useState } from "react";
import EditModal from "./editModal";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Image,
  Input,
  TableContainer,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Fuse from "fuse.js";
import { deleteTeamMemberById, updateTeamMemberById } from "../../../api/teamMember";

const TeamTable = (props) => {
  const fuseOptions = {
    keys: ["name"],
  }
  const toast = useToast()
  const { data } = props;
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [results, setResults] = useState([])
  const [tempData, setTempData] = useState({})

  const onClose = () => setIsOpen(false);

  const onCloseEdit = () => setIsOpenEdit(false);

  const handleEdit = async (item) => {
    setTempData(item);
    onCloseEdit();
    setIsOpenEdit(true);
    try {
      const res = await updateTeamMemberById(item._id, item);
    } catch (err) { }
  };

  const handleDelete = async (item) => {
    setSelectedId(id);
    setIsOpen(true);
    try {
      const res = await deleteTeamMemberById(item._id);
    }
    catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  };

  const handleConfirmDelete = () => {
    // handle delete logic here
    onClose();
  };
  const fuse = new Fuse(data, fuseOptions);
  const handleSearch = (value) => {
    if (value) {
      const result = fuse.search(value);
      setResults(result.map((item) => item.item));
    } else {
      setResults(data);
    }
  };

  return (
    <>
      <Stack position='sticky'
        top={16}
        bg={'white'}
        px={4}
        py={2}
        rounded={'md'}
        zIndex={2}
        shadow={'md'}
        direction="row" justify="space-between" align="center"
      >
        <input
          type="text"
          placeholder="Search by name..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-[25%] py-2 px-4 rounded-lg shadow-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
        />
      </Stack>
      <TableContainer shadow={'md'}
        rounded={'md'} p={2} m={2}>
        <Table size="md" variant="simple" m={2}>
          <Thead bg="#e9fffb" w='90%'>
            <Tr>
              <Th color="black">Designation</Th>
              <Th color="black">Image</Th>
              <Th color="black">Name</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {results.map((item) => (
              <Tr key={item.id}>
                <Td>{item.designation}</Td>
                <Td>
                  <Image
                    src={item.image}
                    alt={item.name}
                    w="32"
                    h="32"
                    objectFit="contain"
                    bg="white"
                  />
                </Td>
                <Td>{item.name}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<AiFillEdit />}
                    mr={2}
                    onClick={() => handleEdit(item)}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<AiFillDelete />}
                    onClick={() => handleDelete(item)}
                  />
                </Td>
              </Tr>
            ))}
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>{item.designation}</Td>
                <Td>
                  <Image
                    src={item.image}
                    alt={item.name}
                    w="32"
                    h="32"
                    objectFit="contain"
                    bg="white"
                  />
                </Td>
                <Td>{item.name}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit"
                    icon={<AiFillEdit />}
                    mr={2}
                    onClick={() => handleEdit(item.id)}
                  />
                  <IconButton
                    aria-label="Delete"
                    icon={<AiFillDelete />}
                    onClick={() => handleDelete(item.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* <AlertDialog isOpen={isOpenEdit} onClose={onCloseEdit}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Edit team member details</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this item?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete Item</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this item?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      <EditModal visible={isOpenEdit} onClose={onCloseEdit} />
    </>
  );
};

export default TeamTable;
