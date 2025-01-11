package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

type Library struct {
	Games []int `json:"games"`
}

// geeft library.json als Library struct vol met appids
func get_library() *Library {
	// open library.json bestand
	file, err := os.Open("library.json")
	if err != nil {
		fmt.Println("Error opening library.json")
	}
	defer file.Close()

	// lees library.json bytes
	bytes, err := io.ReadAll(file)
	if err != nil {
		fmt.Println("Error reading library.json")
	}

	// maak nieuwe library variable
	var games Library
	json.Unmarshal(bytes, &games)

	// return eind resultaat als struct zodat je add library kan gebruiken
	return &games
}

func (lib Library) add_library(app_id int) bool {
	// voeg toe aan array
	lib.Games = append(lib.Games, app_id)

	// open library.json bestand
	file, err := os.OpenFile("library.json", os.O_WRONLY|os.O_CREATE|os.O_TRUNC, 0644)
	if err != nil {
		fmt.Println("Error opening library.json")
	}
	defer file.Close()

	// converteer struct naar json
	jsonData, err := json.Marshal(lib)
	if err != nil {
		fmt.Println("Error converting bytes to json")
	}

	// schrijf json naar library.json
	_, err = file.Write(jsonData)

	// return of het gelukt is
	return err == nil
}

func start_app() {
		reader := bufio.NewReader(os.Stdin)

	fmt.Print("Enter the full path to exe: ")
	input, _ := reader.ReadString('\n')
	input = strings.TrimSpace(input)

	// C:\Riot Games\Riot Client\RiotClientServices.exe
	info, err := os.Stat(input)
	if err != nil {
		if os.IsNotExist(err) {
			fmt.Printf("File does not exist: %s\n", input)
		} else {
			fmt.Printf("Error accessing file: %s\n", input)
		}
	}

	printFileInfo(info)

	cmd := exec.Command(input)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	fmt.Printf("Running %s\n", input)
	err = cmd.Run()
	if err != nil {
		fmt.Printf("Error running executable: %v\n", err)
	}
}
