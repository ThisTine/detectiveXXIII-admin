import React from 'react'
import { Button, HStack, Input,useColorModeValue } from '@chakra-ui/react'

import Card from 'components/card/Card'
const AddHint = () => {
  const color = useColorModeValue("gray.900","whiteAlpha.900")

  return (
    <Card gap={3}>
                <HStack>
                <Input color={color} variant="filled" placeholder='location' />
                <Button colorScheme={"purple"}>Create</Button>
    </HStack></Card>
  )
}

export default AddHint