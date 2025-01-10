package main

import (
	"bufio"
	"fmt"
	"os"
	"os/exec"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	fmt.Print("Enter the full path to exe: ")
	input, _ := reader.ReadString('\n')
	input = strings.TrimSpace(input)

	// C:\Riot Games\Riot Client\RiotClientServices.exe
	info, err := os.Stat(input)
	if err != nil {
		if os.IsNotExist(err) {
			fmt.Printf("File does not exist: %s\n", input)
		} else {
			fmt.Printf("Error accessing file: %s\n", input)
		}

	}

	printFileInfo(info)

	cmd := exec.Command(input)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	fmt.Printf("Running %s\n", input)
	err = cmd.Run()
	if err != nil {
		fmt.Printf("Error running executable: %v\n", err)
	}
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
