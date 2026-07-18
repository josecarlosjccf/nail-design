document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. ATUALIZAÇÃO DO ANO AUTOMÁTICA
    // ==========================================================================
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================================================
    // 2. ANIMAÇÃO DE ENTRADA AO ROLAR (Scroll Reveal Nativo)
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
    checarScrollReveal();

    // ==========================================================================
    // 3. POP-UP DA GALERIA
    // ==========================================================================
    const viewMoreBtn = document.querySelector(".view-more-button");
    const galleryPopup = document.getElementById("galleryPopup");
    const closePopupBtn = document.querySelector(".close-popup");
    const popupImages = document.querySelectorAll(".popup-grid img");

    if (viewMoreBtn && galleryPopup) {
        viewMoreBtn.onclick = () => {
            galleryPopup.style.display = "flex";
            document.body.classList.add("no-scroll");

            popupImages.forEach((img, index) => {
                setTimeout(() => {
                    img.classList.add("loaded");
                }, index * 60);
            });
        };
    }

    if (galleryPopup) {
        const fecharPopup = () => {
            galleryPopup.style.display = "none";
            document.body.classList.remove("no-scroll");
            popupImages.forEach(img => img.classList.remove("loaded"));
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
    // 5. EFEITO 3D INTERATIVO (Tilt) - AGORA APENAS PARA DESKTOP (PC)
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
    // Toda a lógica de toque e giroscópio mobile bugada foi completamente removida.
});
