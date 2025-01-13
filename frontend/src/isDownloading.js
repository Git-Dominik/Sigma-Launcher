let isDownloading = true;

function toggleDownload() {
    const downloadItem = document.getElementById('download-item');
    const placeholderText = document.getElementById('placeholder-text');

    if (isDownloading) {
        downloadItem.style.display = 'flex';
        placeholderText.style.display = 'none';
    } else {
        downloadItem.style.display = 'none';
        placeholderText.style.display = 'block';
    }

    isDownloading = !isDownloading;
}

toggleDownload();