import { useToast } from "@chakra-ui/react"
import { useCallback } from "react"

const { default: axios } = require("axios")

const instanceAuth = axios.create({ baseURL: process.env.REACT_APP_BASE_URL + "/auth", withCredentials: true })

const instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL + "/admin", withCredentials: true })

const useAxios = (props) =>
    useCallback(() => {
        if (props === "auth") return instanceAuth
        return instance
    }, [axios, props])

export default useAxios
