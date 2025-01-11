package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"
	"time"
)

type Game struct {
	AppID       int    `json:"appid"`
	PlayTime    int    `json:"playtime"`
	Achievments []int  `json:"achievments"`
	Executable  string `json:"executable"`
}

type Library struct {
	Games map[int]Game `json:"games"`
}

// geeft library.json als Library struct vol met data
func get_library() *Library {
	file, err := os.OpenFile("./library.json", os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		log.Printf("Error opening/creating library.json: %v", err)
		return &Library{Games: make(map[int]Game)}
	}
	defer file.Close()

	bytes, err := io.ReadAll(file)
	if err != nil {
		log.Printf("Error reading library.json: %v", err)
		return &Library{Games: make(map[int]Game)}
	}

	if len(bytes) == 0 {
		emptyLib := &Library{Games: make(map[int]Game)}
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
		return &Library{Games: make(map[int]Game)}
	}

	return &library
}

func (lib *Library) add_library(gameData Game) error {
	// Append the new game
	lib.Games[gameData.AppID] = gameData

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

func (lib *Library) start_app(appID int) bool {
	game, ok := lib.Games[appID]
	if !ok {
		return false
	}

	cmd := exec.Command(game.Executable)
	cmd.Start()

	go func() {
		seconds := 0

		for {
			process, err := os.FindProcess(cmd.Process.Pid)
			if process == nil || err != nil {
				fmt.Printf("Game quit after %d\n", seconds)
				break
			}

			seconds++
			time.Sleep(time.Second)
		}
	}()

	return true
}
