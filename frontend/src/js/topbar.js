document.getElementById('minimize-btn').addEventListener('click', () => {
    window.runtime.WindowMinimise();
});

document.getElementById('maximize-btn').addEventListener('click', () => {
    window.runtime.WindowToggleMaximise();
});

document.getElementById('close-btn').addEventListener('click', () => {
    window.runtime.Quit();
});