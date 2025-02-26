import { AddGame, GetLibrary, GetDownloads, StartDownload, ScrapeTorrents, GetGames, GetCover } from "../../wailsjs/go/main/App";
import { gameButton, setDownloadItem } from "./interface";
import { toggleDownload } from "./isDownloading";

let libraryList;
let discoverList;
let favoriteList;
let recentList;

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

async function updateLibrary(library) {
    // clear oude games
    libraryList.textContent = "";

    // loop over nieuwe
    for (const [appid, gameData] of Object.entries(library)) {
        console.log(gameData);

        let steamString = await GetJSON(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
        if (steamString === undefined) {
            console.log("Error getting steam data");
            continue;
        }

        let steamData = JSON.parse(steamString)[appid].data;
        libraryList.appendChild(
            gameButton(
                steamData.name,
                steamData.publishers[0],
                `https://shared.loudflare.steamstatic.com/store_item_assets/steam/apps/${appid}/library_600x900.jpg`,
                appid
            ),
        );
    }

    console.log("Libary has been updated");
}

async function addGames(loaded, amount) {
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
        let steamString = await GetJSON(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
        if (steamString === undefined) {
            console.log("Error getting steam data");
            continue;
        }

        discoverList.appendChild(
            gameButton(
                game.name,
                steamData.publishers[0],
                `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.appid}/library_hero.jpg`,
                game.appid
            ),
        );
    }

    return currentLoaded;
}

async function updateFavorites(library) {
    favoriteList.innerHTML = "";

    for (const [appid, game] of Object.entries(library)) {
        if (game.favorite === true) {
            let steamString = await GetJSON(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
            if (steamString === undefined) {
                console.log("Error getting steam data");
                continue;
            }

            favoriteList.appendChild(
                gameButton(
                    game.name,
                    steamData.publishers[0],
                    `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.appid}/library_hero.jpg`,
                    game.appid
                ),
            );
        }
    }

    console.log("All favorites have loaded");
}

// tijdelijk pakken we de eerste van de downloads
async function checkDownloads() {
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

async function refresh() {
    const library = await GetLibrary();
    console.log(library);

    updateLibrary(library);
    updateFavorites(library);
}

document.addEventListener("DOMContentLoaded", async () => {
    libraryList = document.querySelector(".game-library-container");
    discoverList = document.querySelector(".game-discover-container");
    favoriteList = document.querySelector(".game-favorites-container");
    recentList = document.querySelector(".game-recent-container");

    /*let loaded = 0;
    loaded = addGames(loaded, 30);

    // Infinite scroll
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
            loaded = addGames(loaded, 20);
        }
    });*/

    refresh();

    document.querySelector(".game-add-button").addEventListener("click", async () => {
        await AddGame();
        refresh();
    });

    console.log(await ScrapeTorrents("goat simulator 3"));
    
    var games = await GetGames("fields id, name, cover; sort rating desc; limit 10;");

    for (const game of games) {
        console.log(await GetCover(game.cover));
    }

    // await StartDownload("magnet:?xt=urn:btih:9FB620FFB9CB0D6F68AAA042DF9741D68221BF2D");

    setInterval(checkDownloads, 1000);
});
