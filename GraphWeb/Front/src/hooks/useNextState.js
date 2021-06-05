import { useState } from "react"
import { getApiInstanse, NEXT_STATE_URL } from "../config"

const useNextState = () => {
    const [data, setData] = useState({})
    const fetch = () => {
        getApiInstanse()
            .get(NEXT_STATE_URL)
            .then((res) => {
                setData(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return { data, fetch }
}

export default useNextState
