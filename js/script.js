document.addEventListener('DOMContentLoaded', () => {
    const galleryPopup = document.getElementById('galleryPopup');
    const closeButton = galleryPopup.querySelector('.close-popup');
    const viewMoreButton = document.querySelector('.view-more-button');
    const header = document.querySelector('header');

    function toggleDisplay(element, displayStyle) {
        element.style.display = displayStyle;
    }

    function closePopup(popup) {
        toggleDisplay(popup, 'none');
        document.body.classList.remove('no-scroll');
        header.classList.remove('hidden');
    }

    function openPopup(popup) {
        toggleDisplay(popup, 'flex');
        document.body.classList.add('no-scroll');
        header.classList.add('hidden');
    }

    viewMoreButton.addEventListener('click', () => {
        openPopup(galleryPopup);
    });

    closeButton.addEventListener('click', () => {
        closePopup(galleryPopup);
    });

    galleryPopup.addEventListener('click', (event) => {
        if (event.target === galleryPopup) {
            closePopup(galleryPopup);
        }
    });
});