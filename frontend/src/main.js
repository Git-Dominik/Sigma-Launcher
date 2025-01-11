import { AddGame, GetLibrary } from "../wailsjs/go/main/App";
import { gameButton } from "./interface";

var gameList = document.querySelector(".game-library-container");

async function updateLibrary(container) {
    alert("Library updating");

    // clear oude games
    container.textContent = "";

    // loop over nieuwe
    const library = await GetLibrary();
    const games = Array.isArray(library) ? library : Object.values(library);
    games.forEach((game) => {
        console.log(game);
        gameList.appendChild(
            gameButton(
                "Game Title",
                "Game Description",
                `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.appid}/library_hero.jpg`,
            ),
        );
    });

    // plus knop
    /*const input = document.createElement("button");
    input.textContent = "Add Game";
    input.onclick = async () => {
        var ok = await AddGame();
        if (ok) {
            updateLibrary(container);
        }
    };

    container.appendChild(input);*/
}

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.createElement("div");
    container.id = "container";
    document.body.appendChild(container);

    // await updateLibrary(container);
});
