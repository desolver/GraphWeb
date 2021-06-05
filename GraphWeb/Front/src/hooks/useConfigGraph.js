import { useState } from "react"
import { getApiInstanse, CONFIG_URL } from "../config"
import { message } from "antd"

const useConfigGraph = () => {
    const [loading, setLoading] = useState(false)
    const configure = (params) => {
        setLoading(true)

        return getApiInstanse()
            .post(CONFIG_URL, params)
            .then(() => {
                message.success("Конфигурация модели прошла успешно, моделирование запущено")
                setLoading(false)
            })
            .catch((error) => {
                message.error("Произошла ошибка: " + error.message)
                console.log(error)

                setLoading(false)
            })
    }

    return { configure, loading }
}

export default useConfigGraph
