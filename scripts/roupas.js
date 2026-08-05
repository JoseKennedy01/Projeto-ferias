// ===================== FILTRO DE SUPLEMENTOS =====================
document.addEventListener('DOMContentLoaded', function () {
    var checkboxes = document.querySelectorAll('.filtro input[type="checkbox"]');
    var produtos = document.querySelectorAll('section.venda .produto');

    if (checkboxes.length === 0 || produtos.length === 0) return;

    function valoresMarcados(nome) {
        var marcados = document.querySelectorAll('.filtro input[name="' + nome + '"]:checked');
        return Array.from(marcados).map(function (cb) { return cb.value; });
    }

    function aplicarFiltros() {
        var tiposMarcados = valoresMarcados('tipo');
        var corMarcados = valoresMarcados('cor');
        var formasMarcadas = valoresMarcados('forma');

        var algumVisivel = false;

        produtos.forEach(function (produto) {
            var tipo = produto.dataset.tipo || '';
            var cor = produto.dataset.cor || '';
            var forma = produto.dataset.forma || '';

            // Dentro do mesmo grupo, os checkboxes funcionam como "OU"
            // (ex: Whey OU Barra). Entre grupos diferentes, funciona
            // como "E" (ex: Whey E 1kg). Grupo sem nada marcado não filtra.
            var passaTipo = tiposMarcados.length === 0 || tiposMarcados.includes(tipo);
            var passaCor = corMarcados.length === 0 || corMarcados.includes(cor);
            var passaForma = formasMarcadas.length === 0 || formasMarcadas.includes(forma);

            var visivel = passaTipo && passaCor && passaForma;
            produto.style.display = visivel ? '' : 'none';
            if (visivel) algumVisivel = true;
        });

        exibirMensagemVazia(!algumVisivel);
    }

    function exibirMensagemVazia(mostrar) {
        var secaoVenda = document.querySelector('section.venda');
        var mensagem = document.getElementById('filtro-vazio');

        if (mostrar && !mensagem) {
            mensagem = document.createElement('p');
            mensagem.id = 'filtro-vazio';
            mensagem.textContent = 'Nenhum produto encontrado com esses filtros.';
            mensagem.style.width = '100%';
            mensagem.style.textAlign = 'center';
            mensagem.style.padding = '30px 0';
            mensagem.style.color = '#666';
            secaoVenda.appendChild(mensagem);
        } else if (!mostrar && mensagem) {
            mensagem.remove();
        }
    }

    checkboxes.forEach(function (cb) {
        cb.addEventListener('change', aplicarFiltros);
    });
});