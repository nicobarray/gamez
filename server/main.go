package main

import (
	"flag"
	"log"
	"net"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.RequestURI)
		next.ServeHTTP(w, r)
	})
}

func main() {
	addr := flag.String("addr", ":12345", "address to listen on")
	flag.Parse()

	l, err := net.Listen("tcp", *addr)
	if err != nil {
		log.Fatal(err)
	}

	headersOk := handlers.AllowedHeaders([]string{"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization"})
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS", "DELETE"})

	r := mux.NewRouter()
	r.Use(loggingMiddleware)
	r.HandleFunc("/games", GetGames).Methods("GET", "POST")
	r.HandleFunc("/games/{id}", GetGames).Methods("POST")

	if err := http.Serve(l, handlers.CORS(originsOk, headersOk, methodsOk)(r)); err != nil {
		log.Fatal(err)
	}
}
