import { Box, Heading, HStack, SimpleGrid, Skeleton, Switch, useBoolean } from '@chakra-ui/react'
import Card from 'components/card/Card'
import React, { useState } from 'react'

const Config = () => {
    const [isLoading,{on,off}] = useBoolean()
    const [gameConfig,setGameConfig] = useState({isGameReady:false,isEventReady:false})
    const ChangeSetting = async (input,value)=>{
        try{
            on()
            setGameConfig({...gameConfig,[input]:value})
        }catch(err){
            off()
        }
    }
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid columns={{ base: 4 }} columnGap={5} >
                <Card>
                    <HStack justifyContent={"space-between"} >
                        <Heading size={"md"}>Game ready</Heading>
                        {isLoading ? <Skeleton w={10} h={5} /> : <Switch size={"lg"} onChange={(e)=>ChangeSetting("isGameReady",e.traget.value)} />}
                    </HStack>
                </Card>
                <Card>
                    <HStack justifyContent={"space-between"} >
                        <Heading size={"md"}>Event ready</Heading>
                        {isLoading ? <Skeleton w={10} h={5} /> : <Switch size={"lg"} onChange={(e)=>ChangeSetting("isEventReady",e.traget.value)} /> }
                    </HStack>
                </Card>
            </SimpleGrid>

        </Box>
    )
}

export default Config