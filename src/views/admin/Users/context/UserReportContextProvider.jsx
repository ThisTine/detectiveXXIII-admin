import React, { useState } from 'react'
import { createContext } from 'react';
import Swal from 'sweetalert2';
import {useToast} from '@chakra-ui/react'

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
    users:[],
    deleteUser: async (id)=>{}
})

const UserReportContextProvider = (props) => {
    const [users,setusers] = useState(mockup)
    const errToast = useToast({status:"error",position:"top-right",isClosable:true})
    const deleteUser = async (id)=>{
        try{
            const confirm = await Swal.fire({title:"Are you sure that you want to delete this user",
            showCancelButton:true,confirmButtonText:"Delete",confirmButtonColor:"red",text:`deleting ${id}`})
             if(confirm.isDenied || confirm.isDismissed){
                 throw new Error("Canceled")
             }
             await new Promise( ()=> setTimeout(()=>{
                setusers(users.filter(item=>item.id !== id))
             },1000))
             console.log("deleting")
         }catch(err){
             console.log(err)
             errToast({title:err.toString()})
         }
    }
  return (
    <userReportContext.Provider {...props} value={{users:[...users],deleteUser}} />
  )
}

export default UserReportContextProvider