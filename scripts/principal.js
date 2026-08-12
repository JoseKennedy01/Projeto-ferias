function marcarPaginaAtual() {
    const linksNav = document.querySelectorAll("nav a");
    const paginaAtual = (window.location.pathname.split("/").pop() || "principal.html").toLowerCase();

    linksNav.forEach((link) => {
        const linkPagina = link.pathname.split("/").pop().toLowerCase();
        link.classList.toggle("atual", linkPagina === paginaAtual);
    });
}

function ajustarAlturaHeader() {
    const header = document.querySelector("header");
    if (!header) return;
    document.documentElement.style.setProperty("--header-altura", header.offsetHeight + "px");
}

// ---------- Overlay do menu (mesma lógica do overlay do carrinho) ----------
function criarOverlayMenu() {
    let overlay = document.getElementById("nav-overlay");
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.id = "nav-overlay";
    overlay.className = "nav-overlay";

    // Estilos injetados aqui para não depender de alterações no CSS
    Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.5)",
        opacity: "0",
        visibility: "hidden",
        transition: "opacity 0.3s ease, visibility 0.3s ease",
        zIndex: "998"
    });

    overlay.addEventListener("click", fecharMenu);
    document.body.appendChild(overlay);
    return overlay;
}

function clickMenu() {
    const nav = document.querySelector("nav");
    const header = document.querySelector("header");
    const botao = document.getElementById("burguer");
    const overlay = criarOverlayMenu();

    ajustarAlturaHeader();

    const abrindo = !nav.classList.contains("aberto");
    nav.classList.toggle("aberto", abrindo);
    botao.textContent = abrindo ? "close" : "menu";

    // Garante que a nav (e o header, onde fica o botão de fechar) fiquem
    // SEMPRE acima do overlay, senão a página inteira trava para cliques
    if (getComputedStyle(nav).position === "static") {
        nav.style.position = "relative";
    }
    nav.style.zIndex = "999";
    if (header) header.style.zIndex = "999";

    if (abrindo) {
        overlay.style.visibility = "visible";
        overlay.style.opacity = "1";
        document.body.style.overflow = "hidden";
    } else {
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
        document.body.style.overflow = "";
    }
}

// Fecha o menu (clique no overlay/fora da nav)
function fecharMenu() {
    const nav = document.querySelector("nav");
    const botao = document.getElementById("burguer");
    const overlay = document.getElementById("nav-overlay");

    if (!nav || !nav.classList.contains("aberto")) return;

    nav.classList.remove("aberto");
    if (botao) botao.textContent = "menu";
    if (overlay) {
        overlay.style.opacity = "0";
        overlay.style.visibility = "hidden";
    }
    document.body.style.overflow = "";
}

function acionarBusca() {
    const campo = document.getElementById("busca");
    const caixa = document.querySelector("header div.busca");

    caixa.classList.add("focada");

    if (window.BuscaDropdown) {
        window.BuscaDropdown.abrir();
    } else {
        campo.focus();
    }
}

// ---------- Formulário "Fale Conosco" ----------
function inicializarFormularioContato() {
    const formulario = document.getElementById("form-contato");
    if (!formulario) return;

    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();

        // Reaproveita a validação nativa do HTML (required/minlength/maxlength).
        // Se algum campo estiver inválido, o navegador mostra o aviso padrão
        // (igual já acontece hoje) e a mensagem de sucesso não é exibida.
        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        mostrarToast("Mensagem enviada, aguarde o retorno.", "sucesso");
        formulario.reset();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    ajustarAlturaHeader();
    marcarPaginaAtual();
    inicializarFormularioContato();

    const campo = document.getElementById("busca");
    const caixa = document.querySelector("header div.busca");

    campo.addEventListener("blur", () => caixa.classList.remove("focada"));
});

window.addEventListener("load", ajustarAlturaHeader);
window.addEventListener("resize", ajustarAlturaHeader);