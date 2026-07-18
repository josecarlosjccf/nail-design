document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. ATUALIZAR O ANO NO FOOTER AUTOMATICAMENTE
    // ==========================================
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // ==========================================
    // 2. CONTROLE DO POP-UP DA GALERIA DE FOTOS
    // ==========================================
    const viewMoreBtn = document.querySelector(".view-more-button");
    const galleryPopup = document.getElementById("galleryPopup");
    const closePopupBtn = document.querySelector(".close-popup");
    const popupGrid = document.querySelector(".popup-grid");

    // Gera a lista de caminhos de img/01.jpg até img/14.jpg dinamicamente
    const imagensPortfolio = [];
    for (let i = 1; i <= 14; i++) {
        // Formata o número com zero à esquerda se for menor que 10 (ex: 01, 02... 10, 11...)
        const numeroFormatado = i < 10 ? `0${i}` : i;
        imagensPortfolio.push(`img/${numeroFormatado}.jpg`);
    }

    // Função para abrir o pop-up e carregar as fotos
    if (viewMoreBtn && galleryPopup && popupGrid) {
        viewMoreBtn.addEventListener("click", () => {
            // Limpa o grid para não duplicar se abrir mais de uma vez
            popupGrid.innerHTML = "";

            // Cria cada imagem dinamicamente dentro do pop-up
            imagensPortfolio.forEach((srcImg, index) => {
                const img = document.createElement("img");
                img.src = srcImg;
                img.alt = `Trabalho realizado ${index + 1}`;
                popupGrid.appendChild(img);
            });

            // Mostra o pop-up e trava a rolagem da página de fundo
            galleryPopup.style.display = "flex";
            document.body.classList.add("no-scroll");
        });
    }

    // Função para fechar o pop-up
    if (closePopupBtn && galleryPopup) {
        const fecharPopup = () => {
            galleryPopup.style.display = "none";
            document.body.classList.remove("no-scroll");
        };

        closePopupBtn.addEventListener("click", fecharPopup);

        // Fecha também se a cliente clicar na parte escura fora do conteúdo
        galleryPopup.addEventListener("click", (e) => {
            if (e.target === galleryPopup) {
                fecharPopup();
            }
        });
    }

    // ==========================================
    // 3. EFEITO DO MENU (ESCONDER AO ROLAR PARA BAIXO)
    // ==========================================
    const header = document.querySelector("header");
    let ultimoScroll = 0;

    window.addEventListener("scroll", () => {
        const scrollAtual = window.pageYOffset || document.documentElement.scrollTop;

        // Se rolar para baixo e passou do topo do header, esconde ele
        if (scrollAtual > ultimoScroll && scrollAtual > 100) {
            header.classList.add("header-hidden");
        } else {
            // Se rolar para cima, mostra o header novamente
            header.classList.remove("header-hidden");
        }

        // Garante que o valor nunca seja negativo
        ultimoScroll = scrollAtual <= 0 ? 0 : scrollAtual;
    });
});
