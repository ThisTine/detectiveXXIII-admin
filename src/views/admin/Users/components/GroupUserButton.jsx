import {
    Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    useBoolean,
    useDisclosure
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useContext } from 'react'
import { userReportContext } from '../context/UserReportContextProvider'


const GroupUserModal = ({ isOpen, onClose }) => {
    const [isLoading, { on, off }] = useBoolean()
    const { users, assignUserToRoom } = useContext(userReportContext)
    const [selected, setselected] = useState([])
    const submit = () => {
        on()
        assignUserToRoom(selected).then(() => { setselected([]); onClose() }).finally(off)
    }
    return <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>

            <ModalHeader>Assign user to group</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack>
                    {users.map(item => <Button key={item.id} colorScheme={selected.includes(item.id) ? "blue" : "gray"}
                        onClick={selected.includes(item.id) ?
                            () => setselected(val => val.filter(it => it !== item.id)) :
                            () => setselected(val => [...val, item.id])} >{item.name}</Button>)}
                </VStack>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='gray' onClick={onClose} mr={3} >
                    Close
                </Button>

                <Button colorScheme={"green"} onClick={submit} isLoading={isLoading} >Submit</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
}

const GroupUserButton = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    return (
        <>
            <GroupUserModal {...{ isOpen, onClose, onOpen }} />
            <Button colorScheme={"green"} onClick={onOpen}>Create partner</Button>
        </>
    )
}

export default GroupUserButton