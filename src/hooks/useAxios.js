import { useCallback } from "react"

const { default: axios } = require("axios")

const useAxios = (props)=>useCallback(()=>{
    if(props === "auth")
    return axios.create({baseURL:process.env.REACT_APP_BASE_URL+"/auth",withCredentials:true})
    return axios.create({baseURL:process.env.REACT_APP_BASE_URL+"/admin",withCredentials:true})
},[axios,props])


export default useAxios