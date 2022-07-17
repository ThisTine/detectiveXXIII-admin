import { Heading, VStack } from '@chakra-ui/react'
import React from 'react'

const LoadingPage = () => {
  return (
    <VStack minH={"100vh"} alignItems="center" justifyContent={"center"} minW={"100vw"}>
        <Heading>Loading</Heading>
    </VStack>
  )
}

export default LoadingPage