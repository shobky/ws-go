import React, { useRef } from 'react'
import { sendmsg } from '../api/connect'



export default function Box() {
    const msgref = useRef(null)

    const pushmsg = (e) => {
        e.preventDefault()
        sendmsg(msgref.current?.value)
    }

    return (
        <form onSubmit={pushmsg}>
            <input placeholder='input' name='msg' ref={msgref}  />
            <button>Submit</button>
        </form>
    )
}
