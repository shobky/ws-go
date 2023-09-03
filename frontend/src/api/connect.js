var socket = new WebSocket("ws://ws-giggss.onrender.com/ws")

let connect = (cb, handleHistory) => {
    console.log('connecting..')

    socket.onopen = () => {
        console.log("ws connected ok.")
    }

    socket.onmessage = (msg) => {
        console.log("ws msg: ", msg)
        handleHistory(msg)
    }

    socket.onclose = (e) => {
        console.log("ws closed: ", e)
    }

    socket.onerror = (err) => {
        console.log("ws error: ", err)
    }
}

let sendmsg = (msg) => {
    socket.send(msg)
}

export { connect, sendmsg }