document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const gameBoxes = document.querySelectorAll('.game-library-game-box');

    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.trim().toLowerCase();

        gameBoxes.forEach(gameBox => {
            const gameName = gameBox.querySelector('h1').textContent.toLowerCase();
            if (gameName.includes(searchTerm)) {
                gameBox.style.display = 'block';
            } else {
                gameBox.style.display = 'none';
            }
        });
    });
});