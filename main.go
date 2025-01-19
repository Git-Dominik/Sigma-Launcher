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
var apiManager *APIManager
var library *Library

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
		apiManager = NewAPI()
	}()

	go func() {
		/*results := scrape_1337x("goat simulator 3")
		for _, result := range results {
			data := get_1337x_data(result)
			fmt.Printf("Title: %s\nUploader: %s\nDownloads: %d\nDate: %s\n\n", data.Title, data.Uploader, data.Downloads, data.Date)
		}*/
	}()

	app := NewApp()
	err := wails.Run(&options.App{
		Title:  "Sigma Launcher",
		Width:  1200,
		Height: 900,

		MinHeight: 700,
		MinWidth:  1064,
		Frameless: true,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
	})

	if err != nil {
		println("App error: ", err.Error())
	}
}
