// ===================== SESSÃO SIMULADA (LOGIN/CADASTRO) =====================
// Não armazena nome, e-mail nem qualquer dado do visitante.
// Guarda apenas uma flag booleana em sessionStorage, que é apagada
// automaticamente quando a aba/janela é fechada.

var CHAVE_SESSAO = 'fitness-stok-sessao';

function definirSessaoAtiva() {
    try {
        sessionStorage.setItem(CHAVE_SESSAO, '1');
    } catch (erro) {
        // sessionStorage indisponível (ex: modo privado) — segue sem travar a página
    }
}

function encerrarSessao() {
    try {
        sessionStorage.removeItem(CHAVE_SESSAO);
    } catch (erro) {
        // silenciosamente ignora
    }
}

function sessaoAtiva() {
    try {
        return sessionStorage.getItem(CHAVE_SESSAO) === '1';
    } catch (erro) {
        return false;
    }
}

// ---------- Redirecionamento pós login/cadastro ----------
// Aceita apenas caminhos relativos simples (ex: "treino.html" ou "../principal.html")
// para evitar redirecionamento pra fora do site.
function obterRedirecionamento(padrao) {
    try {
        var params = new URLSearchParams(window.location.search);
        var alvo = params.get('redirect');
        if (alvo && /^(\.\.\/)?[\w-]+\.html$/.test(alvo)) {
            return alvo;
        }
    } catch (erro) {
        // ignora e usa o padrão
    }
    return padrao;
}

// Preserva o parâmetro ?redirect= ao navegar entre login.html e cadastro.html,
// pra não perder a página de origem se o usuário trocar de formulário.
function preservarRedirecionamento() {
    var params = new URLSearchParams(window.location.search);
    var alvo = params.get('redirect');
    if (!alvo) return;

    document.querySelectorAll('a[href="login.html"], a[href="cadastro.html"]').forEach(function (link) {
        var base = link.getAttribute('href');
        link.setAttribute('href', base + '?redirect=' + encodeURIComponent(alvo));
    });
}

// ---------- Header: alterna "Login" / "Minha conta" ----------
function aplicarEstadoConta() {
    var logado = sessaoAtiva();

    document.querySelectorAll('a.login-link, a.nav-login').forEach(function (link) {
        var icone = link.querySelector('.material-icons');
        var texto = link.querySelector('.login-texto');

        if (logado) {
            if (!link.dataset.hrefOriginal) {
                link.dataset.hrefOriginal = link.getAttribute('href');
            }
            link.setAttribute('href', '#');
            link.title = 'Clique para sair da conta';

            if (icone) icone.textContent = 'logout';
            if (texto) {
                texto.textContent = 'Minha conta';
            } else {
                link.textContent = 'Minha conta';
            }

            link.onclick = function (evento) {
                evento.preventDefault();
                encerrarSessao();
                window.location.reload();
            };
        } else {
            if (link.dataset.hrefOriginal) {
                link.setAttribute('href', link.dataset.hrefOriginal);
            }
            link.removeAttribute('title');

            if (icone) icone.textContent = 'account_circle';
            if (texto) {
                texto.textContent = 'Login';
            } else {
                link.textContent = 'Login';
            }

            link.onclick = null;
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    preservarRedirecionamento();
    aplicarEstadoConta();
});