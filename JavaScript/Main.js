document.addEventListener('DOMContentLoaded', function () {
    var $lista = document.querySelector('#listaProdutos');
    var $produto = document.querySelector('#produto');
    var $preco = document.querySelector('#preco');
    var $quantidade = document.querySelector('#quantidade');
    var $botao = document.querySelector('#bnt');
    var $botaoLimpar = document.querySelector('#limpar');
    var $total = document.querySelector('#total');

    // Função para adicionar produto
    function adicionarProduto() {
        var produtoValor = $produto.value.trim();
        var precoValor = parseFloat($preco.value);
        var quantidadeValor = parseInt($quantidade.value);

        if (produtoValor === '' || isNaN(precoValor) || isNaN(quantidadeValor) || precoValor <= 0 || quantidadeValor <= 0) {
            alert('Por favor, insira valores válidos para produto, preço e quantidade.');
            return;
        }

        if (verificarProdutoDuplicado(produtoValor)) {
            alert('Produto já adicionado à lista.');
            limparCampos();
            return;
        }

        var item = document.createElement('li');
        item.classList.add('produto-item');
        item.innerHTML = `
            <input type="checkbox">
            ${produtoValor} - R$ ${precoValor.toFixed(2)} x ${quantidadeValor}
            <button class="remover">Remover</button>
        `;

        $lista.appendChild(item);
        armazenarNoLocalStorage(produtoValor, precoValor, quantidadeValor);

        limparCampos();
        adicionarEventoRemover(item);
        atualizarTotal();
    }

    // Função para armazenar produto no localStorage
    function armazenarNoLocalStorage(produto, preco, quantidade) {
        var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.push({ produto, preco, quantidade });
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    // Função para carregar produtos do localStorage
    function carregarProdutos() {
        var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos.forEach(function (item) {
            var novoItem = document.createElement('li');
            novoItem.classList.add('produto-item');
            novoItem.innerHTML = `
                <input type="checkbox">
                ${item.produto} - R$ ${item.preco.toFixed(2)} x ${item.quantidade}
                <button class="remover">Remover</button>
            `;
            $lista.appendChild(novoItem);
            adicionarEventoRemover(novoItem);
        });
        atualizarTotal();
    }

    // Função para adicionar evento de remoção
    function adicionarEventoRemover(item) {
        item.querySelector('.remover').addEventListener('click', function () {
            var texto = item.textContent.replace('Remover', '').trim();
            var nomeProduto = texto.split(' - ')[0];
            removerDoLocalStorage(nomeProduto);
            item.remove();
            atualizarTotal();
        });
    }

    // Função para remover produto do localStorage
    function removerDoLocalStorage(produto) {
        var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos = produtos.filter(item => item.produto !== produto);
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    // Função para limpar o localStorage e a lista
    function limparLocalStorage() {
        localStorage.clear();
        $lista.innerHTML = '';
        atualizarTotal();
    }

    // Função para verificar se o produto já está na lista
    function verificarProdutoDuplicado(produto) {
        var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        return produtos.some(item => item.produto === produto);
    }

    // Função para limpar campos de entrada
    function limparCampos() {
        $produto.value = '';
        $preco.value = '';
        $quantidade.value = '';
    }

    // Função para atualizar o total
    function atualizarTotal() {
        var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        var total = produtos.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        $total.textContent = total.toFixed(2);
    }

    // Adiciona event listener aos botões
    $botao.addEventListener('click', adicionarProduto);
    $botaoLimpar.addEventListener('click', limparLocalStorage);

    // Carrega produtos ao carregar a página
    carregarProdutos();
});
