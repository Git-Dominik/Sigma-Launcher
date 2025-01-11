import { AddGame, GetLibrary } from "../wailsjs/go/main/App";

var gameList = document.getElementById("games");

function updateLibrary() {
    alert("Library updating");

    // clear oude games
    gameList.textContent = "";

    GetLibrary().then((library) => {
        // loop over nieuwe
        library.forEach((game) => {
            console.log(game);

            const app = document.createElement("img");
            app.src =
                `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.appid}/library_hero.jpg`;
            app.width = 400;
            app.alt = game.appid;

            gameList.appendChild(app);
        });

        // plus knop
        const input = document.createElement("button");
        input.textContent = "Add Game";
        input.onclick = async () => {
            var ok = await AddGame();
            if (ok) {
                updateLibrary();
            }
        }

        gameList.appendChild(input);
    });
}

updateLibrary();
