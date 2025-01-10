package main

import (
	"fmt"

	"github.com/anacrolix/torrent"
)

const (
	RetrievingMetadata = 1
	Downloading        = 2
	Seeding            = 3
	Stopped            = 4
	Checking           = 5
)

type Manager struct {
	client *torrent.Client
}

func start_client() *Manager {
	client, err := torrent.NewClient(nil)
	if err != nil {
		fmt.Println("Error starting torrent client")
	}

	return &Manager{client: client}
}

func (manager Manager) start_torrent(magnetLink string) {
	torrent, _ := manager.client.AddMagnet(magnetLink)
	print("Added torrent")

	<-torrent.GotInfo()

	fmt.Println("Downloading torrent")

	torrent.DownloadAll()
	manager.client.WaitAll()

	fmt.Println("Downloaded torrent")
}
