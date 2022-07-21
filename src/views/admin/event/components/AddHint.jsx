import React, { useContext, useState } from 'react'
import { Button, HStack, Input, useBoolean, useColorModeValue } from '@chakra-ui/react'

import Card from 'components/card/Card'
import { eventContext } from '../context/EventContextProvider'
const AddHint = () => {
  const color = useColorModeValue("gray.900", "whiteAlpha.900")
  const [location, setLocation] = useState("")
  const [isLoading, { on, off }] = useBoolean()
  const { createHint } = useContext(eventContext)
  const create = () => {
    on()
    createHint(location).then(() => { setLocation("") }).finally(off)
  }
  return (
    <Card gap={3}>
      <HStack>
        <Input color={color} variant="filled" placeholder='location' value={location} onChange={e => setLocation(e.target.value)} />
        <Button isLoading={isLoading} onClick={create} colorScheme={"purple"} isDisabled={!location}>Create</Button>
      </HStack></Card>
  )
}

export default AddHint