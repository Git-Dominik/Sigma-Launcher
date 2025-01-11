export function gameButton(title, description, image) {
    const gameBox = document.createElement('div');
    gameBox.className = 'game-library-game-box';
    gameBox.style.backgroundImage = `url(${image})`;
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
