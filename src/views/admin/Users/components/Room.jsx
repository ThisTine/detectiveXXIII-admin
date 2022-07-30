import React, { useContext, useState } from 'react'
import { Box, Badge, VStack, Button, useDisclosure, useBoolean } from '@chakra-ui/react'

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
import { AssignUserModal } from './UserWithNoPartner'

const AssignRoomToUsersModal = ({ item, onClose, isOpen }) => {
    const { users, assignUserToRoom } = useContext(userReportContext)
    const avusers = useMemo(() => users.filter(e => (e.isPlayable && !item.users.map(user => user.id).includes(e.id))), [users, item.users])
    const [selected, setselected] = useState([])
    const [isLoading, { on, off }] = useBoolean()
    const submit = () => {
        on()
        assignUserToRoom(selected, item.id).then(onClose).finally(off)
    }
    return <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>

            <ModalHeader>Assign user to group</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <VStack>
                    {avusers.map(item => <Button key={item.id} colorScheme={selected.includes(item.id) ? "blue" : "gray"}
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

const Room = ({ item }) => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { isOpen: isAsUs, onClose: OnAsUsClose, onOpen: OnAsUsOpen } = useDisclosure()
    return (
        <Box key={item.id} p={2} shadow="md" rounded={"lg"} >
            <AssignRoomToUsersModal {...{ onClose, isOpen, item }} />
            {item.users.length === 1 && <AssignUserModal item={item.users[0]} isOpen={isAsUs} onClose={OnAsUsClose} onOpen={OnAsUsOpen} />}
            <Badge mb={5} colorScheme={"blue"} >{item.id}</Badge>
            <VStack>
                {item.users.map(e => <Badge colorScheme={"yellow"} key={e.id} >{e.id}</Badge>)}
            </VStack>
            {item.users.length <= 1 && <Button w="100%" onClick={onOpen} size="lg" mt={2} colorScheme="green">Assign User</Button>}
            {item.users.length === 1 && <Button w="100%" onClick={OnAsUsOpen} size="lg" mt={2} colorScheme="purple">Move user to another group</Button>}


        </Box>
    )
}

export default Room