// ===================== IDs DOS PRODUTOS =====================
// Dá um id único a cada .produto (baseado no título) pra permitir
// link direto de fora da página, ex: roupas.html#produto-camisa-dry.
// Não interfere em nada da lógica de filtro (roupas.js / sup.js).

document.addEventListener('DOMContentLoaded', function () {
    var produtos = document.querySelectorAll('section.venda .produto');

    produtos.forEach(function (produto) {
        if (produto.id) return; // já tem id, não sobrescreve

        var titulo = produto.querySelector('h3');
        if (!titulo) return;

        produto.id = 'produto-' + buscaSlug(titulo.textContent);
    });
});