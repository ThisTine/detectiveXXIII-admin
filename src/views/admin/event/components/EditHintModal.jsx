import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Box,
  useColorModeValue,
  Text,
  useBoolean
} from '@chakra-ui/react'
import { useContext } from 'react'
import { eventContext } from '../context/EventContextProvider'

const EditHintModal = ({ isOpen, onClose, item }) => {
  const color = useColorModeValue("gray.900", "whiteAlpha.900")
  const [isLoading, { on, off }] = useBoolean()
  const [text, setText] = useState(item.location)
  const { editHint } = useContext(eventContext)
  const edit = async () => {
    try {
      on()
      await editHint({ id: item.id, location: text })
      onClose()
    } catch (err) {
      off()
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text>Location</Text>
            <Input color={color} onChange={e => setText(e.target.value)} autoFocus={true} variant="filled" defaultValue={item.location} />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='gray' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme={"green"} isLoading={isLoading} isDisabled={!text} onClick={edit} >Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditHintModal