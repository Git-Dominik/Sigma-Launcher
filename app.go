package main

import (
	"context"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/sqweek/dialog"
	"gopkg.in/ini.v1"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetLibrary() map[int]Game {
	return library.Games
}

func (a *App) StartGame(app_id int) bool {
	return library.start_app(app_id)
}

func (a *App) GetDownloads() []GameData {
	games := make([]GameData, 0, len(torrentManager.games))

	for _, game := range torrentManager.games {
		games = append(games, game)
	}

	return games
}

func (a *App) StartDownload(magnet string) GameData {
	t, err := torrentManager.add_torrent(magnet)
	if err != nil {
		return GameData{}
	}

	return torrentManager.games[t.Info().Name]
}

func (a *App) ScrapeTorrents(item string) []Game1337x {
	links := scrape_1337x(item)
	results := make([]Game1337x, 0, len(links))

	for _, link := range links {
		results = append(results, get_1337x_data(link))
	}

	return results
}

func (a *App) GetGames(header string) []ApiGame {
	return apiManager.GetGames(header)
}

func (a *App) GetCover(igdbId int) []Image {
	return apiManager.GetCover(igdbId)
}

func GetOnlineFix(filename string) int {
	cfg, err := ini.Load(filepath.Join(filepath.Dir(filename), "OnlineFix.ini"))
	if err != nil {
		dialog.Message("Error: OnlineFix.ini not found in game directory.").Error()
		return 0
	}

	section, err := cfg.GetSection("Main")
	if err != nil {
		dialog.Message("Error: Main section not found in OnlineFix.ini").Error()
		return 0
	}

	val, err := section.GetKey("RealAppId")
	if err != nil {
		dialog.Message("Error: AppID key not found in OnlineFix section of OnlineFix.ini").Error()
		return 0
	}

	appid, err := strconv.Atoi(strings.TrimSpace(val.String()))
	if err != nil {
		dialog.Message("Error: Invalid Steam App ID in onlinefix.ini").Error()
	}

	return appid
}

func (a *App) AddGame() bool {
	filename, err := dialog.File().Filter("Executable file", "exe").Title("Select game main executable file").Load()
	if err != nil {
		return false
	}

	appid := -1

	appidBytes, err := os.ReadFile(filepath.Join(filepath.Dir(filename), "steam_appid.txt"))
	if err != nil {
		dialog.Message("Error: steam_appid.txt not found in game directory.").Error()
		appid = GetOnlineFix(filename)
	}

	if appid == -1 {
		appid, err = strconv.Atoi(strings.TrimSpace(string(appidBytes)))
		if err != nil {
			dialog.Message("Error: Invalid Steam App ID in steam_appid.txt").Error()
			return false
		}
	}

	if appid == -1 {
		appid, err = strconv.Atoi(strings.TrimSpace(string(appidBytes)))
		if err != nil {
			dialog.Message("Error: Invalid Steam App ID in steam_appid.txt").Error()
			return false
		}
	}

	if appid == 0 {
		return false
	}

	libErr := library.add_library(Game{
		AppID:       appid,
		PlayTime:    0,
		Achievments: []int{},
		Executable:  filename,
		Favorite:    false,
	})

	return libErr == nil
}
