package main

import (
	"embed"
	"fmt"
	"os"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// 🐐routine
	/** torrentManager := start_client()
	torrent := torrentManager.start_torrent("magnet:?xt=urn:btih:BB5F06D3DC020BCCDD8949E0C80DC6B2A236FE9C")
	ticker := time.NewTicker(time.Second)
	defer ticker.Stop()

	go func() {
		var lastBytes int64 = 0
		for range ticker.C {
			currentBytes := torrent.BytesCompleted()
			bytesPerSecond := currentBytes - lastBytes
			mbPerSecond := float64(bytesPerSecond) / 1024 / 1024

			completionRatio := float64(currentBytes) / float64(torrent.Info().TotalLength())
			fmt.Printf("Progress: %.2f%% (%.2f MB/s)\n", completionRatio*100, mbPerSecond)

			lastBytes = currentBytes
			if completionRatio >= 1.0 {
				return
			}
		}
	}() **/

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
}

func select_app() {

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
