import { Box, Button, Heading, HStack, SimpleGrid, Switch, useDisclosure, VStack } from '@chakra-ui/react'
import Card from 'components/card/Card'
import React, { useContext } from 'react'
import AddHint from './components/AddHint'
import CreateEventModal from './components/CreateEventModal'
import EventGroup from './components/EventGroup'
import HintCard from './components/HintCard'
import EventContextProvider, { eventContext } from './context/EventContextProvider'



const Event = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { hints, groups, isPresenting, togglePresenting, random: { isLoading, func } } = useContext(eventContext)
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid mb={3} columns={{ base: 1, md: 2, lg: 4 }}>
                <Card>
                    <HStack justifyContent={"space-between"}>
                        <Heading size={"md"}>Presentation mode</Heading>
                        <Switch value={isPresenting} onChange={togglePresenting} />
                    </HStack>
                </Card>
            </SimpleGrid>
            <CreateEventModal {...{ isOpen, onClose, onOpen }} />
            <SimpleGrid columns={isPresenting ? { base: 1 } : { base: 1, md: 2 }} gap={"20px"}>
                {!isPresenting && <Card>
                    <Heading size="md">Hints</Heading>
                    <AddHint />
                    <VStack>
                        {hints.map(item => <HintCard item={item} key={item.id} />)}
                    </VStack>
                </Card>}

                <Card>
                    <Heading size="md">Events</Heading>
                    <Card gap={3} w="100%" >
                        <HStack w="100%" justifyContent={"space-between"}>
                            <Button colorScheme={"teal"} onClick={onOpen}>Create</Button>
                            <Button colorScheme={"purple"} onClick={func} isLoading={isLoading} >Random</Button>
                        </HStack>

                    </Card>
                    <SimpleGrid columns={{ base: 1, md: isPresenting ? 3 : 1 }} gap={2}>
                        {groups.map(item => <EventGroup item={item} key={item.id} />)}
                    </SimpleGrid>
                </Card>

            </SimpleGrid>

        </Box>
    )
}


const EventWithProvider = () => {
    return <EventContextProvider>
        <Event />
    </EventContextProvider>
}

export default EventWithProvider