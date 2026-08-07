// ===================== CARRINHO =====================
var CHAVE_CARRINHO = 'fitness-stok-carrinho';

function lerCarrinho() {
    try {
        var dados = localStorage.getItem(CHAVE_CARRINHO);
        return dados ? JSON.parse(dados) : [];
    } catch (erro) {
        return [];
    }
}

function salvarCarrinho(itens) {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
}

function formatarPreco(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

// ---------- Badge do ícone ----------
function atualizarBadgeCarrinho() {
    var badge = document.getElementById('carrinho-contador');
    if (!badge) return;

    var itens = lerCarrinho();
    var quantidade = itens.length;

    if (quantidade > 0) {
        badge.textContent = quantidade > 99 ? '99+' : quantidade;
        badge.classList.add('visivel');
    } else {
        badge.textContent = '0';
        badge.classList.remove('visivel');
    }

    // Pequeno "pulso" visual toda vez que o número muda
    badge.classList.remove('pulso');
    void badge.offsetWidth; // força o navegador a reiniciar a animação
    badge.classList.add('pulso');
}

// ---------- Renderiza a lista dentro do painel ----------
function renderizarPainelCarrinho() {
    var lista = document.getElementById('carrinho-itens');
    var totalEl = document.getElementById('carrinho-total-valor');
    if (!lista || !totalEl) return;

    var itens = lerCarrinho();
    lista.innerHTML = '';

    if (itens.length === 0) {
        lista.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
        totalEl.textContent = formatarPreco(0);
        return;
    }

    var total = 0;

    itens.forEach(function (item, indice) {
        total += item.preco;

        var linha = document.createElement('div');
        linha.className = 'carrinho-item';
        linha.innerHTML =
            '<img src="' + (item.imagem || '') + '" alt="' + item.nome + '" onerror="this.style.visibility=\'hidden\'">' +
            '<div class="carrinho-item-info">' +
                '<h3>' + item.nome + '</h3>' +
                '<span>' + formatarPreco(item.preco) + '</span>' +
            '</div>' +
            '<button class="carrinho-item-remover" aria-label="Remover item" data-indice="' + indice + '">&times;</button>';

        lista.appendChild(linha);
    });

    totalEl.textContent = formatarPreco(total);

    lista.querySelectorAll('.carrinho-item-remover').forEach(function (botao) {
        botao.addEventListener('click', function () {
            removerDoCarrinho(parseInt(botao.dataset.indice, 10));
        });
    });
}

// ---------- Abrir / fechar o painel ----------
function abrirCarrinho() {
    var overlay = document.getElementById('carrinho-overlay');
    var painel = document.getElementById('carrinho-painel');
    if (!overlay || !painel) return;

    renderizarPainelCarrinho();
    overlay.classList.add('aberto');
    painel.classList.add('aberto');
    painel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function fecharCarrinho() {
    var overlay = document.getElementById('carrinho-overlay');
    var painel = document.getElementById('carrinho-painel');
    if (!overlay || !painel) return;

    overlay.classList.remove('aberto');
    painel.classList.remove('aberto');
    painel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// ---------- Ações do carrinho ----------

// Chamada pelos botões "Adicionar" de cada produto
function adicionarCarrinho(nome, preco, imagem) {
    var itens = lerCarrinho();
    itens.push({ nome: nome, preco: preco, imagem: imagem || '' });
    salvarCarrinho(itens);
    atualizarBadgeCarrinho();

    // Se o painel já estiver aberto, atualiza a lista em tempo real
    var painel = document.getElementById('carrinho-painel');
    if (painel && painel.classList.contains('aberto')) {
        renderizarPainelCarrinho();
    }
}

function removerDoCarrinho(indice) {
    var itens = lerCarrinho();
    itens.splice(indice, 1);
    salvarCarrinho(itens);
    atualizarBadgeCarrinho();
    renderizarPainelCarrinho();
}

function limparCarrinho() {
    salvarCarrinho([]);
    atualizarBadgeCarrinho();
    renderizarPainelCarrinho();
}

function finalizarCompra() {
    var itens = lerCarrinho();
    if (itens.length === 0) return;

    // Sem backend por enquanto: só confirma visualmente e limpa o carrinho.
    // Quando tiverem uma página/checkout de verdade, é só trocar este alert
    // por um redirecionamento (ex: window.location.href = 'checkout.html').
    alert('Pedido registrado! Em breve essa etapa vai se conectar a um checkout de verdade.');
    limparCarrinho();
    fecharCarrinho();
}

// Assim que qualquer página carregar, o badge já nasce
// no estado certo (escondido se o carrinho estiver vazio)
document.addEventListener('DOMContentLoaded', atualizarBadgeCarrinho);