function ajustarAlturaHeader() {
    const header = document.querySelector("header");
    if (!header) return;
    document.documentElement.style.setProperty("--header-altura", header.offsetHeight + "px");
}

function clickMenu() {
    const nav = document.querySelector("nav");
    const botao = document.getElementById("burguer");

    ajustarAlturaHeader();
    nav.classList.toggle("aberto");
    botao.textContent = nav.classList.contains("aberto") ? "close" : "menu";
}

function acionarBusca() {
    const campo = document.getElementById("busca");
    const caixa = document.querySelector("header div.busca");

    campo.focus();
    caixa.classList.add("focada");
}

document.addEventListener("DOMContentLoaded", () => {
    ajustarAlturaHeader();

    const campo = document.getElementById("busca");
    const caixa = document.querySelector("header div.busca");

    campo.addEventListener("blur", () => caixa.classList.remove("focada"));
});

window.addEventListener("load", ajustarAlturaHeader);
window.addEventListener("resize", ajustarAlturaHeader);