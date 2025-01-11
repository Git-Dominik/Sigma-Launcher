import { AddGame, GetLibrary } from "../wailsjs/go/main/App";

function updateLibrary(container) {
    alert("Library updating");

    // clear oude games
    container.textContent = "";

    // loop over nieuwe
    GetLibrary().then((games) => {
        games.forEach((game) => {
            console.log(game);
    
            const app = document.createElement("img");
            app.src =
                `https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/${game.appid}/library_hero.jpg`;
            app.width = 400;
            app.alt = game.appid;
    
            container.appendChild(app);
        });
    })

    // plus knop
    const input = document.createElement("button");
    input.textContent = "Add Game";
    input.onclick = async () => {
        var ok = await AddGame();
        if (ok) {
            updateLibrary(container);
        }
    };

    container.appendChild(input);
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement("div");
    container.id = "container";
    document.body.appendChild(container);

    // updateLibrary(container);
});
