import React, { useContext } from 'react'
import { Badge, Box, Button, Heading, VStack } from '@chakra-ui/react'
import Swal from 'sweetalert2'

import Card from 'components/card/Card'
import { eventContext } from '../context/EventContextProvider'


const EventGroup = ({item}) => {
  const {isPresenting} = useContext(eventContext)
    const deleteEventGroup = async ()=>{
        try{
            const confirm = await Swal.fire({title:"Are you sure that you want to delete this Event group",
            showCancelButton:true,confirmButtonText:"Delete",confirmButtonColor:"red",text:`deleting ${item.id}`})
            if(confirm.isDenied || confirm.isDismissed){
                throw new Error("Canceled")
            }
        }catch(err){

        }
    }
  return (
    <Card key={item.id} shadow="lg">
    <VStack w="100%" gap={5} alignItems="flex-end">
    <Box w="100%">
    <Heading size="lg">{item.id}</Heading> 
    {!isPresenting && <Heading size="md" >Hints</Heading>}
    {!isPresenting && <VStack alignItems={"flex-start"}> {item.hints.map(item=><Badge key={item.id} >{item.location}</Badge>)} </VStack>}
    <Heading size="md" >Users</Heading>
    <VStack alignItems={"flex-start"}> {item.users.map(item=><Badge key={item.id} >{item.name}</Badge>)} </VStack>
    </Box>
    
    <Button colorScheme={"red"} onClick={deleteEventGroup}>Delete</Button>
    
    </VStack>
    </Card>
  )
}

export default EventGroup