// ===================== PÁGINA DE TREINOS =====================
// Usa os dados fictícios definidos em treino-dados.js (window.TREINO_DADOS)
// e o estado de sessão simulada definido em auth.js (sessaoAtiva()).

function estrelasParaTexto(nota) {
    var cheias = Math.round(nota);
    var texto = '';
    for (var i = 1; i <= 5; i++) {
        texto += i <= cheias ? '★' : '☆';
    }
    return texto;
}

// ---------- Estado logado / deslogado ----------
function aplicarEstadoLogin() {
    var logado = sessaoAtiva();

    var estadoLogado = document.getElementById('treino-estado-logado');
    var estadoDeslogado = document.getElementById('treino-estado-deslogado');

    if (estadoLogado) estadoLogado.classList.toggle('ativo', logado);
    if (estadoDeslogado) estadoDeslogado.classList.toggle('ativo', !logado);
}

// ---------- Renderização: treinos personalizados ----------
function renderizarTreinos() {
    var container = document.getElementById('treino-grid-treinos');
    if (!container) return;

    container.innerHTML = TREINO_DADOS.treinos.map(function (treino) {
        return (
            '<div class="treino-card revelar" id="treino-' + treino.id + '">' +
                '<div class="treino-card-topo">' +
                    '<div class="treino-card-icone"><span class="material-icons">' + treino.icone + '</span></div>' +
                    '<div>' +
                        '<h4>' + treino.nome + '</h4>' +
                        '<span>' + treino.grupo + '</span>' +
                    '</div>' +
                '</div>' +
                '<div class="treino-card-meta">' +
                    '<span><span class="material-icons">format_list_numbered</span>' + treino.exercicios + ' exercícios</span>' +
                    '<span><span class="material-icons">schedule</span>' + treino.duracao + '</span>' +
                    '<span><span class="material-icons">trending_up</span>' + treino.nivel + '</span>' +
                    '<span><span class="material-icons">flag</span>' + treino.objetivo + '</span>' +
                '</div>' +
                '<button type="button" data-treino="' + treino.nome + '">Ver treino</button>' +
            '</div>'
        );
    }).join('');

    container.querySelectorAll('button[data-treino]').forEach(function (botao) {
        botao.addEventListener('click', function () {
            alert('Prévia do "' + botao.dataset.treino + '" em breve! Essa etapa vai abrir o detalhamento completo do treino.');
        });
    });

    observarRevelacao(container.querySelectorAll('.revelar'));
}

// ---------- Renderização: personal trainers ----------
function renderizarPersonais() {
    var container = document.getElementById('treino-grid-personais');
    if (!container) return;

    container.innerHTML = TREINO_DADOS.personais.map(function (personal) {
        return (
            '<div class="personal-card revelar" id="personal-' + buscaSlug(personal.nome) + '">' +
                '<div class="personal-avatar ' + personal.cor + '">' + personal.iniciais + '</div>' +
                '<h4>' + personal.nome + '</h4>' +
                '<span class="personal-especialidade">' + personal.especialidade + '</span>' +
                '<p class="personal-experiencia">' + personal.experiencia + ' &middot; ' + personal.alunos + ' alunos</p>' +
                '<p class="personal-avaliacao"><span class="estrelas">' + estrelasParaTexto(personal.nota) + '</span> ' + personal.nota.toFixed(1) + '</p>' +
                '<p class="personal-bio">' + personal.bio + '</p>' +
                '<div class="personal-card-acoes">' +
                    '<button type="button" class="personal-btn-perfil" data-perfil="' + personal.nome + '">Ver perfil</button>' +
                    '<button type="button" class="personal-btn-contato" data-contato="' + personal.nome + '">Entrar em contato</button>' +
                '</div>' +
            '</div>'
        );
    }).join('');

    container.querySelectorAll('button[data-perfil]').forEach(function (botao) {
        botao.addEventListener('click', function () {
            alert('O perfil completo de ' + botao.dataset.perfil + ' estará disponível em breve.');
        });
    });

    container.querySelectorAll('button[data-contato]').forEach(function (botao) {
        botao.addEventListener('click', function () {
            alert('Em breve você poderá enviar uma mensagem direta para ' + botao.dataset.contato + '.');
        });
    });

    observarRevelacao(container.querySelectorAll('.revelar'));
}

