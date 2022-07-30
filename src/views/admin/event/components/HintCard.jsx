import { Box, Button, Heading, SimpleGrid, VStack, Text, HStack, useDisclosure, useBoolean, Stack } from '@chakra-ui/react'
import Card from 'components/card/Card'

import React, { useContext } from 'react'
import Swal from 'sweetalert2'
import { eventContext } from '../context/EventContextProvider'
import EditHintModal from './EditHintModal'

const HintCard = ({ item }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { deleteHint: delteteHintFunc } = useContext(eventContext)
    const [isLoading, { on, off }] = useBoolean()
    const deleteHint = async () => {
        try {
            on()
            const confirm = await Swal.fire({ title: "Are you sure that you want to delete this hint", showCancelButton: true, confirmButtonText: "Delete", confirmButtonColor: "red", text: `deleting ${item.id}-${item.location}` })
            if (confirm.isDenied || confirm.isDismissed) {
                throw new Error("Canceled")
            }
            await delteteHintFunc(item.id)
            off()
        } catch (err) {
            off()
        }
    }
    return (
        <Card shadow="lg" key={item.id}>
            <EditHintModal isOpen={isOpen} onClose={onClose} item={item} />
            <Stack direction={{ base: "column", lg: "row" }} w="100%" justifyContent={"space-between"}>
                <Box>
                    <Heading size={"md"}>{item.location}</Heading>
                    <Text>{item.id}</Text>
                </Box>
                <HStack>
                    <Button colorScheme={"yellow"} onClick={onOpen} >Edit</Button>
                    <Button colorScheme={"red"} onClick={deleteHint} isLoading={isLoading} >Delete</Button>
                </HStack>

            </Stack>

        </Card>
    )
}

export default HintCard