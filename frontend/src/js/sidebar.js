document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar-container");
    const gamePage = document.querySelector(".game-page");
    const toggleButton = document.getElementById("sidebar-toggle-btn");

    function adjustGamePage() {
        const isCollapsed = sidebar.classList.contains("collapsed");
        const sidebarWidth = isCollapsed ? 0 : 250;
        gamePage.style.left = `${sidebarWidth}px`;
        gamePage.style.width = `calc(100% - ${sidebarWidth}px)`;
    }

    toggleButton.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        adjustGamePage();
    });

    adjustGamePage();
});
