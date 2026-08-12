// ===================== DROPDOWN DE BUSCA =====================
// Cria o painel de sugestões sob a barra de pesquisa já existente
// no header. Não recria a barra — só complementa o que já existe.

var BuscaDropdown = (function () {
    var ICONES_CATEGORIA = {
        'Página': 'home',
        'Categoria': 'category',
        'Conta': 'account_circle',
        'Treino': 'fitness_center',
        'Personal Trainer': 'person',
        'Vestimentas': 'checkroom',
        'Suplementos': 'medication',
        'Acessórios': 'watch'
    };

    var campo, caixa, painel, listaEl;
    var indiceSelecionado = -1;
    var resultadosAtuais = [];
    var timerDebounce = null;
    var indexPromise = null;

    function icone(item) {
        return ICONES_CATEGORIA[item.categoria] || 'search';
    }

    function criarPainel() {
        if (painel) return painel;

        painel = document.createElement('div');
        painel.className = 'busca-painel';
        painel.setAttribute('role', 'listbox');
        painel.hidden = true;

        caixa.appendChild(painel);
        return painel;
    }

    function renderEstado(html) {
        painel.innerHTML = html;
        painel.hidden = false;
    }

    function renderCarregando() {
        renderEstado('<p class="busca-estado">Carregando conteúdos...</p>');
    }

    function renderVazio() {
        renderEstado(
            '<p class="busca-estado">Nenhum resultado encontrado.<br>' +
            '<span>Tente pesquisar por outro termo.</span></p>'
        );
    }

    function renderResultados(itens) {
        resultadosAtuais = itens;
        indiceSelecionado = -1;

        listaEl = document.createElement('ul');
        listaEl.className = 'busca-lista';

        itens.forEach(function (item, i) {
            var li = document.createElement('li');
            li.className = 'busca-item';
            li.id = 'busca-item-' + i;
            li.setAttribute('role', 'option');
            li.innerHTML =
                '<span class="material-icons">' + icone(item) + '</span>' +
                '<span class="busca-item-texto">' +
                    '<strong>' + escaparHtml(item.titulo) + '</strong>' +
                    '<small>' + escaparHtml(item.categoria) + '</small>' +
                '</span>';

            li.addEventListener('mousedown', function (evento) {
                // mousedown (não click) pra disparar antes do blur do input
                evento.preventDefault();
                selecionarItem(item);
            });

            listaEl.appendChild(li);
        });

        painel.innerHTML = '';
        painel.appendChild(listaEl);
        painel.hidden = false;
    }

    function escaparHtml(texto) {
        var div = document.createElement('div');
        div.textContent = texto || '';
        return div.innerHTML;
    }

    function atualizarSelecaoVisual() {
        if (!listaEl) return;
        var itens = listaEl.querySelectorAll('.busca-item');
        itens.forEach(function (el, i) {
            el.classList.toggle('selecionado', i === indiceSelecionado);
        });
        if (indiceSelecionado >= 0 && itens[indiceSelecionado]) {
            itens[indiceSelecionado].scrollIntoView({ block: 'nearest' });
            campo.setAttribute('aria-activedescendant', 'busca-item-' + indiceSelecionado);
        } else {
            campo.removeAttribute('aria-activedescendant');
        }
    }

    function selecionarItem(item) {
        fechar();
        campo.blur();

        if (BuscaService.ehPaginaAtual(item)) {
            if (item.ancora) {
                var alvo = document.getElementById(item.ancora);
                if (alvo) {
                    alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return;
                }
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        window.location.href = BuscaService.resolverRota(item);
    }

    function executarPesquisa(termo) {
        if (!indexPromise) indexPromise = BuscaIndice.obter();

        renderCarregando();

        indexPromise.then(function (indice) {
            // Se o campo já mudou de novo enquanto o índice carregava,
            // essa resposta antiga é descartada.
            if (buscaNormalizar(campo.value) !== buscaNormalizar(termo)) return;

            var resultados = BuscaService.pesquisar(termo, indice, 8);
            if (resultados.length === 0) {
                renderVazio();
            } else {
                renderResultados(resultados);
            }
        });
    }

    function aoDigitar() {
        var termo = campo.value.trim();

        clearTimeout(timerDebounce);

        if (termo.length < 1) {
            fechar();
            return;
        }

        timerDebounce = setTimeout(function () {
            executarPesquisa(termo);
        }, 250);
    }

    function aoTeclar(evento) {
        if (painel.hidden) return;

        if (evento.key === 'ArrowDown') {
            evento.preventDefault();
            if (resultadosAtuais.length === 0) return;
            indiceSelecionado = (indiceSelecionado + 1) % resultadosAtuais.length;
            atualizarSelecaoVisual();
        } else if (evento.key === 'ArrowUp') {
            evento.preventDefault();
            if (resultadosAtuais.length === 0) return;
            indiceSelecionado = (indiceSelecionado - 1 + resultadosAtuais.length) % resultadosAtuais.length;
            atualizarSelecaoVisual();
        } else if (evento.key === 'Enter') {
            if (indiceSelecionado >= 0 && resultadosAtuais[indiceSelecionado]) {
                evento.preventDefault();
                selecionarItem(resultadosAtuais[indiceSelecionado]);
            } else if (resultadosAtuais.length > 0) {
                evento.preventDefault();
                selecionarItem(resultadosAtuais[0]);
            }
        } else if (evento.key === 'Escape') {
            fechar();
        }
    }

    function fechar() {
        if (painel) painel.hidden = true;
        indiceSelecionado = -1;
        resultadosAtuais = [];
    }

    function abrir() {
        campo.focus();
        if (campo.value.trim().length >= 1) aoDigitar();
    }

    function inicializar() {
        campo = document.getElementById('busca');
        caixa = document.querySelector('header div.busca');
        if (!campo || !caixa) return;

        caixa.style.position = caixa.style.position || 'relative';
        criarPainel();

        // Começa a montar o índice em segundo plano assim que a página carrega,
        // pra já estar pronto (ou quase) quando o usuário digitar a 1ª letra.
        indexPromise = BuscaIndice.obter();

        campo.setAttribute('autocomplete', 'off');
        campo.setAttribute('role', 'combobox');
        campo.setAttribute('aria-expanded', 'false');

        campo.addEventListener('input', aoDigitar);
        campo.addEventListener('keydown', aoTeclar);
        campo.addEventListener('focus', function () {
            if (campo.value.trim().length >= 1) aoDigitar();
        });

        document.addEventListener('click', function (evento) {
            if (!caixa.contains(evento.target)) fechar();
        });
    }

    document.addEventListener('DOMContentLoaded', inicializar);

    return { abrir: abrir, fechar: fechar };
})();