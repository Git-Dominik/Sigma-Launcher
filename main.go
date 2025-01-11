package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

var torrentManager *Manager
var library *Library

func main() {
	// 🐐routine
	go func() {
		library = get_library()
		torrentManager = start_client()

		/*torrent := torrentManager.add_torrent("magnet:?xt=urn:btih:715C8751E48DFA6AC8E1F179C0C064B6AAB2C278")
		ticker := time.NewTicker(time.Second)
		defer ticker.Stop()

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
		}*/
	}()

	/*go func() {
		results := scrape_1337x("the forest")
		fmt.Printf("Found %d test results!", len(results))
	}()*/

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
