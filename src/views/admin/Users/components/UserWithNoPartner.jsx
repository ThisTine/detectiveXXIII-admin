import React, { useContext, useState } from 'react'
import { Badge, Button, HStack, useBoolean, useDisclosure, VStack } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { userReportContext } from '../context/UserReportContextProvider'
import { useMemo } from 'react'

export const AssignUserModal = ({ item, isOpen, onClose }) => {
    const { rooms, assignUserToRoom } = useContext(userReportContext)
    const [selected, setselected] = useState(null)
    const [isLoading, { on, off }] = useBoolean()
    const avaroom = useMemo(() => rooms.filter(item => (item.users.length <= 2)), [rooms])
    const assign = () => {
        on()
        assignUserToRoom([item.id], selected).then(onClose).finally(off)
    }
    const random = () => {
        on()
        assignUserToRoom([item.id], avaroom[Math.floor(Math.random() * avaroom.length)].id).then(onClose).finally(off)
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Assign user to group</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        {avaroom.map(item => <Button key={item.id} colorScheme={selected === item.id ? "blue" : "gray"} onClick={() => setselected(item.id)} >{item.id}</Button>)}
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <HStack>
                        <Button colorScheme='gray' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme={"purple"} isLoading={isLoading} onClick={random} isDisabled={!avaroom.length} >
                            Random
                        </Button>
                        <Button colorScheme={"green"} isDisabled={!selected} onClick={assign} isLoading={isLoading} >Submit</Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const UserWithNoPartner = ({ item }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <AssignUserModal {...{ onClose, isOpen, item }} />
            <Badge key={item.id} fontSize={15} colorScheme="purple" cursor={"pointer"} onClick={onOpen} >{item.name}</Badge>
        </>
    )
}

export default UserWithNoPartner