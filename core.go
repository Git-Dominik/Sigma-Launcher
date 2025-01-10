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

	info, err := os.Stat(input)
	if err != nil {
		if os.IsNotExist(err) {
			fmt.Printf("File does not exist: %s\n", input)
		} else {
			fmt.Printf("Error accessing file: %s\n", input)
		}
	}
	fmt.Println()
	fmt.Printf("| %-15s: %s\n", "File Name", info.Name())
	fmt.Printf("| %-15s: %d\n", "Size (bytes)", info.Size())
	fmt.Printf("| %-15s: %s\n", "Permissions", info.Mode())
	fmt.Printf("| %-15s: %s\n", "Last Modified", info.ModTime())
	fmt.Printf("| %-15s: %v\n", "Is Directory", info.IsDir())
	fmt.Println()

	cmd := exec.Command(input)

	fmt.Printf("Running %s\n", input)
	err = cmd.Run()
	if err != nil {
		fmt.Printf("Error running executable: %v\n", err)
	}
}
