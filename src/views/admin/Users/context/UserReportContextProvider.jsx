import React, { useState, useLayoutEffect } from 'react'
import { createContext } from 'react';
import Swal from 'sweetalert2';
import { useBoolean, useToast } from '@chakra-ui/react'
import useAxios from 'hooks/useAxios';
import LoadingPage from 'views/Loading/LoadingPage';
import { useCallback } from 'react';

const mockup = [
    {
        id: "4573782c-4e40-43c2-92b4-93d53fadf8cb2",
        name: "SITTICHOK OUAMSIRI",
        email: "tine@thistine.com",
        year: 2,
        lifes: 5,
        status: "filling hints",
        isPlayable: true,
        partnerCount: 1,
    },
    {
        id: "4573782c-4e40-43c2-92b4-93sd53adf8cb2",
        name: "SITTICHOK OUAMSasdIRI",
        email: "tine@thistine.com",
        year: 2,
        lifes: 5,
        status: "filling hints",
        isPlayable: true,
        partnerCount: 1,
    },
    {
        id: "4573782c-4e40-43c2-92b4-93d53addf8cb2",
        name: "SITTICHOK OUAMSIRI",
        email: "tine@thistine.com",
        year: 2,
        lifes: 5,
        status: "playing",
        isPlayable: true,
        partnerCount: 1,
    },
    {
        id: "4573782c-4e40-43c2-92b4-93d53asdf8cb2",
        name: "SITTICHOK OUAMSIRI",
        email: "tine@thistine.com",
        year: 2,
        lifes: 5,
        status: "waiting",
        isPlayable: true,
        partnerCount: 1,
    },
];

export const userReportContext = createContext({
    users: [],
    rooms: [],
    deleteUser: async (id) => { },
    assignUserToRoom: async (userid, roomId) => { }
})

const UserReportContextProvider = (props) => {
    const [users, setusers] = useState(mockup)
    const [room, setroom] = useState([])
    const errToast = useToast({ status: "error", position: "top-right", isClosable: true })
    const axios = useAxios()
    const [isLoading, { off, on }] = useBoolean()
    const assignUserToRoom = async (userid, roomId) => {
        try {
            const { data } = await axios().put("/room", { roomId, userIds: userid })
            if (data) {
                // setroom((val) => val.map(item => (item.id === roomId ? ({ ...data }) : item)))
                await init()
            }
        } catch (err) {
            errToast({ title: err.response.data })
        }
    }
    const deleteUser = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: "Are you sure that you want to delete this user",
                showCancelButton: true, confirmButtonText: "Delete", confirmButtonColor: "red", text: `deleting ${id}`
            })
            if (confirm.isDenied || confirm.isDismissed) {
                throw new Error("Canceled")
            }
            const { data: { id: userId } } = await axios().delete("/user", { data: { id: id } })
            if (userId) {
                setusers((val) => val.filter(item => item.id !== userId))
            }
        } catch (err) {
            errToast({ title: err.response.data })
        }
    }
    const init = useCallback(async () => {
        try {
            const { data: { users } } = await axios().get("/users")
            const { data } = await axios().get("/room")
            if (users && data) {
                setusers([...users])
                setroom([...data])
            }
        } catch (err) {
            errToast({ title: "Error", description: err.response.data })
        }
    }, [axios, errToast])
    useLayoutEffect(() => {
        on()
        init().finally(off)
    }, [init, on, off])
    if (isLoading)
        return <LoadingPage />
    return (
        <userReportContext.Provider {...props} value={{ users: [...users], deleteUser, rooms: [...room], assignUserToRoom }} />
    )
}

export default UserReportContextProvider