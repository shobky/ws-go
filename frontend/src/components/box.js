import React, { useRef } from 'react'
import { sendmsg } from '../api/connect'



export default function Box() {
    const msgref = useRef(null)

    const pushmsg = (e) => {
        e.preventDefault()
        sendmsg(msgref.current?.value)
        document.getElementById('msg-box-form').reset()
    }

    return (
        <form onSubmit={pushmsg} id='msg-box-form'>
            <input placeholder='input' name='msg' ref={msgref} />
            <button>Submit</button>
        </form>
    )
}
