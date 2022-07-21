import React, { useContext } from 'react'
import { Badge, Box, Button, Heading, HStack, useBoolean, VStack } from '@chakra-ui/react'
import Swal from 'sweetalert2'

import Card from 'components/card/Card'
import { eventContext } from '../context/EventContextProvider'


const EventGroup = ({ item }) => {
  const { isPresenting, deleteEventGroup: func } = useContext(eventContext)
  const [isLoading, { on, off }] = useBoolean()
  const deleteEventGroup = async () => {
    try {
      on()
      const confirm = await Swal.fire({
        title: "Are you sure that you want to delete this Event group",
        showCancelButton: true, confirmButtonText: "Delete", confirmButtonColor: "red", text: `deleting ${item.id}`
      })
      if (confirm.isDenied || confirm.isDismissed) {
        throw new Error("Canceled")
      }
      await func(item.id)
      off()
    } catch (err) {
      off()
    }
  }
  return (
    <Card key={item.id} shadow="lg">
      <VStack w="100%" gap={5} alignItems="flex-end">
        <Box w="100%">
          <Badge colorScheme={"blue"} size="sm">{item.id}</Badge>
          {!isPresenting && <Heading size="md" >Hints</Heading>}
          {!isPresenting && <HStack alignItems={"flex-start"}> {item.hints.map(item => <Badge colorScheme={"yellow"} key={item.id} >{item.location}</Badge>)} </HStack>}
          <Heading size="md" >Users</Heading>
          <HStack alignItems={"flex-start"}> {item.users.map(item => <Badge colorScheme={"purple"} key={item.id} >{item.name}</Badge>)} </HStack>
        </Box>

        <Button colorScheme={"red"} onClick={deleteEventGroup} isLoading={isLoading}>Delete</Button>

      </VStack>
    </Card>
  )
}

export default EventGroup