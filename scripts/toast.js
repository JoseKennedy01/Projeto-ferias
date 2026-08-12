// ===================== TOAST DE FEEDBACK =====================
// Mensagem simples que aparece na tela, avisa o usuário e some
// sozinha. Usada em login/cadastro (sem backend, só feedback visual).
function mostrarToast(mensagem, tipo) {
    var toast = document.createElement('div');
    toast.className = 'toast-mensagem' + (tipo ? ' ' + tipo : '');
    toast.textContent = mensagem;
    document.body.appendChild(toast);

    // pequeno atraso pra garantir que a transição de entrada rode
    requestAnimationFrame(function () {
        toast.classList.add('visivel');
    });

    setTimeout(function () {
        toast.classList.remove('visivel');
    }, 1600);

    setTimeout(function () {
        toast.remove();
    }, 2000);
}