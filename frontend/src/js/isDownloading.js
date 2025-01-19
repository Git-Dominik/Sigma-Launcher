

let downloadItem;
let placeholderText;

export function toggleDownload(toggle) {
    if (toggle) {
        downloadItem.style.display = "flex";
        placeholderText.style.display = "none";
        downloadItem.style.display = 'flex';
        placeholderText.style.display = 'none';
    } else {
        downloadItem.style.display = "none";
        placeholderText.style.display = "block";
        downloadItem.style.display = 'none';
        placeholderText.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    downloadItem = document.getElementById("download-item");
    placeholderText = document.getElementById("placeholder-text");
});

console.log(downloadItem);


/* enable op start dan no do*/