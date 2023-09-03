package ws

import (
	"fmt"
	"log"
	"sync"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID   int
	Conn *websocket.Conn
	Pool *Pool
	mu   sync.Mutex
}

type Message struct {
	Type   int    `json:"type"`
	Body   string `json:"body"`
	Author int    `jsno:"author"`
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		messageType, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		message := Message{Type: messageType, Body: string(p), Author: c.ID}
		c.Pool.Brodcast <- message
		fmt.Printf("msg rcvd:%+v\n", message)
	}
}
