package main

import (
	"bufio"
	"embed"
	"fmt"
	"os"
	"os/exec"
	"strings"
	"time"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	app := NewApp()

	err := wails.Run(&options.App{
		Title:  "Sigma Launcher",
		Width:  600,
		Height: 400,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("App error: ", err.Error())
	}

	// 🐐routine
	torrentManager := start_client()
	go func() {
		torrent := torrentManager.start_torrent("magnet:?xt=urn:btih:BB5F06D3DC020BCCDD8949E0C80DC6B2A236FE9C")
		ticker := time.NewTicker(time.Second)

		for {
			completionRatio := float64(torrent.BytesCompleted()) / float64(torrent.Info().TotalLength())

			fmt.Printf("Download progress: %.2f%%\n", completionRatio*100)
			if completionRatio >= 1.0 {
				ticker.Stop()
				return
			}
		}
	}()
}

func select_app() {
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

func printFileInfo(info os.FileInfo) {
	fmt.Println("\nFile Information:")
	fmt.Printf("| %-20s: %-40s |\n", "File Name", info.Name())
	fmt.Printf("| %-20s: %-40d |\n", "Size (bytes)", info.Size())
	fmt.Printf("| %-20s: %-40s |\n", "Permissions", info.Mode())
	fmt.Printf("| %-20s: %-40s |\n", "Last Modified", info.ModTime())
	fmt.Printf("| %-20s: %-40v |\n", "Is Directory", info.IsDir())
	fmt.Println()
}
