package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/shobky/ws/pkg/ws"
)

func serveWS(pool *ws.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("ws endpoint hit")

	conn, err := ws.Upgrade(w, r)

	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}
	client := &ws.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func setupRoutes() {
	pool := ws.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Request: %s %s", r.Method, r.URL.Path)
		serveWS(pool, w, r)
	})

}

func main() {
	setupRoutes()
	err := http.ListenAndServe("0.0.0.0:8080", nil)
	if err != nil {
		fmt.Println("Error:", err)
	}
}
