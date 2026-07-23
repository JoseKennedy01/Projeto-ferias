// Aplica o tema salvo o mais cedo possível, antes da página
// desenhar na tela (evita o "flash" de tema errado).
(function () {
    var temaSalvo = localStorage.getItem('fitness-stok-tema');
    if (temaSalvo === 'escuro') {
        document.documentElement.setAttribute('data-tema', 'escuro');
    }
})();

// Atualiza o ícone do botão (lua = ativa o escuro / sol = ativa o claro)
function atualizarIconeTema() {
    var botao = document.getElementById('tema-toggle');
    if (!botao) return;
    var icone = botao.querySelector('.material-icons');
    var escuro = document.documentElement.getAttribute('data-tema') === 'escuro';
    icone.textContent = escuro ? 'light_mode' : 'dark_mode';
}

// Alterna o tema, salva a escolha e atualiza o ícone
function alternarTema() {
    var atual = document.documentElement.getAttribute('data-tema');
    var novoTema = atual === 'escuro' ? 'claro' : 'escuro';

    if (novoTema === 'escuro') {
        document.documentElement.setAttribute('data-tema', 'escuro');
    } else {
        document.documentElement.removeAttribute('data-tema');
    }

    localStorage.setItem('fitness-stok-tema', novoTema);
    atualizarIconeTema();
}

// Assim que o resto da página carregar, garante que o ícone
// já nasce correto (caso o tema salvo seja "escuro")
document.addEventListener('DOMContentLoaded', atualizarIconeTema);