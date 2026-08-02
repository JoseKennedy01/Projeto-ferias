let contador = 0;

function adicionarCarrinho(produto, preco) {
    contador++;
    document.getElementById("carrinho-contador").textContent = contador;
    console.log(produto + " adicionado. Preço: R$" + preco);
}