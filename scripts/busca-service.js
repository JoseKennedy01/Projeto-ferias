// ===================== PESQUISA E RELEVÂNCIA =====================

var BuscaService = (function () {

    // Mapa das páginas reais do site pros dois contextos possíveis
    // (navegando a partir da raiz ou de dentro de /paginas/).
    // Usa só rotas que já existem — nada inventado.
    var MAPA_ROTAS = {
        principal: { raiz: 'principal.html', paginas: '../principal.html' },
        roupas: { raiz: 'paginas/roupas.html', paginas: 'roupas.html' },
        sup: { raiz: 'paginas/sup.html', paginas: 'sup.html' },
        acessorios: { raiz: 'paginas/acessorios.html', paginas: 'acessorios.html' },
        treino: { raiz: 'paginas/treino.html', paginas: 'treino.html' },
        login: { raiz: 'paginas/login.html', paginas: 'login.html' },
        cadastro: { raiz: 'paginas/cadastro.html', paginas: 'cadastro.html' }
    };

    function estaDentroDePaginas() {
        return window.location.pathname.indexOf('/paginas/') !== -1;
    }

    // Constrói o href correto pro item, considerando de onde o
    // usuário está pesquisando agora.
    function resolverRota(item) {
        var destino = MAPA_ROTAS[item.pagina];
        if (!destino) return '#';

        var base = estaDentroDePaginas() ? destino.paginas : destino.raiz;
        return item.ancora ? base + '#' + item.ancora : base;
    }

    // Verifica se o item resolvido aponta pra a MESMA página em que o
    // usuário já está (nesse caso dá pra rolar suave em vez de navegar).
    function ehPaginaAtual(item) {
        var nomeArquivo = { principal: 'principal.html', roupas: 'roupas.html', sup: 'sup.html', acessorios: 'acessorios.html', treino: 'treino.html', login: 'login.html', cadastro: 'cadastro.html' }[item.pagina];
        var atual = window.location.pathname.split('/').pop() || 'principal.html';
        return nomeArquivo === atual;
    }

    // ---------- Pontuação de relevância ----------
    // Ordem de prioridade: correspondência exata > título começa com
    // o termo > título contém > keyword > descrição > tolerância a erro.
    function pontuar(item, termoNormalizado) {
        var tituloNorm = buscaNormalizar(item.titulo);
        var descricaoNorm = buscaNormalizar(item.descricao);

        if (tituloNorm === termoNormalizado) return 100;
        if (tituloNorm.startsWith(termoNormalizado)) return 85;
        if (tituloNorm.includes(termoNormalizado)) return 65;

        for (var i = 0; i < (item.keywords || []).length; i++) {
            var kw = buscaNormalizar(item.keywords[i]);
            if (kw === termoNormalizado) return 55;
            if (kw.startsWith(termoNormalizado)) return 45;
            if (kw.includes(termoNormalizado)) return 35;
        }

        if (descricaoNorm && descricaoNorm.includes(termoNormalizado)) return 20;

        // Tolerância leve a erro de digitação — só pra termos com pelo
        // menos 4 letras, comparando com cada palavra do título.
        if (termoNormalizado.length >= 4) {
            var palavras = tituloNorm.split(/\s+/);
            for (var p = 0; p < palavras.length; p++) {
                var distancia = buscaDistancia(termoNormalizado, palavras[p]);
                var limite = termoNormalizado.length <= 6 ? 1 : 2;
                if (distancia <= limite) return 15;
            }
        }

        return 0;
    }

    // Retorna os resultados ordenados por relevância (maior primeiro).
    // "limite" corta a lista pra não sobrecarregar o dropdown.
    function pesquisar(termo, indice, limite) {
        var termoNormalizado = buscaNormalizar(termo);
        if (!termoNormalizado) return [];

        var resultados = [];
        indice.forEach(function (item) {
            var pontos = pontuar(item, termoNormalizado);
            if (pontos > 0) resultados.push({ item: item, pontos: pontos });
        });

        resultados.sort(function (a, b) {
            if (b.pontos !== a.pontos) return b.pontos - a.pontos;
            return a.item.titulo.localeCompare(b.item.titulo, 'pt-BR');
        });

        return resultados.slice(0, limite || 8).map(function (r) { return r.item; });
    }

    return {
        pesquisar: pesquisar,
        resolverRota: resolverRota,
        ehPaginaAtual: ehPaginaAtual
    };
})();