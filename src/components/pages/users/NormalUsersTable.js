import React from 'react'
import {
    Table, Thead, Tbody,
    Tr, Th, Td, Input,
    TableContainer,
    Stack,
    useToast,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import { AiFillDelete, AiFillEdit, AiFillPlusSquare } from 'react-icons/ai';
import { deleteUserById, signup, updateUserById } from '../../../api/auth'
import { withCookies } from 'react-cookie'
import Fuse from "fuse.js";
import { useState } from 'react';
import EditUserModal from './EditUserModal';


function NormalUsersTable(props) {
    const fuseOptions = {
        keys: ["name"],
    }
    const [selectedData, setSelectedData] = useState({})
    const { data: normalUsers } = props
    const [data, setData] = useState(normalUsers)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {
        isOpen: isOpenEdit,
        onOpen: onOpenEdit,
        onClose: onCloseEdit
    } = useDisclosure()
    const [results, setResults] = useState([])
    const token = props.cookies.get('authToken')
    const toast = useToast()
    const fuse = new Fuse(data, fuseOptions)
    const handleSearch = (value) => {
        if (value) {
            const result = fuse.search(value)
            setResults(result.map((r) => r.item))
        } else {
            setResults(data);
        }
    }
    const handleDelete = async (id) => {
        try {
            const res = await deleteUserById(token, id)
            if (res.status === 200) {
                toast({
                    title: "Account deleted.",
                    position: "top-right",
                    description: "Account deleted successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
        catch (err) {
            console.log(err)
            toast({
                title: "Account deleted failed.",
                position: "top-right",
                description: "Error deleting your account",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }
    const handleEdit = async (item) => {
        setSelectedData(item)
        onOpenEdit()
    }
    const handleAdd = async () => {
        try {
            let body = {
                name: "",
                email: "",
                password: "",
                picture: ""
            }
            const res = await signup(body)
            if (res.status === 200) {
                toast({
                    title: "Account added",
                    position: "top-right",
                    description: "We've updated your account.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
        catch (err) {
            console.log(err);
            toast({
                title: "Account addition failed.",
                position: "top-right",
                description: "We've updated your account.",
                status: "error",
                duration: 3000,
                isClosable: true,
            })
        }
    }
    return (
        <>
            <Stack>
                <Stack
                    direction="row"
                    align="center"
                    justify="space-between"
                >
                    <Input
                        width="40%"
                        variant="filled"
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search user by name" />
                    <Button
                        colorScheme="blue"
                        variant="solid"
                        rightIcon={<AiFillPlusSquare />}
                        onClick={onOpen}
                    >
                        Add User
                    </Button>
                </Stack>
                <Stack></Stack>
                <TableContainer shadow={'md'}
                    rounded={'md'}>
                    <Table size={['sm', 'md', 'lg']} variant="simple">
                        <Thead bg="#e9fffb">
                            <Tr>
                                <Th color="black">Name</Th>
                                <Th color="black">Email</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {results.length > 0 && results.map((item) => (
                                <Tr key={item._id}>
                                    <Td>{item.name}</Td>
                                    <Td>{item.email}</Td>
                                    <Td>
                                        <Stack direction='row' spacing={10}>
                                            <AiFillEdit
                                                onClick={
                                                    () => handleEdit(item)
                                                }
                                            />
                                            <AiFillDelete
                                                onClick={() => handleDelete(item._id)}
                                            />
                                        </Stack>
                                    </Td>
                                </Tr>
                            ))}
                            {results.length === 0 && data.map((item) => (
                                <Tr key={item._id}>
                                    <Td>{item.name}</Td>
                                    <Td>{item.email}</Td>
                                    <Td>
                                        <Stack direction='row' spacing={10}>
                                            <AiFillEdit
                                                onClick={
                                                    () => handleEdit(item)
                                                }
                                            />
                                            <AiFillDelete
                                                onClick={() => handleDelete(item._id)}
                                            />
                                        </Stack>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add User</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <form>
                                {/* name, email, password,picture */}
                            </form>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Stack>
            <EditUserModal
                isOpen={isOpenEdit}
                onClose={onCloseEdit}
                data={selectedData}
                handleEdit={handleEdit}
            />
        </>
    )
}

export default withCookies(NormalUsersTable)