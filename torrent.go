package main

import (
	"fmt"
	"time"

	"github.com/anacrolix/torrent"
)

type GameData struct {
	Name     string
	Progress int64
	Speed    int64
}

type Manager struct {
	client *torrent.Client
	games  map[string]GameData
}

// start client en geef manager zodat je makkelijk kan bedienen zawg
func start_client() *Manager {
	client, err := torrent.NewClient(nil)
	if err != nil {
		fmt.Println("Error starting torrent client")
	}

	return &Manager{client: client, games: make(map[string]GameData)}
}

// add download
// start ook torrent meteen
func (manager Manager) add_torrent(magnetLink string) (*torrent.Torrent, error) {
	t, err := manager.client.AddMagnet(magnetLink)
	if err != nil {
		return t, err
	}

	fmt.Println("Getting metadata")
	<-t.GotInfo()

	fmt.Println("Download starting")
	t.DownloadAll()

	manager.games[t.Info().Name] = GameData{
		Name: t.Info().Name,
		Progress: 0,
		Speed: 0,
	}

	go func() {
		var lastBytes int64 = 0

		ticker := time.NewTicker(time.Second)
		defer ticker.Stop()
		for {
			select {
			case <-ticker.C:
				currentBytes := t.BytesCompleted()

				game := manager.games[t.Info().Name]
				game.Speed = currentBytes - lastBytes
				game.Progress = int64(float64(currentBytes)/float64(t.Info().TotalLength()) * 100)

				manager.games[t.Info().Name] = game

				lastBytes = currentBytes
				if float64(currentBytes)/float64(t.Info().TotalLength()) >= 1.0 {
					return
				}
			}
		}
	}()

	return t, nil
}
