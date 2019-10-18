package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"strconv"
)

// Error is the error message
type Error struct {
	Status string `json:"status"`
	Reason string `json:"reason"`
}

// Game is the metadata struct
type Game struct {
	ID     string `json:"id,omitempty"`
	Name   string `json:"name"`
	Status string `json:"status"`
}

// GameList is a list of Games
type GameList struct {
	Status string `json:"status"`
	Games  []Game `json:"games"`
}

// GetGames is a handler
func GetGames(w http.ResponseWriter, r *http.Request) {
	//game1 := Game{"1", "masupergame", "pending"}
	//game2 := Game{"2", "nicolascestleboss", "running"}
	//game3 := Game{"3", "lifensuperieurambler", "finished"}
	//games := GameList{"success", []Game{game1, game2, game3}}

	switch r.Method {
	case http.MethodGet:
		w.Header().Set("Content-Type", "application/json")

		games := GameList{"success", LobbyGames}
		json.NewEncoder(w).Encode(games)
	case http.MethodPost:
		w.Header().Set("Content-Type", "application/json")

		var game Game
		err := json.NewDecoder(r.Body).Decode(&game)
		if err != nil {
			log.Fatal("err:", err)
		}
		if game.Name == "" {
			var err = Error{"error", "Missing game name"}
			json.NewEncoder(w).Encode(err)
			return
		}
		game.ID = strconv.Itoa(rand.Intn(1000))
		game.Status = "pending"
		LobbyGames = append(LobbyGames, game)
		json.NewEncoder(w).Encode(game)
	default:
		w.WriteHeader(http.StatusBadRequest)
	}
}
