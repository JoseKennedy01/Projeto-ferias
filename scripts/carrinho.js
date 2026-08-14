// ===================== CARRINHO =====================
var CHAVE_CARRINHO = 'fitness-stok-carrinho';

function lerCarrinho() {
    try {
        var dados = localStorage.getItem(CHAVE_CARRINHO);
        var itens = dados ? JSON.parse(dados) : [];
        // Garantia de integridade da propriedade quantidade
        return itens.map(function(item) {
            item.quantidade = parseInt(item.quantidade, 10) || 1;
            return item;
        });
    } catch (erro) {
        return [];
    }
}

function salvarCarrinho(itens) {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
}

function formatarPreco(valor) {
    return 'R$ ' + Number(valor).toFixed(2).replace('.', ',');
}

// ---------- Badge do ícone ----------
function atualizarBadgeCarrinho() {
    var badge = document.getElementById('carrinho-contador');
    if (!badge) return;

    var itens = lerCarrinho();
    
    // Soma a quantidade total de todos os itens
    var totalItens = itens.reduce(function (acc, item) {
        return acc + (parseInt(item.quantidade, 10) || 1);
    }, 0);

    if (totalItens > 0) {
        badge.textContent = totalItens > 99 ? '99+' : totalItens;
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
        var qtd = parseInt(item.quantidade, 10) || 1;
        total += item.preco * qtd;

        var linha = document.createElement('div');
        linha.className = 'carrinho-item';
        linha.innerHTML =
            '<img src="' + (item.imagem || '') + '" alt="' + item.nome + '" onerror="this.style.visibility=\'hidden\'">' +
            '<div class="carrinho-item-info">' +
                '<h3>' + item.nome + '</h3>' +
                '<div class="carrinho-item-preco-qtd">' +
                    '<span>' + formatarPreco(item.preco) + '</span>' +
                    '<div class="qtd-seletor">' +
                        '<button type="button" class="qtd-btn qtd-menos" data-indice="' + indice + '">-</button>' +
                        '<span class="qtd-numero">' + qtd + '</span>' +
                        '<button type="button" class="qtd-btn qtd-mais" data-indice="' + indice + '">+</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<button class="carrinho-item-remover" aria-label="Remover item" data-indice="' + indice + '">&times;</button>';

        lista.appendChild(linha);
    });

    totalEl.textContent = formatarPreco(total);

    // Eventos de remover item
    lista.querySelectorAll('.carrinho-item-remover').forEach(function (botao) {
        botao.addEventListener('click', function () {
            removerDoCarrinho(parseInt(botao.dataset.indice, 10));
        });
    });

    // Eventos de alterar quantidade
    lista.querySelectorAll('.qtd-menos').forEach(function (botao) {
        botao.addEventListener('click', function () {
            alterarQuantidade(parseInt(botao.dataset.indice, 10), -1);
        });
    });

    lista.querySelectorAll('.qtd-mais').forEach(function (botao) {
        botao.addEventListener('click', function () {
            alterarQuantidade(parseInt(botao.dataset.indice, 10), 1);
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

/**
 * Chamada pelos botões "Adicionar" dos produtos.
 * Aceita quantidade personalizada (padrão é 1).
 */
function adicionarCarrinho(nome, preco, imagem, quantidadeAdicionar) {
    var itens = lerCarrinho();
    var qtdAdic = parseInt(quantidadeAdicionar, 10) || 1;

    // Verifica se o item já existe no carrinho para apenas aumentar a quantidade
    var itemExistente = itens.find(function(item) {
        return item.nome === nome;
    });

    if (itemExistente) {
        itemExistente.quantidade = (parseInt(itemExistente.quantidade, 10) || 1) + qtdAdic;
    } else {
        itens.push({
            nome: nome,
            preco: preco,
            imagem: imagem || '',
            quantidade: qtdAdic
        });
    }

    salvarCarrinho(itens);
    atualizarBadgeCarrinho();

    // Se o painel já estiver aberto, atualiza a lista em tempo real
    var painel = document.getElementById('carrinho-painel');
    if (painel && painel.classList.contains('aberto')) {
        renderizarPainelCarrinho();
    }
}

function alterarQuantidade(indice, delta) {
    var itens = lerCarrinho();
    if (!itens[indice]) return;

    var qtdAtual = parseInt(itens[indice].quantidade, 10) || 1;
    itens[indice].quantidade = qtdAtual + delta;

    // Se a quantidade for a 0 ou menos, remove o item
    if (itens[indice].quantidade <= 0) {
        itens.splice(indice, 1);
    }

    salvarCarrinho(itens);
    atualizarBadgeCarrinho();
    renderizarPainelCarrinho();
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

    alert('Pedido registrado! Em breve essa etapa vai se conectar a um checkout de verdade.');
    limparCarrinho();
    fecharCarrinho();
}

document.addEventListener('DOMContentLoaded', atualizarBadgeCarrinho);

// Aumenta ou diminui o número visual no card do produto
function alterarQtdCard(botao, delta) {
    var seletor = botao.parentElement;
    var numeroEl = seletor.querySelector('.qtd-card-numero');
    if (!numeroEl) return;

    var qtdAtual = parseInt(numeroEl.textContent, 10) || 1;
    qtdAtual += delta;

    if (qtdAtual < 1) qtdAtual = 1; // Não deixa baixar de 1 no card

    numeroEl.textContent = qtdAtual;
}

// Lê a quantidade atual do card e envia para o carrinho
function adicionarDoCard(botao, nome, preco, imagem) {
    var produtoCard = botao.closest('.produto');
    var qtd = 1;

    if (produtoCard) {
        var numeroEl = produtoCard.querySelector('.qtd-card-numero');
        if (numeroEl) {
            qtd = parseInt(numeroEl.textContent, 10) || 1;
        }
    }

    // Chama a função centralizada repassando a quantidade lida
    adicionarCarrinho(nome, preco, imagem, qtd);

    // Reseta o contador do card para 1 após adicionar
    if (produtoCard) {
        var numeroEl = produtoCard.querySelector('.qtd-card-numero');
        if (numeroEl) numeroEl.textContent = '1';
    }
}