document.addEventListener('DOMContentLoaded', function() {
    // Seleciona os elementos que vamos usar
    const galleryPopup = document.getElementById('galleryPopup');
    const closeButton = galleryPopup?.querySelector('.close-popup');
    const viewMoreButton = document.querySelector('.view-more-button');
    const body = document.body;
    const popupGrid = document.querySelector('.popup-grid');
    const header = document.querySelector('header');
    const themeToggle = document.querySelector('.theme-toggle');

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

    // Variáveis para controle do scroll
    let lastScrollY = window.scrollY;
    let isPopupOpen = false;
    let scrollTimer = null;
    let scrollTimeout = null;

    // ===== FUNÇÕES DO POPUP DA GALERIA =====
    
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
        
        isPopupOpen = true;
        
        // Oculta o cabeçalho imediatamente
        if (header) {
            header.classList.add('header-hidden');
        }

        // Popula o grid se ainda não foi populado
        if (popupGrid && popupGrid.children.length === 0) {
            populatePopupGrid();
        }

        galleryPopup.style.display = 'flex';
        body.classList.add('no-scroll');
        
        // Força um reflow para garantir que as transições funcionem
        galleryPopup.offsetHeight;
    }

    // Função para fechar o popup da galeria
    function closeGalleryPopup() {
        if (!galleryPopup) return;

        isPopupOpen = false;

        galleryPopup.style.display = 'none';
        body.classList.remove('no-scroll');
        
        // Aguarda um pouco antes de verificar se deve mostrar o header
        setTimeout(() => {
            if (!isPopupOpen) {
                const currentScrollY = window.scrollY;
                // Mostra o header se estiver no topo ou se rolou para cima
                if (currentScrollY <= 50 || currentScrollY < lastScrollY) {
                    if (header) {
                        header.classList.remove('header-hidden');
                    }
                }
            }
        }, 100);
    }

    // ===== CONTROLE DO HEADER COM SCROLL =====

    function handleScroll() {
        // Ignora o evento se a galeria estiver aberta
        if (isPopupOpen) {
            return;
        }

        const currentScrollY = window.scrollY;
        
        // Se estiver no topo da página (primeiros 50px), sempre mostra o header
        if (currentScrollY <= 50) {
            if (header) {
                header.classList.remove('header-hidden');
            }
            lastScrollY = currentScrollY;
            return;
        }
        
        // Se rolou para baixo mais de 100px, oculta o header
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            if (header) {
                header.classList.add('header-hidden');
            }
        }
        // Se rolou para cima, mostra o header
        else if (currentScrollY < lastScrollY) {
            if (header) {
                header.classList.remove('header-hidden');
            }
        }
        
        lastScrollY = currentScrollY;
    }

    // ===== EVENT LISTENERS =====

    // Scroll com throttle otimizado
    window.addEventListener('scroll', function() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(handleScroll, 10);
    }, { passive: true });

    // Botão "Ver mais fotos"
    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', openGalleryPopup);
    }

    // Botão fechar popup
    if (closeButton) {
        closeButton.addEventListener('click', closeGalleryPopup);
    }
    
    // Fechar popup ao clicar fora do conteúdo
    if (galleryPopup) {
        galleryPopup.addEventListener('click', (e) => {
            if (e.target === galleryPopup) {
                closeGalleryPopup();
            }
        });
    }

    // Fechar popup com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isPopupOpen) {
            closeGalleryPopup();
        }
    });

    // ===== CONTROLE DO TEMA =====
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Atualiza o ícone
            this.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
        });

        // Carrega tema salvo
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    // ===== ANIMAÇÕES DE ENTRADA =====
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observa elementos com classes de animação
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });

    // ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== OTIMIZAÇÕES DE PERFORMANCE =====
    
    // Lazy loading para imagens da galeria popup
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.add('loaded');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Preload de imagens críticas
    function preloadCriticalImages() {
        const criticalImages = [
            'img/01.jpg',
            'img/02.jpg',
            'img/03.jpg'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // ===== FUNCIONALIDADES EXTRAS =====

    // Detecta mudanças na orientação do dispositivo
    function handleOrientationChange() {
        setTimeout(() => {
            if (isPopupOpen && galleryPopup) {
                // Reajusta o popup após mudança de orientação
                galleryPopup.scrollTop = 0;
            }
        }, 100);
    }

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    // Previne zoom duplo toque no iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // ===== INICIALIZAÇÃO =====
    
    // Setup inicial
    setupLazyLoading();
    preloadCriticalImages();
    
    // Garante que o header esteja visível no carregamento inicial
    if (header) {
        header.classList.remove('header-hidden');
    }
});