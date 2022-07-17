import { useBoolean } from '@chakra-ui/react'
import React from 'react'
import { createContext } from 'react'

const hints = [
    {
        "id": "cl5kxm2c00000q8vzt4okpt4g",
        "location": "Fibo"
    },
    {
        "id": "cl5l1v3bp0063osvz093rctyb",
        "location": "common"
    },
    {
        "id": "cl5l1v9ir0073osvzmn3gqii7",
        "location": "lx"
    },
    {
        "id": "cl5l1u4x00043osvz9275lnie",
        "location": "หอหญิง"
    },
    {
        "id": "cl5mi7blu00072svzfa9z6jl4",
        "location": "rama2"
    }
]
const eventgroups = [
    {
        "id": "cl5kyl8ml00008cvzprsxbg2o",
        "hints": [
            {
                "location": "Fibo",
                "id": "cl5kxm2c00000q8vzt4okpt4g"
            }
        ],
        "users": [
            {
                "id": "a40dc8fe-269c-4054-92c7-00468b080a20",
                "name": "PONGSAPUK LUBKIM",
                "email": "pongsapuk.lubk@kmutt.ac.th",
                "year": 2
            }
        ]
    },
    {
        "id": "cl5micmrz00242svzx37b48jy",
        "hints": [
            {
                "location": "rama2",
                "id": "cl5mi7blu00072svzfa9z6jl4"
            },
            {
                "location": "lx",
                "id": "cl5l1v9ir0073osvzmn3gqii7"
            }
        ],
        "users": [
            {
                "id": "c79daffa-4163-4d5e-a85f-e1437cf13448",
                "name": "NATTAPAT TEERANUNTACHAI",
                "email": "nattapat.teer@kmutt.ac.th",
                "year": 2
            }
        ]
    },
    {
        "id": "cl5mij1m50007f4vzblchxlwk",
        "hints": [
            {
                "location": "lx",
                "id": "cl5l1v9ir0073osvzmn3gqii7"
            }
        ],
        "users": [
            {
                "id": "6c8c61b0-f92b-43ee-b8de-68d841f8a465",
                "name": "THAMOLWAN JARUNGRATTANAPONG",
                "email": "thamolwan.jaru@kmutt.ac.th",
                "year": 2
            }
        ]
    },
    {
        "id": "cl5mijbg60017f4vztjd3l2ig",
        "hints": [
            {
                "location": "à¸´rama2",
                "id": "cl5mi7blu00072svzfa9z6jl4"
            }
        ],
        "users": [
            {
                "id": "0b8a07d7-c437-4560-befa-24c7a3c4ef4b",
                "name": "PHURICHAYA KHEMVARAPORN",
                "email": "phurichaya.khem@kmutt.ac.th",
                "year": 2
            }
        ]
    },
    {
        "id": "cl5miotgq0035f4vzlurkzpto",
        "hints": [
            {
                "location": "à¸«à¸­à¸«à¸à¸´à¸‡",
                "id": "cl5l1u4x00043osvz9275lnie"
            }
        ],
        "users": [
            {
                "id": "e31aa354-c00f-4adf-8c8c-be8e7554949f",
                "name": "SITTICHOK OUAMSIRI",
                "email": "sittichok.ouam@kmutt.ac.th",
                "year": 2
            }
        ]
    },
    {
        "id": "cl5mip98o0045f4vzy8k1nxvf",
        "hints": [
            {
                "location": "common",
                "id": "cl5l1v3bp0063osvz093rctyb"
            }
        ],
        "users": [
            {
                "id": "5377302b-7492-4e7b-9148-70442919b2db",
                "name": "SORRAWIT KWANJA",
                "email": "sorrawit.kwan@kmutt.ac.th",
                "year": 2
            }
        ]
    }
]

export const eventContext = createContext({
    hints:[],
    groups:[],
    isPresenting: false,
    togglePresenting: ()=>{}
})

const EventContextProvider = ({children}) => {
    const [isPresenting,{toggle}] = useBoolean()
  return (
    <eventContext.Provider value={{hints,groups:eventgroups,isPresenting,togglePresenting:toggle}}>
        {children}
    </eventContext.Provider>
  )
}

export default EventContextProvider