import useAxios from "hooks/useAxios";
import React , {useCallback, useLayoutEffect} from 'react'

const { useBoolean, useToast } = require("@chakra-ui/react");
const { createContext, useState } = require("react");
const { Redirect } = require("react-router-dom");
const { default: LoadingPage } = require("views/Loading/LoadingPage");

export const userContext = createContext({
    user: null,
    logout: ()=>{}
})


const UserContextProvider = (props)=>{
    const [isLoading,{off,on}] = useBoolean(true)
    const [user,setUser] = useState(null)
    const axios = useAxios()
    const authaxios = useAxios("auth")
    const toast = useToast({status:"error",position:"top-right"})
    const fetchUser = useCallback(async ()=>{
        try{
            const user = await axios().get("/")
            setUser(user.data)
        }catch(err){
            console.log(err)
        }
    },[axios])
    const logout = async()=>{
        try{
            await authaxios().get("/logout")
            setUser(null)
        }catch(err){
            toast({title:"error",description:err.toString()})
        }
    }

    useLayoutEffect(() => {
        on()
        fetchUser().finally(off)
    }, [on,fetchUser,off])
    if(isLoading)
    return <LoadingPage />
    if(!user)
    return <Redirect to="/auth/sign-in" />
    return <userContext.Provider value={{user:user,logout}} {...props}/>
}

export default UserContextProvider