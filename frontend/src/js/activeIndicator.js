document.addEventListener("DOMContentLoaded", () => {
    const pageToItemId = {
        "#library": "library",
        "#discover": "discover",
        "#favorites": "favorites",
        "#recent": "recent",
    };

    const contentSections = {
        "library": document.getElementById("library-content"),
        "discover": document.getElementById("discover-content"),
        "favorites": document.getElementById("favorites-content"),
        "recent": document.getElementById("recent-content"),
    };

    function setActiveItem() {
        const hash = window.location.hash || "#library";
        const activeItemId = pageToItemId[hash];

        if (activeItemId) {
            document.querySelectorAll(".sidebar-item").forEach(item => {
                item.classList.remove("active");
            });

            const activeItem = document.getElementById(activeItemId);
            if (activeItem) {
                activeItem.classList.add("active");
            }

            Object.values(contentSections).forEach(section => {
                section.style.display = "none";
            });

            contentSections[activeItemId].style.display = "block";
        }
    }

    window.addEventListener("hashchange", setActiveItem);
    setActiveItem();

    const gameBoxes = document.querySelectorAll(".game-library-game-box");
    gameBoxes.forEach(gameBox => {
        gameBox.addEventListener("click", () => {
            const gameTitle = gameBox.querySelector(".text-container h1").textContent;
            const gameDescription = gameBox.querySelector(".text-container p").textContent;

            const gamePage = document.getElementById("game-page");
            const gamePageTitle = document.getElementById("game-page-title");
            const gamePageDescription = document.getElementById("game-page-description");

            gamePageTitle.textContent = gameTitle;
            gamePageDescription.textContent = gameDescription;
            gamePage.style.display = "block";
        });
    });

    const gameBoxButtons = document.querySelectorAll(".game-box-info button");
    gameBoxButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    });

    const closeGamePageButton = document.getElementById("close-game-page");
    if (closeGamePageButton) {
        closeGamePageButton.addEventListener("click", () => {
            const gamePage = document.getElementById("game-page");
            gamePage.style.display = "none";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const allButton = document.getElementById("all-button");
    const favoritesButton = document.getElementById("favorites-button");

    allButton.addEventListener("click", function () {
        allButton.classList.add("active");
        favoritesButton.classList.remove("active");
    });

    favoritesButton.addEventListener("click", function () {
        favoritesButton.classList.add("active");
        allButton.classList.remove("active");
    });

    allButton.classList.add("active");
});