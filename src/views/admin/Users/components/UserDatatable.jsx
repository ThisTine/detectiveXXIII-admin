import React, { useContext } from 'react'
import {
    Box,
    useColorModeValue,
    Text,
    Button,
    useToast,
    useBoolean,
} from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { userReportContext } from '../context/UserReportContextProvider';


const CustomStatus = ({ text }) => {
    return <Box bg={text === "filling_hints" ? "orange.400" : text === "waiting" ? "blue.400" : text === "playing" ? "green.400" : "transparent"} p={1} rounded="xl" ><Text>{text}</Text></Box>
}



const DeleteBtn = ({ id }) => {
    const { deleteUser } = useContext(userReportContext)
    const [isLoading, { on, off }] = useBoolean()
    const deleteUserfunc = () => {
        on()
        deleteUser(id).finally(off)
    }
    return <Button colorScheme={"red"} onClick={() => deleteUserfunc()} isLoading={isLoading} >Delete</Button>
}


const UserDatatable = () => {
    const { users } = useContext(userReportContext)
    const boxBg = useColorModeValue("white", "#1A202C");
    const textColor = useColorModeValue("black", "white");
    const getName = ({ input, isStatus, deleteRow }) => ({
        name: input,
        selector: (row) => {
            return row[input] + "";
        },
        sortable: true,
        ...(isStatus && { cell: row => <CustomStatus text={row[input]} /> }),
        ...(deleteRow && { cell: row => <DeleteBtn id={row.id} /> })

    });
    const columns = [
        getName({ input: "id" }),
        getName({ input: "name" }),
        getName({ input: "email" }),
        getName({ input: "status", isStatus: true }),
        getName({ input: "lifes" }),
        getName({ input: "isPlayable" }),
        getName({ input: "partnerCount" }),
        getName({ input: "id", deleteRow: true }),

    ];

    return (
        <DataTable
            columns={columns}
            data={users}
            customStyles={{
                headCells: {
                    style: {
                        background: boxBg,
                        color: textColor,
                        border: "none",
                    },
                },
                rows: {
                    style: {
                        background: boxBg,
                        color: textColor,
                    },
                },
            }}
        />
    )
}

export default UserDatatable