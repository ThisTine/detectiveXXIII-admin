import React from "react";
import {
    Icon,
    Box,
    Heading,
    useColorModeValue,
    SimpleGrid,
} from "@chakra-ui/react";

import Card from "components/card/Card";
import MiniStatistics from 'components/card/MiniStatistics'
import IconBox from "components/icons/IconBox";
import { BiUser, BiGroup } from 'react-icons/bi'
import UserDatatable from "./components/UserDatatable";
import { useContext } from "react";
import UserReportContextProvider, { userReportContext } from "./context/UserReportContextProvider";





const Users = () => {
    const boxBg = useColorModeValue("white", "#1A202C");
    const brandColor = useColorModeValue("brand.500", "white");
    const {users} = useContext(userReportContext)
    

    return (
        <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
                gap='20px'
                mb='20px'>
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={BiUser} color={brandColor} />
                            }
                        />
                    }
                    name='Users (playable)'
                    value={users.filter(item => item.isPlayable).length} />

                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={BiGroup} color={brandColor} />
                            }
                        />
                    }
                    name='Year 1'
                    value={users.filter(item => item.year === 1).length} />
                <MiniStatistics
                    startContent={
                        <IconBox
                            w='56px'
                            h='56px'
                            bg={boxBg}
                            icon={
                                <Icon w='32px' h='32px' as={BiGroup} color={brandColor} />
                            }
                        />
                    }
                    name='Year 2'
                    value={users.filter(item => item.year === 2).length} />
                {/* <PieChart data={[12,23,5]} /> */}
            </SimpleGrid>
            <Card>
                <Heading>User Report</Heading>
                <Box mt={5}>
                    <UserDatatable />
                </Box>
            </Card>
        </Box>
    );
};

const UserWithContext = ()=>{
    return <UserReportContextProvider>
        <Users/>
    </UserReportContextProvider>
}

export default UserWithContext;
