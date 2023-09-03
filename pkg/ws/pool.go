package ws

import "fmt"

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Brodcast   chan Message
	Clients    map[*Client]bool
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Brodcast:   make(chan Message),
	}
}

func (p *Pool) Start() {
	for {
		select {
		case client := <-p.Register:
			client.ID = len(p.Clients)
			p.Clients[client] = true
			fmt.Println("size of conn pool:", len(p.Clients))
			for client, _ := range p.Clients {
				fmt.Println(client)
				client.Conn.WriteJSON(Message{Type: 1, Body: "new user joined.."})
			}
			break
		case client := <-p.Unregister:
			delete(p.Clients, client)
			fmt.Println("size of conn pool:", len(p.Clients))
			for client, _ := range p.Clients {
				fmt.Println(client)
				client.Conn.WriteJSON(Message{Type: 1, Body: "user disconnected.."})
			}
			break
		case message := <-p.Brodcast:
			fmt.Println("broadcasting to all clients")
			for client, _ := range p.Clients {
				fmt.Println("client", client)
				if err := client.Conn.WriteJSON(message); err != nil {
					fmt.Println(err)
					return
				}
			}

		}
	}
}
