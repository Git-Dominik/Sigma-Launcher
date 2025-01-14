import { AddGame, GetLibrary, GetJSON, GetDownloads } from "../wailsjs/go/main/App";
import { gameButton } from "./interface";

var gameList;
var games;

function humanFileSize(bytes) {
    const thresh = 1000;
  
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }
  
    const units = ['kB/s', 'MB/s', 'GB/s', 'TB/s'];
    let u = -1;
    const r = 10;
  
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  
    return bytes.toFixed(1) + ' ' + units[u];
}

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
                `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900.jpg`,
                appid
            ),
        );
    }
}

function addGames(loaded, amount) {
    const newAmount = loaded + amount;
    const pageGames = Object.values(games).slice(loaded, newAmount);

    for (const game of pageGames) {
        console.log(game);
        if (game.name === '') {
            continue;
        }

        gameList.appendChild(
            gameButton(
                game.name,
                "Game Description",
                `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.appid}/library_hero.jpg`,
                game.appid
            ),
        );
    }

    return newAmount;
}


document.addEventListener("DOMContentLoaded", async () => {
    gameList = document.querySelector(".game-library-container");
    games = await GetJSON("https://api.steampowered.com/ISteamApps/GetAppList/v2");
    console.log(games);

    /*var loaded = 0;
    loaded = addGames(loaded, 30);

    // Infinite scroll
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            loaded = addGames(loaded, 20);
        }
    });*/

    await updateLibrary();
    
    // const startData = await StartDownload("magnet:?xt=urn:btih:625174AAD7E1643AC2BA528FB3DB56CB4DE77D06");
    // console.log(startData);

    async function check() {
        const downloads = await GetDownloads();
        for (const download of downloads) {
            console.log(download);
            console.log(humanFileSize(download.Speed));
        }
    }

    window.setInterval(check, 1000)
});

document.querySelector(".game-add-button").addEventListener("click", () => {
    AddGame();
    updateLibrary();
});