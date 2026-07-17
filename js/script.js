document.addEventListener('DOMContentLoaded', () => {
    const galleryPopup = document.getElementById('galleryPopup');
    const closeBtn = document.querySelector('.close-popup');
    const viewMoreBtn = document.querySelector('.view-more-button');
    const popupGrid = document.querySelector('.popup-grid');
    const body = document.body;

    const totalImages = 14;
    let isPopulated = false;

    // Open popup
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            if (!isPopulated && popupGrid) {
                for (let i = 1; i <= totalImages; i++) {
                    const imgNum = i.toString().padStart(2, '0');
                    const img = document.createElement('img');
                    img.src = `img/${imgNum}.jpg`;
                    img.alt = `Trabalho de unhas ${i}`;
                    img.loading = 'lazy';
                    popupGrid.appendChild(img);
                }
                isPopulated = true;
            }
            if (galleryPopup) {
                galleryPopup.style.display = 'flex';
                body.classList.add('no-scroll');
            }
        });
    }

    // Close popup function
    const closePopup = () => {
        if (galleryPopup) {
            galleryPopup.style.display = 'none';
            body.classList.remove('no-scroll');
        }
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

    // Close on click outside
    if (galleryPopup) {
        galleryPopup.addEventListener('click', (e) => {
            if (e.target === galleryPopup) closePopup();
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
    });

    // Auto update year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Scroll header logic
    const header = document.querySelector('header');
    if (header) {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY <= 50) {
                header.classList.remove('header-hidden');
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scroll Down
                header.classList.add('header-hidden');
            } else if (currentScrollY < lastScrollY) {
                // Scroll Up
                header.classList.remove('header-hidden');
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }
});