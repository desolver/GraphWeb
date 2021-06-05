import axios from "axios"

export const BASE_URL = "https://localhost:5001"
export const CONFIG_URL = "/config/new"
export const NEXT_STATE_URL = "/graph/state"

export const getApiInstanse = () => {
    return axios.create({
        baseURL: BASE_URL,
    })
}
