// ===================== MOSTRAR/OCULTAR SENHA =====================
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.toggle-senha').forEach(function (icone) {
        function alternar() {
            var campo = document.getElementById(icone.dataset.alvo);
            if (!campo) return;

            var estaVisivel = campo.type === 'text';
            campo.type = estaVisivel ? 'password' : 'text';
            icone.textContent = estaVisivel ? 'visibility' : 'visibility_off';
            icone.setAttribute('aria-label', estaVisivel ? 'Mostrar senha' : 'Ocultar senha');
        }

        icone.addEventListener('click', alternar);

        // Acessibilidade: também funciona com teclado (Enter/Espaço),
        // já que é um <span>, não um <button>
        icone.addEventListener('keydown', function (evento) {
            if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                alternar();
            }
        });
    });
});