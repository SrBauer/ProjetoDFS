document.addEventListener('DOMContentLoaded', function() {
    var $lista = document.querySelector('#listaProdutos');
    var $produto = document.querySelector('#produto');
    var $botao = document.querySelector('#bnt');
    var $botaoLimpar = document.querySelector('#limpar');
    var limitePorColuna = 13;

    // Função para adicionar produto
    function adicionarProduto() {
        if ($produto.value.trim() === '') {
            alert('Por favor, insira um produto válido.');
            return;
        }

        var item = '<li style="font-size: clamp(12px, 4vw, 24px)">' +
                   '<input type="checkbox">' + 
                   $produto.value + 
                   '</li>';
        $lista.innerHTML += item;

        armazenarNoLocalStorage($produto.value);
        //$produto.value = '';
    }

    // Função para armazenar produto no localStorage
    function armazenarNoLocalStorage(produto) {
        var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    // Função para carregar produtos do localStorage
    function carregarProdutos() {
        var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.forEach(function(produto) {
            var item = '<li style="font-size: clamp(12px, 4vw, 24px)">' +
                       '<input type="checkbox">' + 
                       produto + 
                       '</li>';
            $lista.innerHTML += item;
        });
    }

    // Função para limpar o localStorage e a lista
    function limparLocalStorage() {
        localStorage.clear();
        $lista.innerHTML = ''; // Limpa a lista exibida
    }

    // Adiciona event listener aos botões
    $botao.addEventListener('click', adicionarProduto);
    $botaoLimpar.addEventListener('click', limparLocalStorage);

    // Carrega produtos ao carregar a página
    carregarProdutos();
});
