const games = [
    { name: "Fortnite", description: "Epic Games" },
    { name: "Roblox", description: "Skibidi" },
];

function createGameBox(game) {
    const gameBox = document.createElement("div");
    gameBox.classList.add("game-library-game-box");

    const gameBoxInfo = document.createElement("div");
    gameBoxInfo.classList.add("game-box-info");

    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");

    const gameName = document.createElement("h1");
    gameName.textContent = game.name;

    const gameDescription = document.createElement("p");
    gameDescription.textContent = game.description;

    const ellipsisButton = document.createElement("button");
    ellipsisButton.innerHTML = "<i class='fa-solid fa-ellipsis'></i>";

    textContainer.appendChild(gameName);
    textContainer.appendChild(gameDescription);
    gameBoxInfo.appendChild(textContainer);
    gameBoxInfo.appendChild(ellipsisButton);
    gameBox.appendChild(gameBoxInfo);

    return gameBox;
}

function populateLibrary() {
    const libraryContainer = document.querySelector(".game-library-container");
    libraryContainer.innerHTML = "";

    games.forEach(game => {
        const gameBox = createGameBox(game);
        libraryContainer.appendChild(gameBox);
    });
}

function filterGames(searchTerm) {
    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredGames;
}

function updateLibrary(searchTerm) {
    const libraryContainer = document.querySelector(".game-library-container");
    libraryContainer.innerHTML = "";

    const filteredGames = filterGames(searchTerm);
    filteredGames.forEach(game => {
        const gameBox = createGameBox(game);
        libraryContainer.appendChild(gameBox);
    });
}

document.addEventListener("DOMContentLoaded", populateLibrary);

document.getElementById("search-input").addEventListener("input", (event) => {
    const searchTerm = event.target.value;
    updateLibrary(searchTerm);
});

const libraryContainer = document.querySelector(".game-library-container");
libraryContainer.addEventListener("click", (event) => {
    const gameBox = event.target.closest(".game-library-game-box");
    if (gameBox) {
        const gameTitle = gameBox.querySelector(".text-container h1").textContent;
        const gameDescription = gameBox.querySelector(".text-container p").textContent;

        const gamePage = document.getElementById("game-page");
        const gamePageTitle = document.getElementById("game-page-title");
        const gamePageDescription = document.getElementById("game-page-description");

        gamePageTitle.textContent = gameTitle;
        gamePageDescription.textContent = gameDescription;
        gamePage.style.display = "block";
    }
});