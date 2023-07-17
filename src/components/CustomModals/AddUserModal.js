import {
    Button,
    FormControl, FormLabel,
    useToast,
    Input,
    HStack, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Stack, Textarea, VStack
} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { withCookies } from 'react-cookie'

function AddUserModal(props) {
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onClose } = props
    const handleAddItem = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            let body = {
                "name": e.target.name.value,
                "email": e.target.email.value,
                "password": e.target.password.value,
                "picture": "",
                "phone": ""
            }
            const res = await createItem(token, body)
            if (res.status === 200) {
                setLoading(false);
                handleFetchAllItems();
                onClose()
                return toast({
                    title: 'Success',
                    description: res.data.message,
                    position: "top-right",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
        catch (err) {
            setLoading(false)
            onClose()
            return toast({
                title: 'Error',
                description: err.response.data.message,
                position: "top-right",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }
    const handleFetchAllItems = async () => {
        try {
            const res = await getAllItems(token)
            if (res.status === 200) {
                setItems(res.data.data)
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            size={'2xl'}
        >
            <ModalOverlay />
            <ModalContent px={5} py={6}>
                <Stack>
                    <Stack align={'center'}>
                        <Heading fontSize={'24px'}>Add New Item</Heading>
                    </Stack>
                    <ModalCloseButton />
                    <ModalBody px={1}>
                        <form onSubmit={handleAddItem}>
                            <Stack gap={0.5}>
                                <Stack gap={0.5}>
                                    <FormControl>
                                        <HStack>
                                            <FormLabel width={'30%'} htmlFor='name'>
                                                Item Name
                                            </FormLabel>
                                            <Input name='name' id='name' />
                                        </HStack>
                                    </FormControl>
                                </Stack>
                                <Stack gap={0.5}>
                                    <FormControl>
                                        <HStack>
                                            <FormLabel width={'30%'} htmlFor='price'>
                                                Item Price
                                            </FormLabel>
                                            <Input name='price' id='price' />
                                        </HStack>
                                    </FormControl>
                                </Stack>
                                <Stack gap={0.5}>
                                    <FormControl>
                                        <HStack>
                                            <FormLabel width={'30%'} htmlFor='hsn'>
                                                HSN
                                            </FormLabel>
                                            <Input name='hsn' id='hsn' />
                                        </HStack>
                                    </FormControl>
                                </Stack>
                                <Stack gap={0.5}>
                                    <FormControl>
                                        <HStack>
                                            <FormLabel width={'30%'} htmlFor='gstRate'>
                                                GST Rate
                                            </FormLabel>
                                            <Input name='gstRate' id='gstRate' />
                                        </HStack>
                                    </FormControl>
                                </Stack>
                                <Stack gap={0.5}>
                                    <FormControl>
                                        <HStack>
                                            <FormLabel  width={'30%'} htmlFor='description'>
                                                Description
                                            </FormLabel>
                                            <Textarea rows={8} name='description' id='description' />
                                        </HStack>
                                    </FormControl>
                                </Stack>
                                <Stack>
                                    <Button
                                        isLoading={loading}
                                        loadingText='Adding Item'
                                        _loading={{
                                            opacity: '0.5',
                                        }}
                                        type='submit' w={'100%'} my={4} color={'white'} background={'rgba(0, 127, 155, 1)'} _hover={{ background: 'rgba(0, 127, 155, 1)', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', }}>
                                        Add Item
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                    </ModalBody>

                </Stack>
            </ModalContent>
        </Modal>
    )
}

export default AddUserModal