import { Box, Heading, HStack, SimpleGrid, Skeleton, Switch, useBoolean, useToast } from '@chakra-ui/react'
import Card from 'components/card/Card'
import useAxios from 'hooks/useAxios'
import React, { useState, useLayoutEffect } from 'react'
import { useCallback } from 'react'

const Config = () => {
    const [isLoading, { on, off }] = useBoolean()
    const axios = useAxios()
    const toast = useToast({ status: "error", position: "top-right", isClosable: true })
    const [gameConfig, setGameConfig] = useState({ isGameReady: false, isEventReady: false })
    const init = useCallback(async () => {
        try {
            const { data } = await axios().get("/config")
            if (data) {
                setGameConfig({ ...data })
            }
        } catch (err) {
            console.log(err)
            toast({ title: "error", description: err.message })
        }
    }, [axios])
    useLayoutEffect(() => {
        on()
        init().finally(off)
    }, [init])
    const ChangeSetting = async (input, value) => {
        try {
            on()
            const { data } = await axios().put("/config", { ... { [input]: value } })
            if (data)
                setGameConfig({ ...data })
            off()
        } catch (err) {
            off()
            toast({ title: "error", description: err.message })
        }
    }
    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={5} >
                <Card>
                    <HStack justifyContent={"space-between"} >
                        <Heading size={"md"}>Game ready</Heading>
                        {isLoading ? <Skeleton w={10} h={5} /> : <Switch isChecked={gameConfig['isGameReady']} size={"lg"} onChange={(e) => ChangeSetting("isGameReady", e.target.checked)} />}
                    </HStack>
                </Card>
                <Card>
                    <HStack justifyContent={"space-between"} >
                        <Heading size={"md"}>Event ready</Heading>
                        {isLoading ? <Skeleton w={10} h={5} /> : <Switch isChecked={gameConfig['isEventReady']} size={"lg"} onChange={(e) => ChangeSetting("isEventReady", e.target.checked)} />}
                    </HStack>
                </Card>
            </SimpleGrid>

        </Box>
    )
}

export default Config