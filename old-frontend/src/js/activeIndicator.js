document.addEventListener("DOMContentLoaded", () => {
    const pageToItemId = {
        "#library": "library",
        "#discover": "discover",
        "#favorites": "favorites",
        "#recent": "recent",
    };

    const contentSections = {
        library: document.getElementById("library-content"),
        discover: document.getElementById("discover-content"),
        favorites: document.getElementById("favorites-content"),
        recent: document.getElementById("recent-content"),
    };

    const gamePage = document.getElementById("game-page");
    const libraryButton = document.getElementById("library");

    function setActiveItem() {
        const hash = window.location.hash || "#library";
        const activeItemId = pageToItemId[hash];

        if (activeItemId) {
            document.querySelectorAll(".sidebar-item").forEach((item) => {
                item.classList.remove("active");
            });

            const activeItem = document.getElementById(activeItemId);
            if (activeItem) {
                activeItem.classList.add("active");
            }

            Object.values(contentSections).forEach((section) => {
                section.style.display = "none";
            });

            contentSections[activeItemId].style.display = "block";

            if (activeItemId === "library" && gamePage.style.display === "block") {
                gamePage.style.display = "none";
            }
        }
    }

    window.addEventListener("hashchange", setActiveItem);
    setActiveItem();

    const gameBoxes = document.querySelectorAll(".game-library-game-box");
    gameBoxes.forEach((gameBox) => {
        gameBox.addEventListener("click", () => {
            const gameTitle = gameBox.querySelector(".text-container h1").textContent;
            const gameDescription = gameBox.querySelector(".text-container p").textContent;

            const gamePageTitle = document.getElementById("game-page-title");
            const gamePageDescription = document.getElementById("game-page-description");

            gamePageTitle.textContent = gameTitle;
            gamePageDescription.textContent = gameDescription;
            gamePage.style.display = "block";
        });
    });

    const gameBoxButtons = document.querySelectorAll(".game-box-info button");
    gameBoxButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.stopPropagation();
        });
    });

    const closeGamePageButton = document.getElementById("close-game-page");
    if (closeGamePageButton) {
        closeGamePageButton.addEventListener("click", () => {
            gamePage.style.display = "none";
        });
    }

    libraryButton.addEventListener("click", () => {
        if (gamePage.style.display === "block") {
            gamePage.style.display = "none";
        }
    });
});