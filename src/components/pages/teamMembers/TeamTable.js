import { useEffect, useState } from "react";
import {
  Table, Thead, Tbody,
  Tr, Th, Td,
  IconButton,
  Image,
  TableContainer,
  Stack,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Fuse from "fuse.js";
import { deleteTeamMemberById } from "../../../api/teamMember";
import { useRouter } from "next/router";
import EditTeamMemberModal from "./EditTeamMemberModal";

const TeamTable = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedData, setSelectedData] = useState({})
  const router = useRouter()
  const fuseOptions = {
    keys: ["name"],
  }
  const toast = useToast()
  const { data } = props;
  const [results, setResults] = useState([])

  const handleEdit = async (item) => {
    setSelectedData(item)
    onOpen()
  }

  const handleDelete = async (item) => {
    try {
      const res = await deleteTeamMemberById(item._id);
      if (res.status === 200) {
        console.log("deleted")
        toast({
          title: 'Success',
          description: 'Team member deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        })
        router.reload()
      }
    }
    catch (err) {
      toast({
        title: "Error",
        position: "top-right",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const fuse = new Fuse(data, fuseOptions);

  const handleSearch = (value) => {
    if (value) {
      const result = fuse.search(value);
      setResults(result.map((item) => item.item));
    } else {
      setResults(data)
    }
  }
  useEffect(() => {
  }, [onClose])
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
        <Table size="md" variant="simple">
          <Thead bg="#e9fffb">
            <Tr>
              <Th color="black">Designation</Th>
              <Th color="black">Image</Th>
              <Th color="black">Name</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {results.map((item) => (
              <Tr key={item._id}>
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
            {results.length === 0 && data.map((item) => (
              <Tr key={item._id}>
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
          </Tbody>
        </Table>
      </TableContainer>
      <EditTeamMemberModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        data={selectedData}
      />
    </>
  );
};

export default TeamTable;
