package main

import (
	"embed"
	"fmt"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

var torrentManager *Manager
var library *Library

// FormatBytes converts bytes to human-readable sizes (B, KB, MB, GB, TB)
func FormatBytes(bytes int64) string {
	const unit = 1024
	if bytes < unit {
		return fmt.Sprintf("%d B", bytes)
	}

	suffix := []string{"B", "KB", "MB", "GB", "TB"}
	exp := 0
	size := float64(bytes)

	for size >= unit && exp < len(suffix)-1 {
		size /= unit
		exp++
	}

	return fmt.Sprintf("%.2f %s", size, suffix[exp])
}

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

			completionRatio := float64(currentBytes) / float64(torrent.Info().TotalLength())
			fmt.Printf("Progress: %.2f%% (%s/s)\n", completionRatio*100, FormatBytes(bytesPerSecond))

			lastBytes = currentBytes
			if completionRatio >= 1.0 {
				return
			}
		}*/
	}()

	go func() {
		results := scrape_1337x("goat simulator 3")
		for _, result := range results {
			data := get_1337x_data(result)
			fmt.Printf("Title: %s\nUploader: %s\nDownloads: %d\nDate: %s\n\n", data.Title, data.Uploader, data.Downloads, data.Date)
		}
	}()

	app := NewApp()
	err := wails.Run(&options.App{
		Title:  "Sigma Launcher",
		Width:  1000,
		Height: 600,
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
