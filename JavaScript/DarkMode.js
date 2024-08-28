document.addEventListener('DOMContentLoaded', function() {
    var $toggleDarkMode = document.getElementById('toggleDarkMode');

    // Função para alternar o modo escuro
    function alternarDarkMode() {
        document.body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('dark-mode');
        document.querySelector('footer').classList.toggle('dark-mode');
        document.querySelectorAll('#Cadastro, #Login').forEach(function (element) {
            element.classList.toggle('dark-mode');
        });
        document.querySelectorAll('input, button').forEach(function (element) {
            element.classList.toggle('dark-mode');
        });

        // Altera o texto do botão com base no modo ativo
        if (document.body.classList.contains('dark-mode')) {
            $toggleDarkMode.textContent = 'Modo Claro';
        } else {
            $toggleDarkMode.textContent = 'Modo Escuro';
        }

        // Salva a preferência do usuário no localStorage
        var darkModeAtivo = document.body.classList.contains('dark-mode');
        localStorage.setItem('modoEscuroAtivo', darkModeAtivo);
    }

    // Adiciona o evento de clique ao botão de alternância de modo escuro
    if ($toggleDarkMode) {
        $toggleDarkMode.addEventListener('click', alternarDarkMode);
    }

    // Verifica se o usuário já ativou o modo escuro anteriormente
    var modoEscuroAtivo = localStorage.getItem('modoEscuroAtivo') === 'true';
    if (modoEscuroAtivo) {
        alternarDarkMode();
    }
});
