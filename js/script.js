document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. ATUALIZAÇÃO DO ANO AUTOMÁTICA
    // ==========================================================================
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================================================
    // 2. INDICADOR DE SCROLL (DESAPARECER AO ROLAR)
    // ==========================================================================
    const scrollIndicator = document.querySelector(".scroll-indicator");
    if (scrollIndicator) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                scrollIndicator.style.opacity = "0";
            } else {
                scrollIndicator.style.opacity = "0.7";
            }
        });
    }

    // ==========================================================================
    // 3. ANIMAÇÃO DE ENTRADA AO ROLAR (Scroll Reveal Nativo)
    // ==========================================================================
    const elementosParaRevelar = [
        ...document.querySelectorAll(".service-card"),
        ...document.querySelectorAll(".benefits-list li"),
        document.querySelector(".gallery-preview"),
        document.querySelector(".benefits-container"),
        document.querySelector(".contact-box")
    ];

    // Adiciona as classes bases e os delays sequenciais dinamicamente
    elementosParaRevelar.forEach((el, index) => {
        if (el) {
            el.classList.add("reveal");
            
            // Se forem os cards de serviço, cria o efeito em cascata (delay individual)
            if (el.classList.contains("service-card")) {
                el.classList.add(`delay-${(index % 4) + 1}`);
            }
        }
    });

    const checarScrollReveal = () => {
        const gatilhoAtivacao = (window.innerHeight / 5) * 4;
        
        elementosParaRevelar.forEach(el => {
            if (el) {
                const topoElemento = el.getBoundingClientRect().top;
                if (topoElemento < gatilhoAtivacao) {
                    el.classList.add("active");
                }
            }
        });
    };

    window.addEventListener("scroll", checarScrollReveal);
    checarScrollReveal(); // Dispara uma vez no início caso haja elementos visíveis

    // ==========================================================================
    // 4. POP-UP DA GALERIA (Com carregamento Lazy com Fade-In progressivo)
    // ==========================================================================
    const viewMoreBtn = document.querySelector(".view-more-button");
    const galleryPopup = document.getElementById("galleryPopup");
    const closePopupBtn = document.querySelector(".close-popup");
    const popupGrid = document.querySelector(".popup-grid");

    const imagensPortfolio = [];
    for (let i = 1; i <= 14; i++) {
        const numeroFormatado = i < 10 ? `0${i}` : i;
        imagensPortfolio.push(`img/${numeroFormatado}.jpg`);
    }

    if (viewMoreBtn && galleryPopup && popupGrid) {
        viewMoreBtn.onclick = () => {
            popupGrid.innerHTML = "";

            imagensPortfolio.forEach((srcImg, index) => {
                const img = document.createElement("img");
                img.src = srcImg;
                img.alt = `Trabalho realizado ${index + 1}`;
                popupGrid.appendChild(img);

                // Efeito Fade-In Progressivo: Dispara o efeito quando a imagem termina de baixar
                img.onload = () => {
                    // Adiciona um pequeno atraso em cascata baseado no índice da imagem
                    setTimeout(() => {
                        img.classList.add("loaded");
                    }, index * 60); 
                };
            });

            galleryPopup.style.display = "flex";
            document.body.classList.add("no-scroll");
        };
    }

    if (galleryPopup) {
        const fecharPopup = () => {
            galleryPopup.style.display = "none";
            document.body.classList.remove("no-scroll");
        };

        if (closePopupBtn) closePopupBtn.onclick = fecharPopup;
        galleryPopup.onclick = (e) => {
            if (e.target === galleryPopup) fecharPopup();
        };
    }

    // ==========================================================================
    // 5. EFETUAR OCULTAMENTO DO MENU SUPERIOR AO ROLAR
    // ==========================================================================
    const header = document.querySelector("header");
    let ultimoScroll = window.scrollY || window.pageYOffset;

    window.addEventListener("scroll", () => {
        const scrollAtual = window.scrollY || window.pageYOffset;
        if (scrollAtual < 0) return; 

        if (scrollAtual > ultimoScroll && scrollAtual > 100) {
            header.classList.add("header-hidden");
        } else if (scrollAtual < ultimoScroll) {
            header.classList.remove("header-hidden");
        }
        ultimoScroll = scrollAtual;
    }, { passive: true });

    // ==========================================================================
    // 6. EFEITO 3D INTERATIVO (Tilt) NOS CARDS DE SERVIÇO (Somente Desktop)
    // ==========================================================================
    const cards = document.querySelectorAll(".service-card");

    if (window.innerWidth > 768) { // Bloqueia em celulares para otimizar desempenho de toque
        cards.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const limitesCard = card.getBoundingClientRect();
                const cardLargura = limitesCard.width;
                const cardAltura = limitesCard.height;
                
                // Encontra a posição do mouse em relação ao centro exato do card
                const mouseX = e.clientX - limitesCard.left - (cardLargura / 2);
                const mouseY = e.clientY - limitesCard.top - (cardAltura / 2);
                
                // Calcula a rotação (multiplicadores baixos evitam distorções exageradas)
                const rotacaoX = ((mouseY / cardAltura) * -1) * 20; // Max 20 graus
                const rotacaoY = (mouseX / cardLargura) * 20;

                card.style.transform = `rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg) translateZ(10px)`;
            });

            // Reseta a posição tridimensional quando o mouse sai de cima
            card.addEventListener("mouseleave", () => {
                card.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0)`;
            });
        });
    }
});
