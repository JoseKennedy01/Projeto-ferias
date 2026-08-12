// ===================== UTILITÁRIOS DE BUSCA =====================
// Funções puras, sem dependência de DOM específico, reaproveitadas
// tanto para gerar os IDs dos produtos quanto para indexar/pesquisar.

// Remove acentos, baixa a caixa e tira espaços das pontas.
// Ex: "Hipertrofia" e "hipertrofía " normalizam pro mesmo valor.
function buscaNormalizar(texto) {
    return (texto || '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();
}

// Gera um slug estável a partir de um título, usado como âncora (#id).
// É determinístico: o mesmo título sempre gera o mesmo slug, então não
// precisa estar "salvo" em lugar nenhum — tanto quem cria o card quanto
// quem monta o índice de busca calculam o mesmo valor de forma independente.
function buscaSlug(texto) {
    return buscaNormalizar(texto)
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60);
}

// Distância de Levenshtein simples (número mínimo de edições pra
// transformar uma string na outra). Usada só pra tolerância leve a
// erro de digitação, com um limite de tamanho pra não pesar.
function buscaDistancia(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    if (Math.abs(a.length - b.length) > 3) return 99; // corta cedo, são bem diferentes

    var linhaAnterior = [];
    for (var j = 0; j <= b.length; j++) linhaAnterior[j] = j;

    for (var i = 1; i <= a.length; i++) {
        var linhaAtual = [i];
        for (var k = 1; k <= b.length; k++) {
            var custo = a[i - 1] === b[k - 1] ? 0 : 1;
            linhaAtual[k] = Math.min(
                linhaAnterior[k] + 1,      // remoção
                linhaAtual[k - 1] + 1,     // inserção
                linhaAnterior[k - 1] + custo // substituição
            );
        }
        linhaAnterior = linhaAtual;
    }

    return linhaAnterior[b.length];
}