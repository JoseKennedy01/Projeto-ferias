document.addEventListener("DOMContentLoaded", () => {
    const campoSenha = document.getElementById("senha");
    const campoConfirmar = document.getElementById("confirmar");
    const botao = document.getElementById("botao-cadastro");
    const msgSenha = document.getElementById("msg-senha");
    const listaRequisitos = document.getElementById("requisitos-senha");

    if (!campoSenha || !campoConfirmar || !botao) return;

    const regras = {
        tamanho: (s) => s.length >= 8,
        maiuscula: (s) => /[A-Z]/.test(s),
        minuscula: (s) => /[a-z]/.test(s),
        numero: (s) => /\d/.test(s),
        especial: (s) => /[^A-Za-z0-9]/.test(s),
    };

    function senhaEhForte(senha) {
        return Object.values(regras).every((testar) => testar(senha));
    }

    function atualizarRequisitos() {
        const senha = campoSenha.value;

        listaRequisitos.querySelectorAll("li[data-regra]").forEach((item) => {
            const regra = item.dataset.regra;
            const atendida = regras[regra](senha);
            item.classList.toggle("ok", atendida);
        });

        return senhaEhForte(senha);
    }

    function atualizarConfirmacao(senhaForte) {
        const senha = campoSenha.value;
        const confirmar = campoConfirmar.value;

        if (!confirmar) {
            msgSenha.textContent = "";
            msgSenha.classList.remove("erro", "sucesso");
            return false;
        }

        const iguais = senha === confirmar;

        msgSenha.textContent = iguais ? "As senhas coincidem" : "As senhas não coincidem";
        msgSenha.classList.toggle("sucesso", iguais);
        msgSenha.classList.toggle("erro", !iguais);

        return iguais && senhaForte;
    }

    function validarTudo() {
        const senhaForte = atualizarRequisitos();
        const podeEnviar = atualizarConfirmacao(senhaForte);
        botao.disabled = !podeEnviar;
    }

    campoSenha.addEventListener("input", validarTudo);
    campoConfirmar.addEventListener("input", validarTudo);
});