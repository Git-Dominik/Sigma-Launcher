const currentPage = window.location.pathname.split('/').pop() || 'index.html';

const pageToItemId = {
    'index.html': 'discover',
    'discover.html': 'discover',
    'favorites.html': 'favorites',
    'recent.html': 'recent',
};

function setActiveItem() {
    const activeItemId = pageToItemId[currentPage];

    if (activeItemId) {
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });

        const activeItem = document.getElementById(activeItemId);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }
}

setActiveItem();