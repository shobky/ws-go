import { useEffect, useState } from "react"

export default function Message(props) {
    const [message, setMessage] = useState({})

    useEffect(() => {
        let temp = JSON.parse(props.message)
        setMessage(temp)
    }, [props.message])

    return (
        <p>{message.body}</p>
    )
}
