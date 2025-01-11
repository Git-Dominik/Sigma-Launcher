document.addEventListener('DOMContentLoaded', () => {
    const pageToItemId = {
        '#discover': 'discover',
        '#favorites': 'favorites',
        '#recent': 'recent',
    };

    const contentSections = {
        'discover': document.getElementById('discover-content'),
        'favorites': document.getElementById('favorites-content'),
        'recent': document.getElementById('recent-content'),
    };

    function setActiveItem() {
        const hash = window.location.hash || '#discover';
        const activeItemId = pageToItemId[hash];

        if (activeItemId) {
            document.querySelectorAll('.sidebar-item').forEach(item => {
                item.classList.remove('active');
            });

            const activeItem = document.getElementById(activeItemId);
            if (activeItem) {
                activeItem.classList.add('active');
            }

            Object.values(contentSections).forEach(section => {
                section.style.display = 'none';
            });

            contentSections[activeItemId].style.display = 'block';
        }
    }

    window.addEventListener('hashchange', setActiveItem);
    setActiveItem();
});