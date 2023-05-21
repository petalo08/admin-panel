import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'



// let body = {

// }
// const res = await updateUserById(token, item._id, body)
// if (res.status === 200) {
//     toast({
//         title: "Account updated.",
//         position: "top-right",
//         description: "We've updated your account.",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//     })
// }
const EditUserModal = (props) => {
    const { isOpen, onOpen, onClose, data } = props
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData({ ...data, name: e.target.value })}
                                        className="border border-gray-700 p-2 rounded"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="designation">Role</label>
                                    <input
                                        type="text"
                                        name="role"
                                        id="role"
                                        value={data.role}
                                        onChange={(e) =>
                                            setData({ ...data, role: e.target.value })
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
                                        onChange={(e) => setImage(e.target.files[0])}
                                        className="border border-gray-700 p-2 rounded"
                                    />
                                </div>
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default EditUserModal



