var socket = new WebSocket("ws://192.168.1.5:8080/ws")

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
    console.log("sending: ", msg)
    socket.send(msg)
}

export { connect, sendmsg }