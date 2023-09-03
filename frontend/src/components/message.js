import { useEffect, useState } from "react"

export default function Message(props) {
    const [message, setMessage] = useState({})

    console.log(props.message)  
    useEffect(() => {
        let temp = JSON.parse(props.message)
        setMessage(temp)
    }, [props.message])

    return (
        <p className={`msg-${message.Author}`}>{message.body}</p>
    )
}
