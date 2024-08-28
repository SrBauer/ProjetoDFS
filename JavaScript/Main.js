document.addEventListener('DOMContentLoaded', function () {
    var $lista = document.querySelector('#listaProdutos');
    var $produto = document.querySelector('#produto');
    var $preco = document.querySelector('#preco');
    var $quantidade = document.querySelector('#quantidade');
    var $botao = document.querySelector('#bnt');
    var $botaoLimpar = document.querySelector('#limpar');
    var $total = document.querySelector('#total');
    var $toggleDarkMode = document.querySelector('#toggleDarkMode');
    var $totalContainer = document.querySelector('#totalContainer');

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

        if (document.body.classList.contains('dark-mode')) {
            item.classList.add('dark-mode');
        }

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
        produtos.forEach(function (produtoObj) {
            var item = document.createElement('li');
            item.classList.add('produto-item');
            item.innerHTML = `
                <input type="checkbox">
                ${produtoObj.produto} - R$ ${produtoObj.preco.toFixed(2)} x ${produtoObj.quantidade}
                <button class="remover">Remover</button>
            `;

            if (document.body.classList.contains('dark-mode')) {
                item.classList.add('dark-mode');
            }

            $lista.appendChild(item);
            adicionarEventoRemover(item);
        });
        atualizarTotal();
    }

    // Função para remover produto
    function adicionarEventoRemover(item) {
        item.querySelector('.remover').addEventListener('click', function () {
            removerDoLocalStorage(item);
            item.remove();
            atualizarTotal();
        });
    }

    // Função para remover do localStorage
    function removerDoLocalStorage(item) {
        var produtoTexto = item.textContent.trim().split(' - ')[0];
        var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        produtos = produtos.filter(function (produtoObj) {
            return produtoObj.produto !== produtoTexto;
        });
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    // Função para limpar campos
    function limparCampos() {
        $produto.value = '';
        $preco.value = '';
        $quantidade.value = '';
    }

    // Função para limpar lista do localStorage e da tela
    function limparLocalStorage() {
        localStorage.removeItem('produtos');
        $lista.innerHTML = '';
        atualizarTotal();
    }

    // Função para verificar se o produto já foi adicionado
    function verificarProdutoDuplicado(produto) {
        var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        return produtos.some(function (produtoObj) {
            return produtoObj.produto === produto;
        });
    }

    // Função para atualizar o total
    function atualizarTotal() {
        var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        var total = produtos.reduce(function (acumulador, produtoObj) {
            return acumulador + (produtoObj.preco * produtoObj.quantidade);
        }, 0);
        $total.textContent = total.toFixed(2);
    }

    // Função para alternar o modo escuro e mudar o texto do botão
    function alternarDarkMode() {
        document.body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('dark-mode');
        document.querySelector('footer').classList.toggle('dark-mode');
        document.getElementById('form-container').classList.toggle('dark-mode');
        $totalContainer.classList.toggle('dark-mode');

        document.querySelectorAll('#form-container input, #form-container button').forEach(function (element) {
            element.classList.toggle('dark-mode');
        });

        document.querySelectorAll('#listaProdutos li').forEach(function (item) {
            item.classList.toggle('dark-mode');
        });

        // Altera o texto do botão com base no modo ativo
        if (document.body.classList.contains('dark-mode')) {
            $toggleDarkMode.textContent = 'Modo Claro';
        } else {
            $toggleDarkMode.textContent = 'Modo Escuro';
        }

        // Salva a preferência do usuário no localStorage
        var darkModeAtivo = document.body.classList.contains('dark-mode');
        localStorage.setItem('dark-mode', darkModeAtivo);
    }

    // Verifica o modo salvo no localStorage
    if (localStorage.getItem('dark-mode') === 'true') {
        alternarDarkMode();
    }

    // Adiciona event listener ao botão de alternância de modo escuro
    $toggleDarkMode.addEventListener('click', alternarDarkMode);

    // Carrega produtos ao carregar a página
    carregarProdutos();

    // Adiciona event listener aos botões
    $botao.addEventListener('click', adicionarProduto);
    $botaoLimpar.addEventListener('click', limparLocalStorage);
});
