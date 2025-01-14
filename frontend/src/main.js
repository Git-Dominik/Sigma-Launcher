import { AddGame, GetLibrary, GetJSON, GetDownloads, StartDownload } from "../wailsjs/go/main/App";
import { gameButton, setDownloadItem } from "./interface";
import { toggleDownload } from "./isDownloading";

let libraryList;
let discoverList;
let favoriteList;
let recentList;

let games;

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
    libraryList.textContent = "";

    // loop over nieuwe
    const library = await GetLibrary();
    for (const [appid, gameData] of Object.entries(library)) {
        console.log(gameData);

        let steamData = JSON.parse(await GetJSON(`https://store.steampowered.com/api/appdetails?appids=${appid}`))[appid].data;
        libraryList.appendChild(
            gameButton(
                steamData.name,
                steamData.publishers[0],
                `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900.jpg`,
                appid
            ),
        );
    }

    console.log("Libary has been updated");
}

function addGames(loaded, amount) {
    let currentLoaded = loaded;
    let remainingAmount = amount;
    let validGames = [];

    while (validGames.length < amount && currentLoaded < Object.values(games).length) {
        const nextBatch = Object.values(games).slice(currentLoaded, currentLoaded + remainingAmount * 2);
        const filtered = nextBatch.filter(game => game.name !== '');
        validGames = validGames.concat(filtered.slice(0, remainingAmount - validGames.length));
        currentLoaded += nextBatch.length;
        remainingAmount = amount - validGames.length;
    }

    for (const game of validGames) {
        discoverList.appendChild(
            gameButton(
                game.name,
                "Game Description",
                `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.appid}/library_hero.jpg`,
                game.appid
            ),
        );
    }

    return currentLoaded;
}

async function fillFavorites() {
    favoriteList.innerHTML = "";

    let library = await GetLibrary();
    for (const [appid, game] of Object.entries(library)) {
        if (game.favorite === true) {
            favoriteList.appendChild(
                gameButton(
                    game.name,
                    "Game Description",
                    `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.appid}/library_hero.jpg`,
                    game.appid
                ),
            );
        }
    }

    console.log("All favorites have loaded");
}

// tijdelijk pakken we de eerste van de downloads
async function downloadCheck() {
    const download = (await GetDownloads())[0];
    if (download != undefined) {
        console.log(download);
        
        toggleDownload(true);
        setDownloadItem(download.Progress, humanFileSize(download.Speed), download.Name);
    } else {
        toggleDownload(false);
    }

    console.log("Checking downloads");
}

document.addEventListener("DOMContentLoaded", async () => {
    libraryList = document.querySelector(".game-library-container");
    discoverList = document.querySelector(".game-discover-container");
    favoriteList = document.querySelector(".game-favorites-container");
    recentList = document.querySelector(".game-recent-container");

    games = JSON.parse(await GetJSON("https://api.steampowered.com/ISteamApps/GetAppList/v2")).applist.apps;

    /*let loaded = 0;
    loaded = addGames(loaded, 30);

    // Infinite scroll
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            loaded = addGames(loaded, 20);
        }
    });*/

    await updateLibrary();

    const startData = await StartDownload("magnet:?xt=urn:btih:625174AAD7E1643AC2BA528FB3DB56CB4DE77D06");
    console.log(startData);

    updateLibrary();
    fillFavorites();

    window.setInterval(downloadCheck, 1000)
});

document.querySelector(".game-add-button").addEventListener("click", () => {
    AddGame();
    updateLibrary();
});

