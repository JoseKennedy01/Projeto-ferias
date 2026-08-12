// ===================== SERVIÇO DE BUSCA =====================
// Monta o índice combinando três fontes:
//   1. BUSCA_PAGINAS      -> páginas/seções estruturais (manual, pequeno)
//   2. TREINO_DADOS        -> treinos e personal trainers (já existe, reaproveitado)
//   3. roupas/sup/acessorios -> lidos AO VIVO do HTML de cada página via fetch,
//      então nunca ficam desatualizados e não duplicam dado nenhum.
//
// O índice é montado uma única vez por sessão de navegação (cache em
// memória) e reaproveitado em todas as pesquisas seguintes.

var BuscaIndice = (function () {
    var cache = null; // Promise do índice já montado, ou null se ainda não iniciou

    var PAGINAS_PRODUTO = [
        { chave: 'roupas', arquivo: 'roupas.html', categoria: 'Vestimentas' },
        { chave: 'sup', arquivo: 'sup.html', categoria: 'Suplementos' },
        { chave: 'acessorios', arquivo: 'acessorios.html', categoria: 'Acessórios' }
    ];

    // Descobre se a página atual está dentro de /paginas/ ou na raiz,
    // pra montar o caminho relativo correto em qualquer um dos dois casos.
    function estaDentroDePaginas() {
        return window.location.pathname.indexOf('/paginas/') !== -1;
    }

    function caminhoParaPaginaProduto(arquivo) {
        return estaDentroDePaginas() ? arquivo : 'paginas/' + arquivo;
    }

    // Extrai os itens de produto de um documento HTML já parseado
    // (seja o documento atual, seja um fetch de outra página).
    function extrairProdutos(doc, infoPagina) {
        var itens = [];
        var cards = doc.querySelectorAll('section.venda .produto');

        cards.forEach(function (card) {
            var tituloEl = card.querySelector('h3');
            var descEl = card.querySelector('p');
            var precoEl = card.querySelector('span');
            if (!tituloEl) return;

            var titulo = tituloEl.textContent.trim();

            itens.push({
                titulo: titulo,
                descricao: descEl ? descEl.textContent.trim() : '',
                keywords: [card.dataset.tipo, card.dataset.cor, card.dataset.peso, card.dataset.forma].filter(Boolean),
                categoria: infoPagina.categoria,
                preco: precoEl ? precoEl.textContent.trim() : '',
                pagina: infoPagina.chave,
                ancora: 'produto-' + buscaSlug(titulo),
                tipo: 'produto'
            });
        });

        return itens;
    }

    function carregarProdutosDaPagina(info) {
        // Se o usuário já está na própria página de produtos, lê o DOM
        // ao vivo em vez de buscar de novo pela rede.
        var nomeArquivoAtual = window.location.pathname.split('/').pop();
        if (nomeArquivoAtual === info.arquivo) {
            return Promise.resolve(extrairProdutos(document, info));
        }

        var url = caminhoParaPaginaProduto(info.arquivo);

        return fetch(url)
            .then(function (resposta) {
                if (!resposta.ok) throw new Error('Falha ao carregar ' + url);
                return resposta.text();
            })
            .then(function (html) {
                var doc = new DOMParser().parseFromString(html, 'text/html');
                return extrairProdutos(doc, info);
            })
            .catch(function () {
                // Se uma página de produto falhar (ex: rede indisponível),
                // a busca continua funcionando com as outras fontes.
                return [];
            });
    }

    function itensDePaginasEstruturais() {
        if (typeof BUSCA_PAGINAS === 'undefined') return [];
        return BUSCA_PAGINAS.map(function (item) {
            return {
                titulo: item.titulo,
                descricao: item.descricao,
                keywords: item.keywords || [],
                categoria: item.categoria,
                pagina: item.pagina,
                ancora: item.ancora,
                tipo: item.tipo
            };
        });
    }

    function itensDeTreinos() {
        if (typeof TREINO_DADOS === 'undefined') return [];
        var itens = [];

        TREINO_DADOS.treinos.forEach(function (treino) {
            itens.push({
                titulo: treino.nome + ' — ' + treino.grupo,
                descricao: 'Treino de ' + treino.nivel.toLowerCase() + ' focado em ' + treino.objetivo.toLowerCase() + '.',
                keywords: [treino.grupo, treino.nivel, treino.objetivo],
                categoria: 'Treino',
                pagina: 'treino',
                ancora: 'treino-' + treino.id,
                tipo: 'treino'
            });
        });

        TREINO_DADOS.personais.forEach(function (personal) {
            itens.push({
                titulo: personal.nome,
                descricao: personal.bio,
                keywords: [personal.especialidade],
                categoria: 'Personal Trainer',
                pagina: 'treino',
                ancora: 'personal-' + buscaSlug(personal.nome),
                tipo: 'personal'
            });
        });

        return itens;
    }

    function montarIndice() {
        var promessasProdutos = PAGINAS_PRODUTO.map(carregarProdutosDaPagina);

        return Promise.all(promessasProdutos).then(function (listas) {
            var produtos = listas.reduce(function (acc, lista) { return acc.concat(lista); }, []);
            return itensDePaginasEstruturais().concat(itensDeTreinos(), produtos);
        });
    }

    // Retorna sempre a MESMA promise depois da primeira chamada
    // (evita refazer os fetches a cada pesquisa).
    function obter() {
        if (!cache) cache = montarIndice();
        return cache;
    }

    return { obter: obter };
})();