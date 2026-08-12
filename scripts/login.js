// ===================== LOGIN =====================
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form-login');
    if (!form) return;

    form.addEventListener('submit', function (evento) {
        evento.preventDefault();

        definirSessaoAtiva();
        mostrarToast('Login realizado com sucesso!', 'sucesso');

        setTimeout(function () {
            window.location.href = obterRedirecionamento('../principal.html');
        }, 1500);
    });
});