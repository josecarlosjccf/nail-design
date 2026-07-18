document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. ATUALIZAÇÃO DO ANO AUTOMÁTICA
    // ==========================================================================
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================================================
    // 2. ANIMAÇÃO DE ENTRADA INTELIGENTE AO ROLAR (Scroll Reveal)
    // ==========================================================================
    const elementosParaRevelar = [
        ...document.querySelectorAll(".service-card"),
        ...document.querySelectorAll(".benefits-list li"),
        document.querySelector(".gallery-preview"),
        document.querySelector(".benefits-container"),
        document.querySelector(".contact-box")
    ];

    elementosParaRevelar.forEach((el, index) => {
        if (el) {
            el.classList.add("reveal");
            if (el.classList.contains("service-card")) {
                el.classList.add(`delay-${(index % 4) + 1}`);
            }
        }
    });

    const checarScrollReveal = () => {
        const gatilhoAtivacao = window.innerHeight * 0.9; 
        elementosParaRevelar.forEach(el => {
            if (el) {
                const limites = el.getBoundingClientRect();
                if (limites.top < gatilhoAtivacao) {
                    el.classList.add("active");
                }
            }
        });
    };

    const executarPrimeiraCarga = () => {
        checarScrollReveal();
        setTimeout(checarScrollReveal, 300); 
    };

    window.addEventListener("scroll", checarScrollReveal);
    executarPrimeiraCarga();

    // ==========================================================================
    // 3. POP-UP DA GALERIA COM SKELETON E LAZY LOADING NATIVO (Item 4)
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
            popupGrid.innerHTML = ""; // Limpa a grade antiga
            galleryPopup.style.display = "flex";
            document.body.classList.add("no-scroll");

            imagensPortfolio.forEach((srcImg, index) => {
                // Cria o contêiner de estrutura do esqueleto pulsante
                const skeleton = document.createElement("div");
                skeleton.classList.add("skeleton-box");
                popupGrid.appendChild(skeleton);

                // Cria o elemento da imagem real
                const img = document.createElement("img");
                img.alt = `Trabalho realizado ${index + 1}`;
                
                // Aplica o Lazy Loading nativo para otimização de rede móvel
                img.setAttribute("loading", "lazy"); 
                
                // Define a origem depois para disparar a carga de maneira correta
                img.src = srcImg;

                img.onload = () => {
                    // Substitui o esqueleto pulsante pela imagem com transição fade-in progressiva
                    setTimeout(() => {
                        skeleton.replaceWith(img);
                        setTimeout(() => {
                            img.classList.add("loaded");
                        }, 20);
                    }, index * 50); // Delay cascata refinado para suavidade visual
                };
                
                // Tratamento caso a imagem falhe ou demore demais
                img.onerror = () => {
                    skeleton.remove();
                };
            });
        };
    }

    if (galleryPopup) {
        const fecharPopup = () => {
            galleryPopup.style.display = "none";
            document.body.classList.remove("no-scroll");
            popupGrid.innerHTML = "";
        };

        if (closePopupBtn) closePopupBtn.onclick = fecharPopup;
        galleryPopup.onclick = (e) => {
            if (e.target === galleryPopup) fecharPopup();
        };
    }

    // ==========================================================================
    // 4. OCULTAMENTO DO MENU SUPERIOR AO ROLAR
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
    // 5. EFEITO 3D INTERATIVO (Tilt) - APENAS PARA DESKTOP (PC)
    // ==========================================================================
    const cards3D = document.querySelectorAll(".service-card");

    if (window.innerWidth > 768) {
        cards3D.forEach(card => {
            card.addEventListener("mousemove", (e) => {
                const limites = card.getBoundingClientRect();
                const mouseX = e.clientX - limites.left - (limites.width / 2);
                const mouseY = e.clientY - limites.top - (limites.height / 2);
                
                const rotacaoX = ((mouseY / limites.height) * -1) * 20; 
                const rotacaoY = (mouseX / limites.width) * 20;

                card.style.transform = `rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg) translateZ(10px)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0)`;
            });
        });
    }
});
