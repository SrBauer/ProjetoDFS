document.addEventListener('DOMContentLoaded', function() {
    var $lista = document.querySelector('#listaProdutos');
    var $produto = document.querySelector('#produto');
    var $botao = document.querySelector('#bnt');
    var $botaoLimpar = document.querySelector('#limpar');

    // Função para adicionar produto
    function adicionarProduto() {
        var produtoValor = $produto.value.trim().toLowerCase();

        if (produtoValor === '') {
            alert('Por favor, insira um produto válido.');
            return;
        }

        if (verificarProdutoDuplicado(produtoValor)) {
            alert('Produto já adicionado à lista.');
            $produto.value = ''; // Limpa o campo de input
            return;
        }

        var item = document.createElement('li');
        item.id = 'produtolista';
        item.innerHTML = `<input type="checkbox"> ${$produto.value} <button class="remover">Remover</button>`;
        
        $lista.appendChild(item);
        
        armazenarNoLocalStorage(produtoValor);

        $produto.value = ''; // Limpa o campo de input
        adicionarEventoRemover(item); // Adiciona o evento de remoção ao item recém-criado
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
            var item = document.createElement('li');
            item.id = 'produtolista';
            item.innerHTML = `<input type="checkbox"> ${produto} <button class="remover">Remover</button>`;
            
            $lista.appendChild(item);
            adicionarEventoRemover(item); // Adiciona o evento de remoção aos itens carregados
        });
    }

    // Função para adicionar evento de remoção
    function adicionarEventoRemover(item) {
        item.querySelector('.remover').addEventListener('click', function() {
            var produtoRemover = item.textContent.replace('Remover', '').trim().toLowerCase();
            removerDoLocalStorage(produtoRemover);
            item.remove();
        });
    }

    // Função para remover produto do localStorage
    function removerDoLocalStorage(produto) {
        var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        var index = produtos.indexOf(produto);
        if (index > -1) {
            produtos.splice(index, 1);
        }
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    // Função para limpar o localStorage e a lista
    function limparLocalStorage() {
        localStorage.clear();
        $lista.innerHTML = ''; // Limpa a lista exibida
    }

    // Função para verificar se o produto já está na lista
    function verificarProdutoDuplicado(produto) {
        var produtos = JSON.parse(localStorage.getItem('produtos')) || [];
        var produtosLowerCase = produtos.map(p => p.toLowerCase());
        return produtosLowerCase.includes(produto);
    }

    // Adiciona event listener aos botões
    $botao.addEventListener('click', adicionarProduto);
    $botaoLimpar.addEventListener('click', limparLocalStorage);

    // Carrega produtos ao carregar a página
    carregarProdutos();
});
