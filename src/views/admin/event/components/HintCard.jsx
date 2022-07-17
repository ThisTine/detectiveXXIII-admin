import { Box, Button, Heading, SimpleGrid, VStack,Text, HStack, useDisclosure } from '@chakra-ui/react'
import Card from 'components/card/Card'

import React from 'react'
import Swal from 'sweetalert2'
import EditHintModal from './EditHintModal'

const HintCard = ({item}) => {
    const {isOpen,onOpen,onClose} = useDisclosure()
    const deleteHint = async()=>{
        try{
            const confirm = await Swal.fire({title:"Are you sure that you want to delete this hint",showCancelButton:true,confirmButtonText:"Delete",confirmButtonColor:"red",text:`deleting ${item.id}-${item.location}`})
            if(confirm.isDenied || confirm.isDismissed){
                throw new Error("Canceled")
            }
        }catch(err){

        }
    }
    return (
        <Card shadow="lg" key={item.id}>
            <EditHintModal isOpen={isOpen} onClose={onClose} item={item} />
            <HStack w="100%" justifyContent={"space-between"}>
                <Box>
                    <Heading size={"md"}>{item.location}</Heading>
                    <Text>{item.id}</Text>
                </Box>
                <HStack>
                    <Button colorScheme={"yellow"} onClick={onOpen} >Edit</Button>
                    <Button colorScheme={"red"} onClick={deleteHint} >Delete</Button>
                </HStack>

            </HStack>

        </Card>
    )
}

export default HintCard