// ---------- Renderização: avaliações ----------
function renderizarAvaliacoes() {
    var container = document.getElementById('treino-grid-avaliacoes');
    if (!container) return;

    container.innerHTML = TREINO_DADOS.avaliacoes.map(function (avaliacao) {
        return (
            '<div class="avaliacao-card revelar">' +
                '<div class="avaliacao-topo">' +
                    '<div class="avaliacao-avatar">' + avaliacao.iniciais + '</div>' +
                    '<div>' +
                        '<h4>' + avaliacao.nome + '</h4>' +
                        '<span class="estrelas">' + estrelasParaTexto(avaliacao.nota) + '</span>' +
                    '</div>' +
                '</div>' +
                '<p class="avaliacao-comentario">' + avaliacao.comentario + '</p>' +
                '<div class="avaliacao-meta">' +
                    '<span>Personal: ' + avaliacao.personal + '</span>' +
                    '<span>Objetivo: ' + avaliacao.objetivo + '</span>' +
                '</div>' +
            '</div>'
        );
    }).join('');

    observarRevelacao(container.querySelectorAll('.revelar'));
}

// ---------- Renderização: passos "Como funciona" ----------
function renderizarPassos() {
    var container = document.getElementById('treino-passos');
    if (!container) return;

    container.innerHTML = TREINO_DADOS.passos.map(function (passo) {
        return (
            '<div class="treino-passo revelar">' +
                '<div class="treino-passo-numero">' + passo.numero + '</div>' +
                '<h4>' + passo.titulo + '</h4>' +
                '<p>' + passo.texto + '</p>' +
            '</div>'
        );
    }).join('');

    observarRevelacao(container.querySelectorAll('.revelar'));
}

// ---------- Estatísticas com contagem animada ----------
function iniciarContador(elemento) {
    var alvo = parseFloat(elemento.dataset.alvo);
    var decimal = elemento.dataset.decimal === '1';
    var prefixo = elemento.dataset.prefixo || '';
    var sufixo = elemento.dataset.sufixo || '';
    var duracao = 1400;
    var inicio = null;

    function passo(timestamp) {
        if (!inicio) inicio = timestamp;
        var progresso = Math.min((timestamp - inicio) / duracao, 1);
        var valorAtual = alvo * progresso;
        elemento.textContent = prefixo + (decimal ? valorAtual.toFixed(1) : Math.round(valorAtual)) + sufixo;

        if (progresso < 1) {
            requestAnimationFrame(passo);
        } else {
            elemento.textContent = prefixo + (decimal ? alvo.toFixed(1) : Math.round(alvo)) + sufixo;
        }
    }

    requestAnimationFrame(passo);
}

function renderizarEstatisticas() {
    var container = document.getElementById('treino-stats');
    if (!container) return;

    container.innerHTML = TREINO_DADOS.estatisticas.map(function (stat) {
        return (
            '<div class="stat-item">' +
                '<strong data-alvo="' + stat.valor + '" data-prefixo="' + stat.prefixo + '" data-sufixo="' + stat.sufixo + '" data-decimal="' + (stat.decimal ? '1' : '0') + '">' + stat.prefixo + '0' + stat.sufixo + '</strong>' +
                '<span>' + stat.label + '</span>' +
            '</div>'
        );
    }).join('');

    if (!('IntersectionObserver' in window)) {
        container.querySelectorAll('strong[data-alvo]').forEach(iniciarContador);
        return;
    }

    var observer = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                iniciarContador(entrada.target);
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.4 });

    container.querySelectorAll('strong[data-alvo]').forEach(function (el) {
        observer.observe(el);
    });
}

// ---------- Animação de revelar seções ao rolar ----------
function observarRevelacao(elementos) {
    if (!('IntersectionObserver' in window)) {
        elementos.forEach(function (el) { el.classList.add('visivel'); });
        return;
    }

    var observer = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visivel');
                observer.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });

    elementos.forEach(function (el) { observer.observe(el); });
}

document.addEventListener('DOMContentLoaded', function () {
    aplicarEstadoLogin();
    renderizarTreinos();
    renderizarPassos();
    renderizarPersonais();
    renderizarAvaliacoes();
    renderizarEstatisticas();

    observarRevelacao(document.querySelectorAll('.treino-hero, .treino-secao-cabecalho'));
});