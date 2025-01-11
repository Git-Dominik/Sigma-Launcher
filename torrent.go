package main

import (
	"fmt"

	"github.com/anacrolix/torrent"
)

type Manager struct {
	client *torrent.Client
}

// start client en geef manager zodat je makkelijk kan bedienen zawg
func start_client() *Manager {
	client, err := torrent.NewClient(nil)
	if err != nil {
		fmt.Println("Error starting torrent client")
	}

	return &Manager{client: client}
}

// add download
// start ook torrent meteen
func (manager Manager) add_torrent(magnetLink string) *torrent.Torrent {
	t, err := manager.client.AddMagnet(magnetLink)
	if err != nil {
		fmt.Println("Error adding torrent")
	}

	fmt.Println("Getting metadata")
	<-t.GotInfo()
	t.DownloadAll()
	fmt.Println("Download starting")

	return t
}
