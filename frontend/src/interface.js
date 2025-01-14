import { StartGame } from "../wailsjs/go/main/App";

let percentage_element = document.querySelector(".progress-percentage");
let bar_element = document.querySelector(".progress-bar-fill");
let speed_element = document.querySelector("#download-speed");
let download_image = document.querySelector("#download-image");
let download_name = document.querySelector(".game-name");

export function gameButton(title, description, image, appid) {
    const gameBox = document.createElement('div');
    gameBox.className = 'game-library-game-box';
    gameBox.style.backgroundImage = `url(${image})`;
    gameBox.style.backgroundSize = 'cover';
    gameBox.style.backgroundPosition = 'center';

    gameBox.onclick = () => {
        StartGame(Number.parseInt(appid));
    };

    gameBox.innerHTML = `
        <div class="game-box-info">
            <div class="text-container">
                <h1>${title}</h1>
                <p>${description}</p>
            </div>
            <button><i class="fa-solid fa-ellipsis"></i></button>
        </div>
    `;  

    return gameBox;
}

export function setDownloadItem(procentage, speed, name) {
    bar_element.style.width = `${procentage}%`;
    speed_element.innerHTML = speed;
    download_name.innerHTML = name;
    percentage_element.innerHTML = `${procentage}%`;
}
