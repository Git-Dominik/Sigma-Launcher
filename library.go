package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
)

type Game struct {
	AppID       int    `json:"appid"`
	PlayTime    int    `json:"playtime"`
	Achievments []int  `json:"achievments"`
	Executable  string `json:"executable"`
}

type Library struct {
	Games []Game `json:"games"`
}

// geeft library.json als Library struct vol met data
func get_library() *Library {
	file, err := os.OpenFile("./library.json", os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		log.Printf("Error opening/creating library.json: %v", err)
		return &Library{Games: []Game{}}
	}
	defer file.Close()

	bytes, err := io.ReadAll(file)
	if err != nil {
		log.Printf("Error reading library.json: %v", err)
		return &Library{Games: []Game{}}
	}

	if len(bytes) == 0 {
		emptyLib := &Library{Games: []Game{}}
		jsonData, err := json.MarshalIndent(emptyLib, "", "    ")
		if err != nil {
			log.Printf("Error marshaling empty library: %v", err)
			return emptyLib
		}
		if _, err := file.Write(jsonData); err != nil {
			log.Printf("Error writing empty library: %v", err)
		}
		return emptyLib
	}

	var library Library
	if err := json.Unmarshal(bytes, &library); err != nil {
		log.Printf("Error unmarshalling library.json: %v", err)
		return &Library{Games: []Game{}}
	}

	return &library
}

func (lib *Library) add_library(gameData Game) error {
	// Append the new game
	lib.Games = append(lib.Games, gameData)

	// Marshal the entire library to JSON
	jsonData, err := json.Marshal(lib)
	if err != nil {
		return fmt.Errorf("failed to marshal library: %w", err)
	}

	// Write to file
	err = os.WriteFile("library.json", jsonData, 0644)
	if err != nil {
		return fmt.Errorf("failed to write library file: %w", err)
	}

	return nil
}

func (lib *Library) start_app() {

}
