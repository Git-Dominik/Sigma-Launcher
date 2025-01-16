package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

type ApiGame struct {
	Id 	int `json:"id"`
	Name string `json:"name"`
}

func GetGames(amount int) []ApiGame {
	client := &http.Client{}

	fmt.Println(os.Getenv("IGDB_CLIENT"))

	body := []byte(`fields name; limit 10;`)

	request, err := http.NewRequest("POST", "https://api.igdb.com/v4/games/", bytes.NewBuffer(body))
	if err != nil {
		return nil
	}

	request.Header.Set("Client-ID", os.Getenv("IGDB_CLIENT"))
	request.Header.Set("Authorization", fmt.Sprintf("Bearer %s", os.Getenv("IGDB_AUTH")))

	response, err := client.Do(request)
	if err != nil {
		return nil
	}
	defer response.Body.Close()

	var games []ApiGame
	if err := json.NewDecoder(response.Body).Decode(&games); err != nil {
		return nil	
	}

	fmt.Println(games)

	return games
}