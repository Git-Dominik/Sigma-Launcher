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

// start torrent download
// ik doe ook dat de torrent returned want vrijheid
func (manager Manager) start_torrent(magnetLink string) *torrent.Torrent {
	torrent, _ := manager.client.AddMagnet(magnetLink)
	print("Added torrent")
	<-torrent.GotInfo()

	fmt.Println("Downloading torrent")
	torrent.DownloadAll()

	return torrent
}
