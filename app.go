package main

import (
	"context"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/sqweek/dialog"
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

func (a *App) GetLibrary() []Game {
	return library.Games
}

func (a *App) AddGame() bool {
	filename, err := dialog.File().Filter("Executable file", "exe").Load()
	if err != nil {
		return false
	}

	dir := filepath.Dir(filename)

	appidBytes, err := os.ReadFile(filepath.Join(dir, "steam_appid.txt"))
	if err != nil {
		dialog.Message("Error: steam_appid.txt not found in game directory.").Error()
		return false
	}

	appid, err := strconv.Atoi(strings.TrimSpace(string(appidBytes)))
	if err != nil {
		dialog.Message("Error: Invalid Steam App ID in steam_appid.txt").Error()
		return false
	}

	libErr := library.add_library(Game{
		AppID:       appid,
		PlayTime:    0,
		Achievments: []int{},
		Executable:  filename,
	})

	return libErr == nil
}
