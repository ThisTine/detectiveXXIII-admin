import { useBoolean, useToast } from '@chakra-ui/react'
import useAxios from 'hooks/useAxios'
import React, { useState } from 'react'
import { useCallback } from 'react'
import { useLayoutEffect } from 'react'
import { createContext } from 'react'
import LoadingPage from 'views/Loading/LoadingPage'



export const eventContext = createContext({
    hints: [],
    groups: [],
    isPresenting: false,
    togglePresenting: () => { },
    random: { func: async () => { }, isLoading: false },
    deleteEventGroup: async (id) => { },
    createEvent: async (ids) => { },
    createHint: async (location) => { },
    deleteHint: async (reqid) => { },
    editHint: async ({ id, location }) => { }
})

const EventContextProvider = ({ children }) => {
    const [isPresenting, { toggle }] = useBoolean()
    const axios = useAxios()
    const [isLoading, { off }] = useBoolean(true)
    const [isRandom, { on: onRandom, off: offRandom }] = useBoolean()
    const toast = useToast({ status: "error", position: "top-right", isClosable: true })
    const [data, setdata] = useState({ groups: [], hints: [] })
    const random = async () => {
        try {
            onRandom()
            const { data: { groups } } = await axios().get("/event/random")
            if (groups)
                setdata((val) => ({ ...val, groups: [...groups] }))
            offRandom()
        } catch (err) {
            toast({ title: "Error", description: err.message })
            offRandom()
        }
    }
    const deleteEventGroup = async (eventId) => {
        try {
            const { data: { id } } = await axios().delete("/eventgroup", { data: { id: eventId } })
            if (id) {
                setdata({ ...data, groups: data.groups.filter(item => (item.id !== id)) })
            }
        } catch (err) {
            toast({ title: "Error", description: err.message })
        }
    }
    const createEvent = async (ids) => {
        try {
            const { data } = await axios().post("/eventgroup", { hints: ids })
            if (data) {
                setdata((val) => ({ ...val, groups: [...val.groups, data] }))
            }
        } catch (err) {
            toast({ title: "Error", description: err.message })
        }
    }
    const createHint = async (location) => {
        try {
            const { data } = await axios().post("/event/hint", { location })
            setdata((val) => ({ ...val, hints: [...val.hints, data] }))

        } catch (err) {
            toast({ title: "Error", description: err.message })
        }
    }
    const deleteHint = async (reqid) => {
        try {
            const { data: { id } } = await axios().delete("/event/hint", { data: { id: reqid } })
            if (id) {
                setdata((val) => ({ ...val, hints: val.hints.filter(item => item.id !== id) }))
                const { data: { groups } } = await axios().get("/eventgroup")
                if (groups)
                    setdata((val) => ({ ...val, groups: [...groups] }))
            }

        } catch (err) {
            toast({ title: "Error", description: err.message })
        }
    }
    const editHint = async ({ id, location }) => {
        try {
            const { data: hintdata } = await axios().put("/event/hint", { id, location })
            if (hintdata) {
                setdata((val) => ({ ...val, hints: val.hints.map(item => item.id !== id ? item : ({ ...hintdata })) }))
                const { data: { groups } } = await axios().get("/eventgroup")
                if (groups)
                    setdata((val) => ({ ...val, groups: [...groups] }))
            }

        } catch (err) {
            toast({ title: "Error", description: err.message })
        }
    }
    const init = useCallback(async () => {
        try {
            const { data: { groups } } = await axios().get("/eventgroup")
            const { data: { hints } } = await axios().get("/event/hint")
            if (groups && hints)
                setdata({ groups: [...groups], hints: [...hints] })
        } catch (err) {
            toast({ title: "Error", description: err.message })
        }
    }, [axios])
    useLayoutEffect(() => {
        init().finally(off)
    }, [init])
    if (isLoading)
        return <LoadingPage />

    return (
        <eventContext.Provider value={{
            hints: data.hints, groups: data.groups, isPresenting,
            togglePresenting: toggle, random: { func: random, isLoading: isRandom },
            deleteEventGroup, createEvent, createHint, deleteHint, editHint
        }}>
            {children}
        </eventContext.Provider>
    )
}

export default EventContextProvider