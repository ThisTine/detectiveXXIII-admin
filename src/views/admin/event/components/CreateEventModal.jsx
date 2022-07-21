import React, { useContext, useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Box,
  useColorModeValue,
  Text,
  useBoolean,
  VStack,
  HStack
} from '@chakra-ui/react'
import Card from 'components/card/Card'
import { eventContext } from '../context/EventContextProvider'

const CreateEventModal = ({ isOpen, onClose }) => {
  const color = useColorModeValue("gray.900", "whiteAlpha.900")
  const { hints, createEvent } = useContext(eventContext)
  const [avhints, setAvhints] = useState([])
  const [selectedhints, setselectedhints] = useState([])
  const [isLoading, { on, off }] = useBoolean()
  const addhint = (hint) => {
    setselectedhints([...selectedhints, hint])
    setAvhints([...avhints.filter(item => item.id !== hint.id)])
  }

  const removehint = (hint) => {
    setAvhints([...avhints, hint])
    setselectedhints([...selectedhints.filter(item => item.id !== hint.id)])

  }

  const create = async () => {
    try {
      on()
      const ids = selectedhints.map(item => ({ id: item.id }))
      await createEvent(ids)
      off()
      setAvhints(hints)
      setselectedhints([])
      onClose()
    } catch (err) {
      off()
    }
  }

  useEffect(() => {
    setAvhints(hints)
  }, [hints])
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Event</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Card shadow="lg" >
              <Heading size="md">Hints order</Heading>
              <HStack mt={5}>
                {selectedhints.map(item => <Button colorScheme={"teal"} onClick={() => removehint(item)} key={item.id}>{item.location}</Button>)}
              </HStack>

            </Card>

            <Card shadow="lg" >
              <Heading size="md">Select hints</Heading>
              <HStack mt={5}>
                {avhints.map(item => <Button colorScheme={"blue"} onClick={() => addhint(item)} key={item.id}>{item.location}</Button>)}
              </HStack>
            </Card>
          </VStack>
        </ModalBody>


        <ModalFooter>
          <Button colorScheme='gray' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme={"green"} onClick={create} isLoading={isLoading} isDisabled={!selectedhints.length} >Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateEventModal