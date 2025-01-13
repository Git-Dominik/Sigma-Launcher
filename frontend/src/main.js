import { AddGame, GetLibrary, GetJSON } from "../wailsjs/go/main/App";
import { gameButton } from "./interface";

var gameList = document.querySelector(".game-library-container");
var games;

async function updateLibrary() {
    // clear oude games
    gameList.textContent = "";

    // loop over nieuwe
    const library = await GetLibrary();
    for (const [appid, gameData] of Object.entries(library)) {
        console.log(gameData);

        var steamData = JSON.parse(await GetJSON(`https://store.steampowered.com/api/appdetails?appids=${appid}`))[appid].data;
        console.log(steamData);
        
        gameList.appendChild(
            gameButton(
                steamData.name,
                steamData.publishers[0],
                `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900.jpg`
            ),
        );
    }
}

function addGames(loaded, amount) {
    const newAmount = loaded + amount;
    const pageGames = Object.values(games).slice(loaded, newAmount);

    pageGames.forEach((game) => {
        console.log(game);
        if (game.name === '') {
            return;
        }

        gameList.appendChild(
            gameButton(
                game.name,
                "Game Description",
                `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.appid}/library_hero.jpg`,
            ),
        );
    });

    return newAmount;
}


document.addEventListener("DOMContentLoaded", async () => {
    /*games = JSON.parse(await GetGames()).applist.apps;

    var loaded = 0;
    loaded = addGames(loaded, 30);

    // Infinite scroll
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            loaded = addGames(loaded, 20);
        }
    });*/

    await updateLibrary();
});

document.querySelector(".game-add-button").addEventListener("click", async () => {
    AddGame();
});