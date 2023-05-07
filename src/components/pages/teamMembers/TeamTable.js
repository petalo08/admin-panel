import { useState } from "react";
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
} from "@chakra-ui/react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";


const TeamTable = (props) => {
    const {data} = props
    const [isOpen, setIsOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const onClose = () => setIsOpen(false);

    const handleEdit = (id) => {
        // handle edit logic here
    };

    const handleDelete = (id) => {
        setSelectedId(id);
        setIsOpen(true);
    };

    const handleConfirmDelete = () => {
        // handle delete logic here
        onClose();
    };

    return (
        <>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Designation</Th>
                        <Th>Image</Th>
                        <Th>Name</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item) => (
                        <Tr key={item.id}>
                            <Td>{item.designation}</Td>
                            <Td>
                                <Image src={item.image} alt={item.name} 
                                w='32' h='32'
                                objectFit='contain'
                                bg='white' />
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
            </AlertDialog>
        </>
    );
};

export default TeamTable
