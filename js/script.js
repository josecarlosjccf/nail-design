document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos que vamos usar
    const galleryPopup = document.getElementById('galleryPopup');
    const closeButton = galleryPopup?.querySelector('.close-popup');
    const viewMoreButton = document.querySelector('.view-more-button');
    const body = document.body;
    const popupGrid = document.querySelector('.popup-grid');
    const header = document.querySelector('header');

    // Lista de todas as 14 imagens da galeria
    const allImages = [
        { src: 'img/01.jpg', alt: 'Trabalho de unhas 1' },
        { src: 'img/02.jpg', alt: 'Trabalho de unhas 2' },
        { src: 'img/03.jpg', alt: 'Trabalho de unhas 3' },
        { src: 'img/04.jpg', alt: 'Trabalho de unhas 4' },
        { src: 'img/05.jpg', alt: 'Trabalho de unhas 5' },
        { src: 'img/06.jpg', alt: 'Trabalho de unhas 6' },
        { src: 'img/07.jpg', alt: 'Trabalho de unhas 7' },
        { src: 'img/08.jpg', alt: 'Trabalho de unhas 8' },
        { src: 'img/09.jpg', alt: 'Trabalho de unhas 9' },
        { src: 'img/10.jpg', alt: 'Trabalho de unhas 10' },
        { src: 'img/11.jpg', alt: 'Trabalho de unhas 11' },
        { src: 'img/12.jpg', alt: 'Trabalho de unhas 12' },
        { src: 'img/13.jpg', alt: 'Trabalho de unhas 13' },
        { src: 'img/14.jpg', alt: 'Trabalho de unhas 14' }
    ];
    
    // Função para popular o popup com todas as imagens
    function populatePopupGrid() {
        if (!popupGrid) return;
        
        popupGrid.innerHTML = '';
        
        allImages.forEach(image => {
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.classList.add('popup-image');
            popupGrid.appendChild(img);
        });
    }

    // Função para abrir o popup da galeria
    function openGalleryPopup() {
        if (!galleryPopup) return;
        
        // Oculta o cabeçalho com transição
        if (header) {
            header.classList.add('header-hidden');
        }

        // Popula o grid se ainda não foi populado
        if (popupGrid && popupGrid.children.length === 0) {
            populatePopupGrid();
        }

        galleryPopup.style.display = 'flex';
        body.classList.add('no-scroll');
    }

    // Função para fechar o popup da galeria
    function closeGalleryPopup() {
        if (!galleryPopup) return;

        // Mostra o cabeçalho novamente
        if (header) {
            header.classList.remove('header-hidden');
        }

        galleryPopup.style.display = 'none';
        body.classList.remove('no-scroll');
    }

    // Adiciona evento de clique no botão "Ver mais fotos"
    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', openGalleryPopup);
    }

    // Adiciona evento de clique no botão de fechar do popup
    if (closeButton) {
        closeButton.addEventListener('click', closeGalleryPopup);
    }
    
    // Fecha o popup ao clicar fora do conteúdo
    if (galleryPopup) {
        galleryPopup.addEventListener('click', (e) => {
            if (e.target === galleryPopup) {
                closeGalleryPopup();
            }
        });
    }

    // Fecha o popup com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && galleryPopup && galleryPopup.style.display === 'flex') {
            closeGalleryPopup();
        }
    });

    // --- Nova lógica para esconder o cabeçalho ao rolar a página ---
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        // Ignora o evento se a galeria estiver aberta
        if (galleryPopup.style.display === 'flex') {
            return;
        }

        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Rolando para baixo, esconde o cabeçalho
            header.classList.add('header-hidden');
        } else {
            // Rolando para cima, mostra o cabeçalho
            header.classList.remove('header-hidden');
        }
        
        lastScrollY = currentScrollY;
    });
});