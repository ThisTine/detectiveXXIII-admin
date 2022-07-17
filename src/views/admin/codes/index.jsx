import { Badge, Box, Button, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import Card from 'components/card/Card'
import React from 'react'
import downloadCSV from './functions/downloadCsv'

const Codes = () => {
    const room = ["ASsTS","$s23ASD","&^*&TYS","@s%RDF","&*^&*BV","d$%DFG"]
    const event = [{code:"ASdTS",location:"LX"},{code:"$s%ASD",location:"LX"},{code:"&^*&TYS",location:"LX"},{code:"@s%RDF",location:"LX"},{code:"&*^&*BV",location:"LX"},{code:"s$%DFG",location:"LX"}]
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid columns={{ base: 1, md: 2}} gap={5}>
            <Card>
                <HStack justifyContent={"space-between"} >
                <Heading size="md">Paring</Heading>
                <Button colorScheme={"green"} onClick={()=>downloadCSV(room.map(item=>({code:item})))}>Download</Button>
                </HStack>
                <SimpleGrid columns={{base:2,md:3}} gap={2} mt={5}>
                    {room.map(item=><HStack bgGradient={"linear(purple.300,purple.500)"} justifyContent={"center"} alignItems={"center"} shadow={"lg"} rounded="lg" minH={20} p={2} key={item}>
                        <Heading size={{base:"md",lg:"lg"}} textAlign={"center"} color="white" >{item}</Heading>
                    </HStack>)}
                </SimpleGrid>
            </Card>
            <Card>
                <HStack justifyContent={"space-between"}>
                <Heading size="md">Event</Heading>
                <Button colorScheme={"green"} onClick={()=>downloadCSV(event)}>Download</Button>
                </HStack>
                <SimpleGrid columns={{base:2,md:3}} gap={2} mt={5}>
                    {event.map(item=><VStack bgGradient={"linear(green.300,green.500)"} justifyContent={"center"} alignItems={"center"} shadow={"lg"} rounded="lg" minH={20} p={4} key={item.code}>
                        <Heading size={{base:"md",lg:"lg"}} textAlign={"center"} color="white" >{item.code}</Heading>
                        <Badge>{item.location}</Badge>
                    </VStack>)}
                </SimpleGrid>
            </Card>
        </SimpleGrid>
    </Box>
  )
}

export default Codes